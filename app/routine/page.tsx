'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sun,
  Moon,
  ShoppingBag,
  ArrowRight,
  Compass,
  ExternalLink,
  Check,
  Sparkles,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { OrderItem, addToCart, addMultipleToCart } from '@/lib/order';

interface RoutineStep {
  id: string;
  step: string;
  name: string;
  brand: string;
  role: string;
  price: number;
  image?: string;
}

export default function RoutinePage() {
  const router = useRouter();
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const amSteps: RoutineStep[] = [
    {
      id: 'prod-am-01',
      step: 'Step 1',
      name: 'Clarifying Salicylic Gel Cleanser',
      brand: 'Joyory',
      role: 'Cleanse & Refresh',
      price: 449,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prod-am-02',
      step: 'Step 2',
      name: '2% Salicylic Acid Treatment Serum',
      brand: 'Minimalist',
      role: 'Blemish Control',
      price: 549,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prod-am-03',
      step: 'Step 3',
      name: 'Matte Invisible Sunscreen SPF 50',
      brand: 'Joyory',
      role: 'UV Shield',
      price: 549,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const pmSteps: RoutineStep[] = [
    {
      id: 'prod-pm-01',
      step: 'Step 1',
      name: 'Clarifying Salicylic Gel Cleanser',
      brand: 'Joyory',
      role: 'Deep Cleansing',
      price: 449,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prod-pm-02',
      step: 'Step 2',
      name: 'Ceramide & Cica Barrier Relief Cream',
      brand: 'Joyory',
      role: 'Night Barrier Repair',
      price: 599,
      image: 'https://images.unsplash.com/photo-1512290900673-42e7d7164b38?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const handleAddSingleStep = (step: RoutineStep) => {
    const item: OrderItem = {
      id: step.id,
      name: step.name,
      brand: step.brand,
      price: step.price,
      quantity: 1,
      image: step.image,
      role: step.role,
    };
    addToCart(item);
    setAddedItemName(`Added 1 Product: ${step.name}`);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  const handleAddAmRoutine = () => {
    const items: OrderItem[] = amSteps.map((s) => ({
      id: s.id,
      name: s.name,
      brand: s.brand,
      price: s.price,
      quantity: 1,
      image: s.image,
      role: s.role,
    }));
    addMultipleToCart(items);
    setAddedItemName(`Added AM Routine (3 Products) to Cart!`);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  const handleAddPmRoutine = () => {
    const items: OrderItem[] = pmSteps.map((s) => ({
      id: s.id,
      name: s.name,
      brand: s.brand,
      price: s.price,
      quantity: 1,
      image: s.image,
      role: s.role,
    }));
    addMultipleToCart(items);
    setAddedItemName(`Added PM Routine (2 Products) to Cart!`);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  const handleAddCompleteRoutine = () => {
    const all = [...amSteps, pmSteps[1]]; // Avoid duplicate cleanser
    const items: OrderItem[] = all.map((s) => ({
      id: s.id,
      name: s.name,
      brand: s.brand,
      price: s.price,
      quantity: 1,
      image: s.image,
      role: s.role,
    }));
    addMultipleToCart(items);
    router.push('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Toast banner */}
      {addedItemName && (
        <div className="p-3.5 rounded-2xl bg-stone-900 text-white flex items-center justify-between shadow-soft animate-slide-up text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{addedItemName}</span>
          </div>
          <Link href="/cart" className="text-joyory-rose hover:underline font-bold">
            View Cart →
          </Link>
        </div>
      )}

      <div className="text-center space-y-3">
        <Badge variant="rose">Routine Builder</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Your Customized AM & PM Routine
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
          Synergistic layering that ensures active ingredients work together without irritating your skin barrier. Pick 1 product, 2 products, or the full ritual!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AM Routine */}
        <Card variant="default" className="border-amber-200/60 bg-gradient-to-b from-amber-50/30 to-white flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
                  <Sun className="w-5 h-5" />
                  <span>Morning Ritual (AM · 3 Steps)</span>
                </div>
                <Badge variant="emerald" className="text-[11px]">3 Products · ₹1,547</Badge>
              </div>
              <CardTitle className="text-xl">Protection & Balance</CardTitle>
              <CardDescription>Keep skin hydrated, shine-free, and shielded against sun damage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {amSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-stone-100 flex items-center justify-between shadow-xs hover:border-amber-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {s.image && (
                      <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 block">{s.step} · {s.role}</span>
                      <div className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{s.name}</div>
                      <div className="text-[11px] text-stone-400">{s.brand} · ₹{s.price}</div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSingleStep(s)}
                    className="text-xs shrink-0 border-stone-200 hover:border-joyory-rose"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Pick 1
                  </Button>
                </div>
              ))}
            </CardContent>
          </div>

          <div className="p-6 pt-0 border-t border-amber-100 mt-4">
            <Button
              type="button"
              onClick={handleAddAmRoutine}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              Add AM Routine (3 Products · ₹1,547)
            </Button>
          </div>
        </Card>

        {/* PM Routine */}
        <Card variant="default" className="border-indigo-200/60 bg-gradient-to-b from-indigo-50/30 to-white flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                  <Moon className="w-5 h-5" />
                  <span>Evening Ritual (PM · 2 Steps)</span>
                </div>
                <Badge variant="emerald" className="text-[11px]">2 Products · ₹1,048</Badge>
              </div>
              <CardTitle className="text-xl">Restoration & Repair</CardTitle>
              <CardDescription>Dissolve daytime grime and rebuild essential skin ceramides overnight.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pmSteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-stone-100 flex items-center justify-between shadow-xs hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {s.image && (
                      <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 block">{s.step} · {s.role}</span>
                      <div className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{s.name}</div>
                      <div className="text-[11px] text-stone-400">{s.brand} · ₹{s.price}</div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSingleStep(s)}
                    className="text-xs shrink-0 border-stone-200 hover:border-joyory-rose"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Pick 1
                  </Button>
                </div>
              ))}
            </CardContent>
          </div>

          <div className="p-6 pt-0 border-t border-indigo-100 mt-4">
            <Button
              type="button"
              onClick={handleAddPmRoutine}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              Add PM Routine (2 Products · ₹1,048)
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          size="lg"
          onClick={handleAddCompleteRoutine}
          className="shadow-soft hover:shadow-glow font-bold"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Proceed with All Products to Cart
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <a href="https://joyory.com" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="border-stone-300">
            <Compass className="w-4 h-4 mr-2 text-joyory-rose" />
            Browse All Products on Joyory
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
          </Button>
        </a>
      </div>
    </div>
  );
}
