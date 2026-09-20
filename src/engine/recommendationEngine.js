import { products as defaultProducts } from '../data/products.js';

/**
 * Category taxonomy for Joyory Beauty Match
 */
const CATEGORY_GROUPS = {
  skincare: ['cleanser', 'serum', 'moisturizer', 'sunscreen'],
  haircare: ['shampoo', 'conditioner', 'hair serum'],
  bodycare: ['body care'],
  'body care': ['body care']
};

/**
 * Synonym dictionary for intelligent yet deterministic fuzzy-matching
 */
const SYNONYMS = {
  acne: ['acne', 'breakout', 'blemish', 'pimples', 'pimple', 'blackheads', 'whiteheads', 'clogged pores', 'oil control'],
  hydration: ['hydration', 'hydrate', 'dryness', 'dehydrated', 'barrier repair', 'flakiness', 'moisture'],
  dryness: ['dryness', 'hydration', 'barrier repair', 'flakiness', 'roughness'],
  'hair damage': ['hair damage', 'damage', 'breakage', 'split ends', 'frizz', 'heat protection', 'chemically treated', 'bleached'],
  damage: ['hair damage', 'damage', 'breakage', 'split ends', 'frizz', 'heat protection'],
  pigmentation: ['pigmentation', 'dark spots', 'dullness', 'uneven tone', 'tanning', 'brightening'],
  'oil control': ['oil control', 'sebum', 'oily', 'acne', 'pores', 'shine'],
  frizz: ['frizz', 'frizzy', 'dryness', 'hair damage', 'split ends', 'smoothing'],
  dandruff: ['dandruff', 'scalp itch', 'flakiness', 'oily scalp', 'itchiness'],
  sensitivity: ['sensitivity', 'sensitive', 'redness', 'soothing', 'barrier repair', 'eczema']
};

/**
 * Related skin/hair type compatibility matrix
 */
const TYPE_COMPATIBILITY = {
  oily: ['oily', 'combination', 'acne-prone', 'all', 'all skin types'],
  dry: ['dry', 'very dry', 'sensitive', 'normal', 'dehydrated', 'all', 'all skin types'],
  combination: ['combination', 'oily', 'normal', 'all', 'all skin types'],
  sensitive: ['sensitive', 'dry', 'normal', 'eczema-prone', 'all', 'all skin types'],
  'dry hair': ['dry hair', 'damaged hair', 'frizzy hair', 'coarse hair', 'curly', 'all hair types'],
  'damaged hair': ['damaged hair', 'dry hair', 'chemically treated', 'bleached hair', 'colour-treated', 'all hair types'],
  'dry/damaged hair': ['dry hair', 'damaged hair', 'chemically treated', 'bleached hair', 'frizzy hair', 'all hair types'],
  'oily hair': ['oily hair', 'dandruff-prone', 'normal hair', 'all hair types'],
  normal: ['normal', 'combination', 'dry', 'all', 'all skin types', 'all hair types']
};

/**
 * Normalizes input string to lowercase trimmed token
 */
function normalize(str) {
  return (str || '').toLowerCase().trim();
}

/**
 * Parses user preferences into array of lowercase strings
 */
function parsePreferences(preferences) {
  if (!preferences) return [];
  if (Array.isArray(preferences)) {
    return preferences.map(normalize).filter(Boolean);
  }
  if (typeof preferences === 'string') {
    return preferences
      .split(',')
      .map(p => normalize(p))
      .filter(Boolean);
  }
  return [];
}

/**
 * Evaluates Concern match (Weight: 30%)
 * Returns { score: number, matched: boolean, reason: string | null }
 */
function evaluateConcernMatch(product, primaryConcern) {
  if (!primaryConcern) return { score: 30, matched: true, reason: 'No specific concern specified' };

  const concernNorm = normalize(primaryConcern);
  const productConcerns = product.concerns.map(normalize);
  const productBenefits = (product.benefits || []).map(normalize).join(' ');
  const productDesc = normalize(product.description || '');

  // 1. Exact or direct match in product concerns
  if (productConcerns.includes(concernNorm)) {
    return {
      score: 30,
      matched: true,
      reason: `Directly targets ${primaryConcern} with proven active ingredients`
    };
  }

  // 2. Substring or related synonyms check
  const relatedTerms = SYNONYMS[concernNorm] || [concernNorm];
  const hasSynonymInConcerns = productConcerns.some(c =>
    relatedTerms.some(term => c.includes(term) || term.includes(c))
  );

  if (hasSynonymInConcerns) {
    return {
      score: 28,
      matched: true,
      reason: `Formulated to treat ${primaryConcern} and related concerns (${product.concerns.slice(0, 2).join(', ')})`
    };
  }

  // 3. Match in product benefits or description
  const hasBenefitMatch = relatedTerms.some(term =>
    productBenefits.includes(term) || productDesc.includes(term)
  );

  if (hasBenefitMatch) {
    return {
      score: 20,
      matched: true,
      reason: `Provides secondary benefits for ${primaryConcern}`
    };
  }

  return {
    score: 0,
    matched: false,
    reason: null
  };
}

/**
 * Evaluates Skin/Hair Type match (Weight: 25%)
 * Returns { score: number, matched: boolean, reason: string | null }
 */
function evaluateTypeMatch(product, skinOrHairType) {
  if (!skinOrHairType) return { score: 25, matched: true, reason: 'Universal formulation' };

  const typeNorm = normalize(skinOrHairType);
  const productTypes = product.skinOrHairType.map(normalize);

  // 1. Direct match
  if (productTypes.includes(typeNorm)) {
    return {
      score: 25,
      matched: true,
      reason: `Specifically formulated for ${skinOrHairType}`
    };
  }

  // 2. Universal / All types
  if (productTypes.includes('all') || productTypes.includes('all skin types') || productTypes.includes('all hair types')) {
    return {
      score: 25,
      matched: true,
      reason: `Suitable and safe for all skin/hair types including ${skinOrHairType}`
    };
  }

  // 3. Compatible type match via matrix
  const compatibleTypes = TYPE_COMPATIBILITY[typeNorm] || [];
  const hasCompatible = productTypes.some(t =>
    compatibleTypes.includes(t) || t.includes(typeNorm) || typeNorm.includes(t)
  );

  if (hasCompatible) {
    return {
      score: 20,
      matched: true,
      reason: `Highly compatible with ${skinOrHairType} profiles`
    };
  }

  return {
    score: 0,
    matched: false,
    reason: null
  };
}

/**
 * Evaluates Category match (Weight: 20%)
 * Returns { score: number, matched: boolean, reason: string | null }
 */
function evaluateCategoryMatch(product, targetCategory) {
  if (!targetCategory || normalize(targetCategory) === 'all') {
    return { score: 20, matched: true, reason: `Matches target category (${product.category})` };
  }

  const catNorm = normalize(targetCategory);
  const prodCatNorm = normalize(product.category);

  // Direct category match (e.g. "cleanser" === "cleanser")
  if (prodCatNorm === catNorm) {
    return {
      score: 20,
      matched: true,
      reason: `Exact category match for ${targetCategory}`
    };
  }

  // Broad group match (e.g. "skincare" includes "cleanser", "serum", "moisturizer", "sunscreen")
  const group = CATEGORY_GROUPS[catNorm];
  if (group && group.includes(prodCatNorm)) {
    return {
      score: 20,
      matched: true,
      reason: `Essential ${targetCategory} step: ${product.category}`
    };
  }

  return {
    score: 0,
    matched: false,
    reason: null
  };
}

/**
 * Evaluates Budget match (Weight: 15%)
 * Returns { score: number, matched: boolean, reason: string | null }
 */
function evaluateBudgetMatch(product, budget) {
  if (budget === undefined || budget === null || isNaN(budget) || budget <= 0) {
    return { score: 15, matched: true, reason: `Priced at ₹${product.price}` };
  }

  const numBudget = Number(budget);
  const price = product.price;

  if (price <= numBudget) {
    const savings = numBudget - price;
    const reason = savings > 0
      ? `Within your ₹${numBudget.toLocaleString('en-IN')} budget (₹${price.toLocaleString('en-IN')})`
      : `Matches your ₹${numBudget.toLocaleString('en-IN')} budget`;
    return { score: 15, matched: true, reason };
  }

  // Allow small tolerance (within 10% over budget)
  if (price <= numBudget * 1.10) {
    return {
      score: 10,
      matched: true,
      reason: `Slightly exceeds budget (₹${price.toLocaleString('en-IN')} vs ₹${numBudget.toLocaleString('en-IN')}) but delivers high value`
    };
  }

  // Within 25% over budget
  if (price <= numBudget * 1.25) {
    return {
      score: 5,
      matched: false,
      reason: `Priced at ₹${price.toLocaleString('en-IN')} (slightly above ₹${numBudget.toLocaleString('en-IN')})`
    };
  }

  return {
    score: 0,
    matched: false,
    reason: `Exceeds budget (₹${price.toLocaleString('en-IN')} vs ₹${numBudget.toLocaleString('en-IN')})`
  };
}

/**
 * Evaluates Preference / Tag match (Weight: 10%)
 * Returns { score: number, matchedTags: string[], reason: string | null }
 */
function evaluatePreferenceMatch(product, preferences) {
  const prefList = parsePreferences(preferences);
  const productTags = product.tags.map(normalize);

  if (prefList.length === 0) {
    return {
      score: 10,
      matchedTags: product.tags.slice(0, 2),
      reason: `Certified ${product.tags.slice(0, 2).join(', ')}`
    };
  }

  const matched = prefList.filter(pref =>
    productTags.some(tag => tag.includes(pref) || pref.includes(tag))
  );

  const fraction = matched.length / prefList.length;
  const score = Math.round(fraction * 10 * 10) / 10;

  let reason = null;
  if (matched.length > 0) {
    reason = `Matches your preference: ${matched.join(', ')}`;
  }

  return {
    score,
    matchedTags: matched,
    reason
  };
}

/**
 * Core Deterministic Scoring Algorithm
 * @param {Object} product
 * @param {Object} userProfile
 * @returns {Object} Scored candidate product
 */
export function scoreProduct(product, userProfile = {}) {
  const {
    skinOrHairType = '',
    primaryConcern = '',
    category = 'all',
    budget = null,
    preferences = []
  } = userProfile;

  const concernEval = evaluateConcernMatch(product, primaryConcern);
  const typeEval = evaluateTypeMatch(product, skinOrHairType);
  const catEval = evaluateCategoryMatch(product, category);
  const budgetEval = evaluateBudgetMatch(product, budget);
  const prefEval = evaluatePreferenceMatch(product, preferences);

  // Total Score is the sum of all components (Max: 100)
  const totalScore = Math.round(
    (concernEval.score + typeEval.score + catEval.score + budgetEval.score + prefEval.score) * 10
  ) / 10;

  // Build human-friendly explanation reasons
  const reasons = [];
  if (typeEval.reason) reasons.push(typeEval.reason);
  if (concernEval.reason) reasons.push(concernEval.reason);
  if (catEval.reason) reasons.push(catEval.reason);
  if (budgetEval.reason) reasons.push(budgetEval.reason);
  if (prefEval.reason) reasons.push(prefEval.reason);

  return {
    product,
    score: totalScore,
    reasons: reasons.filter(Boolean),
    matchedAttributes: {
      concernMatch: concernEval.matched,
      skinOrHairTypeMatch: typeEval.matched,
      categoryMatch: catEval.matched,
      budgetMatch: budgetEval.matched,
      matchedPreferences: prefEval.matchedTags
    }
  };
}

/**
 * Main Deterministic Recommendation Engine
 *
 * @param {Object} userProfile - The user preferences and constraints
 * @param {string} userProfile.skinOrHairType - e.g. "oily", "dry", "dry/damaged hair"
 * @param {string} userProfile.primaryConcern - e.g. "acne", "hydration", "hair damage"
 * @param {string} userProfile.category - e.g. "skincare", "haircare", "body care", "cleanser", or "all"
 * @param {number} userProfile.budget - Maximum budget in INR (e.g. 1500)
 * @param {string[]|string} [userProfile.preferences] - e.g. ["fragrance-free", "vegan"]
 * @param {string} [userProfile.routineComplexity] - "simple" (default), "moderate", or "advanced"
 * @param {Object} [options] - Engine options
 * @param {Array} [options.productList] - Custom product catalog (defaults to Joyory catalog)
 * @param {number} [options.limit=3] - Number of recommendations to return (defaults to 3)
 *
 * @returns {Array<Object>} Top deterministic recommendations
 */
export function recommendProducts(userProfile, options = {}) {
  const catalog = options.productList || defaultProducts;
  const limit = options.limit || 3;
  const routineComplexity = normalize(userProfile?.routineComplexity || 'simple');

  // 1. Score all catalog products deterministically
  const scoredProducts = catalog.map(p => scoreProduct(p, userProfile));

  // 2. Deterministic sort comparator:
  // - Primary: Score (Descending)
  // - Secondary: Rating (Descending)
  // - Tertiary: Price (Ascending - better value)
  // - Quaternary: Product ID (Ascending - strict stability)
  const sortComparator = (a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.product.rating !== a.product.rating) return b.product.rating - a.product.rating;
    if (a.product.price !== b.product.price) return a.product.price - b.product.price;
    return a.product.id.localeCompare(b.product.id);
  };

  scoredProducts.sort(sortComparator);

  // 3. Routine-aware selection (ensures multi-step routine variety for simple/moderate routines)
  // If the user selects a broad category (like Skincare or Haircare), pick the best candidate from
  // distinct functional categories first so the user gets a complete routine rather than 3 cleansers.
  const targetCategoryGroup = CATEGORY_GROUPS[normalize(userProfile?.category || '')];
  
  if (targetCategoryGroup && scoredProducts.length >= limit) {
    const selected = [];
    const usedCategories = new Set();

    // First pass: Pick the highest-scoring product per distinct category
    for (const item of scoredProducts) {
      if (!usedCategories.has(item.product.category) && item.score >= 50) {
        selected.push(item);
        usedCategories.add(item.product.category);
        if (selected.length === limit) break;
      }
    }

    // Second pass: Fill any remaining slots with highest remaining scored products
    if (selected.length < limit) {
      for (const item of scoredProducts) {
        if (!selected.includes(item)) {
          selected.push(item);
          if (selected.length === limit) break;
        }
      }
    }

    selected.sort(sortComparator);
    return selected.slice(0, limit);
  }

  // Fallback / standard selection
  return scoredProducts.slice(0, limit);
}

export default recommendProducts;
