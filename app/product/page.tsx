import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link href="/results" className="inline-flex items-center text-sm text-stone-600 hover:text-stone-900">
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 aspect-square relative shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
            alt="Product Details"
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
              2% Salicylic Acid + LHA Anti-Acne Serum
            </h1>
            <div className="text-stone-500 text-sm mt-1">By Minimalist · Formulated for Oily & Acne-Prone Skin</div>
          </div>

          <div className="text-3xl font-extrabold text-stone-900">
            ₹549 <span className="text-xs text-stone-500 font-normal">incl. all taxes</span>
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
                <span key={i} className="text-xs bg-white text-stone-700 px-2.5 py-1 rounded-md border border-stone-200">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <Link href="/cart" className="flex-1">
              <Button size="lg" className="w-full shadow-soft hover:shadow-glow">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart (₹549)
              </Button>
            </Link>
            <Link href="/routine">
              <Button variant="outline" size="lg">
                View in Routine
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
