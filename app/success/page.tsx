import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Sparkles, ArrowRight, Home } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <Badge variant="emerald">Order Placed Successfully</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Your Beauty Journey Begins!
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto">
          Order #JOY-{Math.floor(100000 + Math.random() * 900000)} has been confirmed. Your personalized routine is being curated.
        </p>
      </div>

      <Card variant="glass" className="p-6 text-left space-y-4 max-w-md mx-auto">
        <div className="text-xs font-bold text-joyory-500 uppercase tracking-wider">
          Routine Summary
        </div>
        <ul className="text-xs space-y-2 text-stone-700">
          <li>• Minimalist 2% Salicylic Acid Treatment Serum</li>
          <li>• Joyory Matte Finish Invisible Sunscreen SPF 50</li>
          <li>• Joyory Clarifying Salicylic Gel Cleanser</li>
        </ul>
        <div className="pt-2 border-t border-stone-200 text-xs text-stone-500">
          Estimated delivery in 2-3 business days.
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link href="/">
          <Button variant="outline" size="md">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <Link href="/quiz">
          <Button size="md">
            <Sparkles className="w-4 h-4 mr-2" />
            Take Another Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
