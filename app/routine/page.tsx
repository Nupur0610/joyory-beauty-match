import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sun, Moon, ShoppingBag, ArrowRight } from 'lucide-react';

export default function RoutinePage() {
  const amSteps = [
    { step: 'Step 1', name: 'Clarifying Salicylic Gel Cleanser', brand: 'Joyory', role: 'Cleanse & Refresh' },
    { step: 'Step 2', name: '2% Salicylic Acid Treatment Serum', brand: 'Minimalist', role: 'Blemish Control' },
    { step: 'Step 3', name: 'Matte Invisible Sunscreen SPF 50', brand: 'Joyory', role: 'UV Shield' },
  ];

  const pmSteps = [
    { step: 'Step 1', name: 'Clarifying Salicylic Gel Cleanser', brand: 'Joyory', role: 'Deep Cleansing' },
    { step: 'Step 2', name: 'Ceramide & Cica Barrier Relief Cream', brand: 'Joyory', role: 'Night Barrier Repair' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="rose">Routine Builder</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Your Customized AM & PM Routine
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
          Synergistic layering that ensures active ingredients work together without irritating your skin barrier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AM Routine */}
        <Card variant="default" className="border-amber-200/60 bg-gradient-to-b from-amber-50/30 to-white">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm">
              <Sun className="w-5 h-5" />
              <span>Morning Ritual (AM)</span>
            </div>
            <CardTitle className="text-xl">Protection & Balance</CardTitle>
            <CardDescription>Keep skin hydrated, shine-free, and shielded against sun damage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {amSteps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-stone-100 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-amber-700">{s.step} · {s.role}</span>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{s.name}</div>
                  <div className="text-xs text-stone-500">{s.brand}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PM Routine */}
        <Card variant="default" className="border-indigo-200/60 bg-gradient-to-b from-indigo-50/30 to-white">
          <CardHeader>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
              <Moon className="w-5 h-5" />
              <span>Evening Ritual (PM)</span>
            </div>
            <CardTitle className="text-xl">Restoration & Repair</CardTitle>
            <CardDescription>Dissolve daytime grime and rebuild essential skin ceramides overnight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pmSteps.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-stone-100 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs font-bold text-indigo-700">{s.step} · {s.role}</span>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{s.name}</div>
                  <div className="text-xs text-stone-500">{s.brand}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Link href="/cart">
          <Button size="lg" className="shadow-soft hover:shadow-glow">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Proceed with Routine to Cart
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
