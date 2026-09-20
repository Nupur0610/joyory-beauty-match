import { products } from './data/products.js';
import { recommendProducts, scoreProduct } from './engine/recommendationEngine.js';
import { demoProfiles } from './demoProfiles.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('🧪 Starting Joyory Beauty Match Test Suite...\n');

// 1. DATASET TESTS
console.log('📦 1. Dataset Verification');
assert(products.length >= 20, `Dataset contains ${products.length} products (at least 20 required)`);

const requiredCategories = [
  'cleanser',
  'serum',
  'moisturizer',
  'sunscreen',
  'shampoo',
  'conditioner',
  'hair serum',
  'body care'
];

const categoryCounts = {};
products.forEach(p => {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
});

requiredCategories.forEach(cat => {
  assert((categoryCounts[cat] || 0) > 0, `Category '${cat}' has ${categoryCounts[cat] || 0} products`);
});

// Schema validation
const requiredKeys = [
  'id', 'name', 'brand', 'category', 'price', 'description',
  'ingredients', 'benefits', 'skinOrHairType', 'concerns',
  'tags', 'rating', 'image'
];

let schemaValid = true;
products.forEach(p => {
  requiredKeys.forEach(k => {
    if (p[k] === undefined || p[k] === null) {
      schemaValid = false;
      console.error(`Product ${p.id} is missing key: ${k}`);
    }
  });
  if (typeof p.price !== 'number' || p.price <= 0) schemaValid = false;
  if (!Array.isArray(p.ingredients) || p.ingredients.length === 0) schemaValid = false;
  if (!Array.isArray(p.benefits) || p.benefits.length === 0) schemaValid = false;
  if (!Array.isArray(p.skinOrHairType) || p.skinOrHairType.length === 0) schemaValid = false;
  if (!Array.isArray(p.concerns) || p.concerns.length === 0) schemaValid = false;
  if (!Array.isArray(p.tags) || p.tags.length === 0) schemaValid = false;
});
assert(schemaValid, 'All products strictly satisfy the complete 13-field schema');

// 2. DETERMINISM TESTS
console.log('\n🔒 2. Determinism Test');
const testInput = demoProfiles[0].input;
const run1 = JSON.stringify(recommendProducts(testInput));
let deterministic = true;
for (let i = 0; i < 50; i++) {
  const currentRun = JSON.stringify(recommendProducts(testInput));
  if (currentRun !== run1) {
    deterministic = false;
    break;
  }
}
assert(deterministic, 'Engine is 100% deterministic across 50 consecutive runs with same input');

// 3. SCORING WEIGHTS & RETURN STRUCTURE TESTS
console.log('\n⚖️ 3. Scoring System & Schema Verification');
const recs = recommendProducts(testInput);
assert(recs.length === 3, 'Returns exactly top 3 products');

recs.forEach((rec, idx) => {
  assert(rec.product && rec.product.id, `Item #${idx + 1} contains valid product object`);
  assert(typeof rec.score === 'number' && rec.score >= 0 && rec.score <= 100, `Item #${idx + 1} has score within [0, 100]: ${rec.score}`);
  assert(Array.isArray(rec.reasons) && rec.reasons.length > 0, `Item #${idx + 1} includes human-readable reasons`);
  assert(
    typeof rec.matchedAttributes === 'object' &&
    'concernMatch' in rec.matchedAttributes &&
    'skinOrHairTypeMatch' in rec.matchedAttributes &&
    'categoryMatch' in rec.matchedAttributes &&
    'budgetMatch' in rec.matchedAttributes &&
    Array.isArray(rec.matchedAttributes.matchedPreferences),
    `Item #${idx + 1} includes complete matchedAttributes object`
  );
});

// 4. DEMO PROFILES TESTS
console.log('\n🎯 4. Demo Profiles Verification');
demoProfiles.forEach((prof, idx) => {
  const results = recommendProducts(prof.input);
  assert(results.length === 3, `${prof.title} returned 3 recommendations`);
  assert(results[0].score >= 80, `${prof.title} top recommendation scored ${results[0].score}/100`);
});

// Check Profile 3 returns Haircare products
const p3Recs = recommendProducts(demoProfiles[2].input);
const allHaircare = p3Recs.every(r => ['shampoo', 'conditioner', 'hair serum'].includes(r.product.category));
assert(allHaircare, 'Profile 3 (Haircare) exclusively returns haircare products');

// 5. BUDGET TOLERANCE TEST
console.log('\n💰 5. Budget Constraints');
const lowBudgetRecs = recommendProducts({
  skinOrHairType: "Oily",
  primaryConcern: "Acne",
  category: "Skincare",
  budget: 500, // tight budget
  preferences: ["vegan"]
});
assert(lowBudgetRecs.length === 3, 'Handled tight budget gracefully');
assert(lowBudgetRecs[0].product.price <= 550, 'Top recommended product is within tight budget range');

// SUMMARY
console.log('\n' + '='.repeat(50));
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED!\n');
}
