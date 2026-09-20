import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const items = [
    {
      id: 'prod-sr-01',
      name: '2% Salicylic Acid + LHA Anti-Acne Serum',
      brand: 'Minimalist',
      price: 549,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prod-sn-01',
      name: 'Matte Finish Ultra-Light Sunscreen Gel SPF 50',
      brand: 'Joyory',
      price: 549,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'prod-cl-01',
      name: 'Clarifying Salicylic Gel Cleanser',
      brand: 'Joyory',
      price: 449,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Badge variant="rose">Shopping Cart</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
          Your Beauty Match Bundle
        </h1>
        <p className="text-stone-600 text-sm">3 personalized items ready for your daily routine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-stone-100"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-joyory-500">
                    {item.brand}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base line-clamp-1">{item.name}</h3>
                  <div className="text-xs text-stone-500 mt-1">Qty: {item.quantity}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-stone-900 text-base">₹{item.price}</div>
                <button className="text-xs text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 mt-2">
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <Card variant="glass" className="space-y-4">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
            <CardDescription>Free shipping on all Beauty Match bundles.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({items.length} items)</span>
              <span className="font-medium text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="font-medium text-emerald-600">FREE</span>
            </div>
            <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-lg text-stone-900">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3">
            <Link href="/checkout" className="w-full">
              <Button size="lg" className="w-full shadow-soft hover:shadow-glow">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Secure Checkout</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
