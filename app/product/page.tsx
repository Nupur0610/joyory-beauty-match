'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowLeft, Check, Sparkles, ExternalLink, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { addToCart } from '@/lib/order';

export default function ProductPage() {
  const router = useRouter();
  const [addedToast, setAddedToast] = useState(false);

  const productData = {
    id: 'prod-sr-01',
    name: '2% Salicylic Acid + LHA Anti-Acne Serum',
    brand: 'Minimalist',
    price: 549,
    quantity: 1,
    role: 'Active Blemish Treatment',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
  };

  const handleAddToCart = () => {
    addToCart(productData);
    setAddedToast(true);
    setTimeout(() => {
      router.push('/cart');
    }, 400);
  };

  const handleBuyNow = () => {
    addToCart(productData, true);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <Link href="/results" className="inline-flex items-center text-sm text-stone-600 hover:text-stone-900 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Match Results
        </Link>
        <a
          href="https://joyory.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-joyory-rose bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-full hover:bg-rose-100 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-joyory-rose" />
          <span>Explore All Products on Joyory.com</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 aspect-square relative shadow-soft">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="emerald" className="text-sm px-3 py-1 shadow-md">
              ⭐ 4.8 / 5.0 (2,400+ reviews)
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="rose">Treatment Serum</Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              {productData.name}
            </h1>
            <div className="text-stone-500 text-sm mt-1">By {productData.brand} · Formulated for Oily & Acne-Prone Skin</div>
          </div>

          <div className="text-3xl font-extrabold text-stone-900">
            ₹{productData.price} <span className="text-xs text-stone-500 font-normal">incl. all taxes</span>
          </div>

          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            Potent exfoliating serum with pure Salicylic Acid and LHA that penetrates oil-filled pores to eliminate blackheads, whiteheads, and stubborn acne spots without damaging the moisture barrier.
          </p>

          {/* Active Ingredients */}
          <div className="p-4 rounded-xl bg-joyory-50 border border-joyory-100 space-y-2">
            <h3 className="text-xs font-bold text-joyory-900 uppercase tracking-wider">
              Key Active Ingredients:
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Salicylic Acid 2%', 'LHA', 'Aloe Juice', 'Oligopeptide-10'].map((ing, i) => (
                <span key={i} className="text-xs bg-white text-stone-700 px-2.5 py-1 rounded-md border border-stone-200 font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 shadow-soft hover:shadow-glow text-sm font-semibold"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart (₹{productData.price})
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleBuyNow}
              className="flex-1 border-stone-300 font-semibold"
            >
              Buy Now
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
