# 🔌 Frontend Teammate Integration Guide

This guide provides drop-in examples for connecting your UI (React / Next.js / Vue / HTML) to the **Joyory Beauty Match** recommendation engine.

---

## ⚡ 1. Copying the Files into Your Frontend

You can either:
1. Copy the `src/` folder into your frontend repo (e.g. `src/lib/beauty-engine/` or `src/engine/`).
2. Or import directly if this is in a monorepo / shared folder.

Files you need:
- `src/data/products.js` (or `products.json`)
- `src/engine/recommendationEngine.js`
- `src/demoProfiles.js` (optional, great for mock testing)

---

## ⚛️ 2. React / Next.js Hook Example

Create a custom hook `useBeautyMatch.js`:

```jsx
import { useState } from 'react';
import { recommendProducts } from './engine/recommendationEngine.js';

export function useBeautyMatch() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = (userFormData) => {
    setLoading(true);
    try {
      const results = recommendProducts({
        skinOrHairType: userFormData.skinOrHairType,
        primaryConcern: userFormData.primaryConcern,
        category: userFormData.category,
        budget: Number(userFormData.budget),
        preferences: userFormData.preferences, // e.g. ["fragrance-free", "vegan"]
        routineComplexity: userFormData.routineComplexity || "simple"
      });
      setRecommendations(results);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, getRecommendations, loading };
}
```

---

## 🎨 3. React Product Card Component

Render each recommended product along with score and why it was chosen:

```jsx
export function RecommendedProductCard({ recommendation }) {
  const { product, score, reasons, matchedAttributes } = recommendation;

  return (
    <div className="product-card border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {score}% Match
        </span>
        <span className="text-sm text-gray-500 font-medium">
          ⭐ {product.rating} / 5.0
        </span>
      </div>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg my-3"
      />

      <span className="text-xs uppercase tracking-wider text-pink-600 font-bold">
        {product.brand} · {product.category}
      </span>
      <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 my-2">{product.description}</p>
      
      <div className="text-xl font-extrabold text-gray-900 my-2">
        ₹{product.price.toLocaleString('en-IN')}
      </div>

      {/* Why We Recommend This */}
      <div className="bg-pink-50 rounded-lg p-3 my-3">
        <h4 className="text-xs font-bold text-pink-900 uppercase mb-1">
          Why Joyory Matched This:
        </h4>
        <ul className="text-xs text-pink-800 space-y-1 list-disc pl-4">
          {reasons.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        {product.tags.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

---

## 🌐 4. Vanilla JavaScript / HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Joyory Beauty Match</title>
</head>
<body>
  <div id="results"></div>

  <script type="module">
    import { recommendProducts } from './src/engine/recommendationEngine.js';

    const userProfile = {
      skinOrHairType: "Oily",
      primaryConcern: "Acne",
      category: "Skincare",
      budget: 1500,
      preferences: ["fragrance-free", "vegan"],
      routineComplexity: "simple"
    };

    const recommendations = recommendProducts(userProfile);
    console.log("Recommended:", recommendations);

    const container = document.getElementById('results');
    container.innerHTML = recommendations.map(rec => `
      <div class="card">
        <h3>${rec.product.brand} - ${rec.product.name} (${rec.score}% Match)</h3>
        <p>Price: ₹${rec.product.price}</p>
        <ul>${rec.reasons.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    `).join('');
  </script>
</body>
</html>
```
