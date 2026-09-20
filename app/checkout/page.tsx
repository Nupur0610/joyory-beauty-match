import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="rose">Mock Checkout</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Complete Your Joyory Order
        </h1>
        <p className="text-stone-600 text-sm">Demo checkout experience for hackathon evaluation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle className="text-lg">1. Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Nupur Sharma"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-joyory-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">Shipping Address</label>
              <input
                type="text"
                defaultValue="402, Cyber Heights, Sector 18"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-joyory-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  defaultValue="Bengaluru"
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-joyory-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">PIN Code</label>
                <input
                  type="text"
                  defaultValue="560001"
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-joyory-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card variant="glass" className="space-y-4 flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="text-lg">2. Payment Method (Demo)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 rounded-xl border border-joyory-rose bg-rose-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-joyory-rose" />
                  <span className="font-semibold text-stone-900">UPI / Instant Pay (Mock)</span>
                </div>
                <Badge variant="rose">Recommended</Badge>
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Total Amount</span>
                  <span className="font-bold text-stone-900">₹1,547</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-emerald-700">2-3 Business Days</span>
                </div>
              </div>
            </CardContent>
          </div>

          <CardFooter className="flex-col gap-3">
            <Link href="/success" className="w-full">
              <Button size="lg" className="w-full shadow-soft hover:shadow-glow">
                <Lock className="w-4 h-4 mr-2" />
                Place Demo Order (₹1,547)
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
