import { recommendProducts } from './engine/recommendationEngine.js';
import { demoProfiles } from './demoProfiles.js';

console.log('='.repeat(75));
console.log(' ✨ JOYORY BEAUTY MATCH - DETERMINISTIC RECOMMENDATION ENGINE DEMO ✨');
console.log('='.repeat(75));
console.log('\nRunning recommendation algorithms on 3 realistic target profiles...\n');

demoProfiles.forEach((profile, index) => {
  console.log(`\n${'#'.repeat(75)}`);
  console.log(` 📋 ${profile.title}`);
  console.log(` Description: ${profile.description}`);
  console.log(`${'#'.repeat(75)}`);
  console.log('Input Profile Data:');
  console.log(JSON.stringify(profile.input, null, 2));

  const startTime = performance.now();
  const recommendations = recommendProducts(profile.input);
  const elapsed = (performance.now() - startTime).toFixed(2);

  console.log(`\n⚡ Recommendation computed in ${elapsed}ms | Top ${recommendations.length} Products Returned:\n`);

  recommendations.forEach((item, recIdx) => {
    const p = item.product;
    console.log(`  [Rank #${recIdx + 1}] ⭐ Score: ${item.score}/100 | ${p.brand} - ${p.name}`);
    console.log(`   🏷️  Category: ${p.category.toUpperCase()} | 💰 Price: ₹${p.price} | ⭐ Rating: ${p.rating}/5.0`);
    console.log(`   🎯 Matched Attributes:`);
    console.log(`      - Concern Match: ${item.matchedAttributes.concernMatch ? '✅ Yes' : '❌ No'}`);
    console.log(`      - Skin/Hair Type: ${item.matchedAttributes.skinOrHairTypeMatch ? '✅ Yes' : '❌ No'}`);
    console.log(`      - Category Match: ${item.matchedAttributes.categoryMatch ? '✅ Yes' : '❌ No'}`);
    console.log(`      - Budget Match:   ${item.matchedAttributes.budgetMatch ? '✅ Yes' : '❌ No'}`);
    console.log(`      - Preferences:    ${item.matchedAttributes.matchedPreferences.length ? item.matchedAttributes.matchedPreferences.join(', ') : 'None requested'}`);
    console.log(`   💡 Key Reasons:`);
    item.reasons.forEach(r => console.log(`      • ${r}`));
    console.log(`   🌿 Key Actives: ${p.ingredients.slice(0, 3).join(', ')}`);
    console.log(`   🖼️  Image: ${p.image}`);
    console.log('  ' + '-'.repeat(70));
  });

  const totalCost = recommendations.reduce((sum, r) => sum + r.product.price, 0);
  console.log(`\n  🛍️  Complete Routine Total: ₹${totalCost.toLocaleString('en-IN')} (User Budget: ₹${profile.input.budget.toLocaleString('en-IN')})`);
});

console.log(`\n${'='.repeat(75)}`);
console.log(' ✅ DEMO COMPLETED SUCCESSFULLY');
console.log(`${'='.repeat(75)}\n`);
