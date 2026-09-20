# 🌸 Joyory Beauty Match - Recommendation Engine & Dataset

Deterministic, zero-dependency beauty product recommendation engine and catalog designed for the **Joyory Beauty Match** hackathon project.

---

## 📍 1. Where the Product Data Lives

The product dataset is available in both **JSON** and **ES Module** formats in the `src/data/` folder:

- **JSON File:** [`src/data/products.json`](file:///d:/joyory-beauty-match/src/data/products.json) *(Best for REST APIs, static builds, or raw JSON loaders)*
- **JS Module:** [`src/data/products.js`](file:///d:/joyory-beauty-match/src/data/products.js) *(Best for React / Next.js / Vue / Vite imports)*

### Product Schema (13 fields)
Every product strictly implements the following structure:

```typescript
interface Product {
  id: string;             // e.g. "prod-cl-01"
  name: string;           // e.g. "Clarifying Salicylic Gel Cleanser"
  brand: string;          // e.g. "Joyory", "CeraVe", "Minimalist"
  category:               // 8 categories supported:
    | "cleanser"
    | "serum"
    | "moisturizer"
    | "sunscreen"
    | "shampoo"
    | "conditioner"
    | "hair serum"
    | "body care";
  price: number;          // Price in INR ₹ (e.g. 449)
  description: string;    // Product summary & action
  ingredients: string[];  // Active ingredients list
  benefits: string[];     // Key user benefits
  skinOrHairType: string[]; // e.g. ["oily", "acne-prone", "combination"]
  concerns: string[];     // e.g. ["acne", "oil control", "blackheads"]
  tags: string[];         // e.g. ["fragrance-free", "vegan", "clean"]
  rating: number;         // 1.0 to 5.0 (e.g. 4.8)
  image: string;          // Direct image URL
}
```

---

## 🚀 2. How to Call the Recommendation Function

Zero external dependencies. Works in the browser, Node.js, Next.js, Vite, and React Native.

### In React / Next.js / Vite:
```javascript
import { recommendProducts } from './engine/recommendationEngine.js';

// Or from the root index:
// import { recommendProducts } from './index.js';

const recommendations = recommendProducts({
  skinOrHairType: "Oily",
  primaryConcern: "Acne",
  category: "Skincare",
  budget: 1500,
  preferences: ["fragrance-free", "vegan"],
  routineComplexity: "simple"
});
```

### In CommonJS (Node.js):
```javascript
const { recommendProducts } = await import('./src/engine/recommendationEngine.js');
```

---

## 📥 3. Expected Input Format

```typescript
interface UserProfileInput {
  skinOrHairType: string;        // e.g. "Oily", "Dry", "Combination", "Dry/damaged hair"
  primaryConcern: string;        // e.g. "Acne", "Hydration", "Hair damage", "Dullness"
  category: string;              // e.g. "Skincare", "Haircare", "Body care", or "cleanser"
  budget: number;                // Maximum budget in ₹ (e.g. 1500)
  preferences?: string[] | string; // e.g. ["vegan", "fragrance-free", "sulphate-free"]
  routineComplexity?: string;    // "simple" | "moderate" | "advanced" (default: "simple")
}
```

### Example Input:
```json
{
  "skinOrHairType": "Oily",
  "primaryConcern": "Acne",
  "category": "Skincare",
  "budget": 1500,
  "preferences": ["fragrance-free", "vegan"],
  "routineComplexity": "simple"
}
```

---

## 📤 4. Expected Output Format

The engine returns an array of the **Top 3** matching products with mathematical scores, match flags, and human-readable explanation bullet points.

```typescript
type RecommendationResult = Array<{
  product: Product;
  score: number;                 // Match percentage (0 - 100)
  reasons: string[];             // UI-ready bullet points explaining why it's a match
  matchedAttributes: {
    concernMatch: boolean;       // Did primaryConcern match?
    skinOrHairTypeMatch: boolean;// Did skinOrHairType match?
    categoryMatch: boolean;      // Did category match?
    budgetMatch: boolean;        // Is it within or near budget?
    matchedPreferences: string[];// List of matched user preferences
  };
}>;
```

### Example Output:
```json
[
  {
    "product": {
      "id": "prod-sr-01",
      "name": "2% Salicylic Acid + LHA Anti-Acne Serum",
      "brand": "Minimalist",
      "category": "serum",
      "price": 549,
      "description": "Potent exfoliating serum with pure Salicylic Acid...",
      "ingredients": ["Salicylic Acid 2%", "Capryloyl Salicylic Acid (LHA)", "Aloe Juice"],
      "benefits": ["Clears active blemishes", "Refines uneven skin texture"],
      "skinOrHairType": ["oily", "combination", "acne-prone"],
      "concerns": ["acne", "blemishes", "oil control", "blackheads"],
      "tags": ["fragrance-free", "oil-free", "vegan", "non-comedogenic"],
      "rating": 4.8,
      "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
    },
    "score": 100,
    "reasons": [
      "Specifically formulated for Oily",
      "Directly targets Acne with proven active ingredients",
      "Essential Skincare step: serum",
      "Within your ₹1,500 budget (₹549)",
      "Matches your preference: fragrance-free, vegan"
    ],
    "matchedAttributes": {
      "concernMatch": true,
      "skinOrHairTypeMatch": true,
      "categoryMatch": true,
      "budgetMatch": true,
      "matchedPreferences": ["fragrance-free", "vegan"]
    }
  }
]
```

---

## 🧮 5. Deterministic Scoring Breakdown

$$\text{Total Score} (100\%) = \underbrace{\text{Concern Match}}_{30\%} + \underbrace{\text{Skin/Hair Type Match}}_{25\%} + \underbrace{\text{Category Match}}_{20\%} + \underbrace{\text{Budget Match}}_{15\%} + \underbrace{\text{Preference/Tag Match}}_{10\%}$$

| Component | Weight | Criteria |
| :--- | :--- | :--- |
| **Concern Match** | **30%** | 30 pts for direct concern match; 24-28 pts for synonyms (e.g. acne $\leftrightarrow$ blemishes); 20 pts for secondary benefit. |
| **Skin/Hair Type** | **25%** | 25 pts for exact type or universal formulation (`all`); 20 pts for compatible types (e.g. oily $\leftrightarrow$ combination). |
| **Category Match** | **20%** | 20 pts when product belongs to requested domain (e.g. Skincare $\rightarrow$ cleanser, serum, moisturizer, sunscreen). |
| **Budget Match** | **15%** | 15 pts if `price <= budget`; 10 pts if $\le 10\%$ over budget; 5 pts if $\le 25\%$ over budget; 0 pts if significantly exceeded. |
| **Preference Match** | **10%** | 10 pts proportional to matched user preferences (e.g. `vegan`, `fragrance-free`, `sulphate-free`). |

### Deterministic Tie-Breaking
When scores tie, order is strictly decided by:
1. `score` (descending)
2. `product.rating` (descending)
3. `product.price` (ascending - better value first)
4. `product.id` (alphabetical stability)

---

## 🧪 6. Testing & Demos

Run the demo profiles:
```bash
npm run demo
```

Run the automated test suite (33 assertions):
```bash
npm test
```

### Pre-Built Demo Profiles:
- **Profile 1**: Oily skin, Acne concerns, Skincare, Budget ₹1,500, Simple routine
- **Profile 2**: Dry skin, Hydration, Skincare, Budget ₹2,500, Moderate routine
- **Profile 3**: Dry/damaged hair, Hair damage, Haircare, Budget ₹2,000, Simple routine
