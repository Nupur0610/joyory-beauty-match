import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="rose">Joyory Match Quiz</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Find Your Personalized Beauty Routine
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
          Answer a few quick questions about your skin or hair type, concerns, and preferences to unlock tailored recommendations.
        </p>
      </div>

      {/* Quiz Container Placeholder */}
      <Card variant="glass" className="border-stone-200">
        <CardHeader>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span>Question 1 of 5</span>
            <span className="font-semibold text-joyory-rose">20% Completed</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div className="bg-joyory-rose h-full w-1/5 rounded-full" />
          </div>
          <CardTitle className="text-2xl pt-4">What category are you shopping for?</CardTitle>
          <CardDescription>Select the primary area you want recommendations for today.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Skincare (Face)', 'Haircare (Hair & Scalp)', 'Body Care'].map((option, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-stone-200 hover:border-joyory-rose bg-white hover:bg-rose-50/40 transition-all cursor-pointer space-y-2 group"
              >
                <div className="w-6 h-6 rounded-full border border-stone-300 group-hover:border-joyory-rose flex items-center justify-center text-white group-hover:bg-joyory-rose transition-colors">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-joyory-rose">{option}</div>
                <div className="text-xs text-stone-500">Cleansers, treatments, moisturizers & sunscreens.</div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button variant="ghost" size="sm">
            Skip / Quick Match
          </Button>
          <Link href="/results">
            <Button>
              Next Question
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
