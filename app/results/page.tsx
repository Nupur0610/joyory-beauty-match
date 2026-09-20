import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Star, ShoppingBag, SlidersHorizontal, Check } from 'lucide-react';

export default function ResultsPage() {
  const mockMatches = [
    {
      id: 'prod-sr-01',
      name: '2% Salicylic Acid + LHA Anti-Acne Serum',
      brand: 'Minimalist',
      category: 'Treatment Serum',
      price: '₹549',
      score: 100,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      reason: 'Directly targets active acne and unclogs deep sebum with pure BHA.',
      tags: ['Fragrance-free', 'Vegan', 'Oil-free'],
    },
    {
      id: 'prod-sn-01',
      name: 'Matte Finish Ultra-Light Sunscreen Gel SPF 50',
      brand: 'Joyory',
      category: 'Sunscreen Gel',
      price: '₹549',
      score: 100,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
      reason: 'Controls daytime shine while shielding from UV without clogging pores.',
      tags: ['Non-comedogenic', 'Matte finish'],
    },
    {
      id: 'prod-cl-01',
      name: 'Clarifying Salicylic Gel Cleanser',
      brand: 'Joyory',
      category: 'Daily Cleanser',
      price: '₹449',
      score: 100,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      reason: 'Gentle everyday foaming wash that dissolves dirt without stripping hydration.',
      tags: ['Sulphate-free', 'Tea tree'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald">100% Match Generated</Badge>
            <span className="text-xs text-stone-500">Based on your Oily / Acne profile</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Your Personalized Match Results
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/quiz">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              Retake Quiz
            </Button>
          </Link>
          <Link href="/routine">
            <Button size="sm">
              View Routine Builder
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockMatches.map((item, idx) => (
          <Card key={idx} variant="interactive" className="flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-56 rounded-xl overflow-hidden mb-4 bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="emerald" className="shadow-sm font-semibold">
                    ⭐ {item.score}% Match
                  </Badge>
                </div>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-joyory-500">
                {item.brand} · {item.category}
              </div>
              <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2 line-clamp-1">{item.name}</h3>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 mb-4">
                <div className="text-xs font-semibold text-rose-900 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-joyory-rose" />
                  Why It Matches You:
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">{item.reason}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((t, i) => (
                  <Badge key={i} variant="default" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between pt-4 border-t border-stone-100 mb-4">
                <span className="text-xs text-stone-500">Price (INR)</span>
                <span className="text-xl font-extrabold text-stone-900">{item.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link href="/product" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Compare
                  </Button>
                </Link>
                <Link href="/cart" className="w-full">
                  <Button size="sm" className="w-full">
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                    Add
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Routine Quick Add Box */}
      <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">Add Complete Routine to Cart</h3>
          <p className="text-sm text-stone-600">Get all 3 synergistic products for a complete AM/PM routine (Total: ₹1,547)</p>
        </div>
        <Link href="/cart">
          <Button size="lg" className="shadow-soft hover:shadow-glow whitespace-nowrap">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add Complete Routine (₹1,547)
          </Button>
        </Link>
      </div>
    </div>
  );
}
