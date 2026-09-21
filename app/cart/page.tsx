'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Compass,
  ExternalLink,
  Plus,
  Minus,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import {
  OrderItem,
  getCartFromStorage,
  removeFromCart,
  updateCartQuantity,
  saveCartToStorage,
  clearCart,
  DEFAULT_SAMPLE_ITEMS,
} from '@/lib/order';

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart on mount & subscribe to updates
  useEffect(() => {
    const loadItems = () => {
      const stored = getCartFromStorage();
      if (stored.length > 0) {
        setItems(stored);
      } else {
        // Check if there is stored quiz results to create a recommended set or default
        setItems(DEFAULT_SAMPLE_ITEMS);
        saveCartToStorage(DEFAULT_SAMPLE_ITEMS);
      }
      setIsLoaded(true);
    };

    loadItems();

    const handleCartUpdate = () => {
      const updated = getCartFromStorage();
      setItems(updated);
    };

    window.addEventListener('joyory_cart_updated', handleCartUpdate);
    return () => {
      window.removeEventListener('joyory_cart_updated', handleCartUpdate);
    };
  }, []);

  const handleQuantityChange = (id: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      handleRemove(id);
    } else {
      updateCartQuantity(id, newQty);
    }
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleResetToSample = () => {
    saveCartToStorage(DEFAULT_SAMPLE_ITEMS);
  };

  const handleClearAll = () => {
    clearCart();
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-10 h-10 border-3 border-joyory-rose border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Loading your beauty bundle...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/results"
              className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-joyory-rose transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Match Results
            </Link>
          </div>
          <div className="flex items-center gap-2.5 mt-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Your Beauty Match Bundle
            </h1>
            <Badge variant="rose">
              {totalItemCount} {totalItemCount === 1 ? 'Product' : 'Products'} Selected
            </Badge>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            {items.length === 1
              ? 'You have selected 1 product for your targeted treatment.'
              : items.length === 2
              ? 'You have selected 2 synergistic products for your routine.'
              : items.length > 2
              ? `You have selected ${items.length} products in your complete beauty match routine.`
              : 'Your cart is currently empty.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link href="/results">
            <Button variant="outline" size="sm" className="text-xs bg-white border-stone-200 hover:border-joyory-rose">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-joyory-rose" />
              Choose / Change Products
            </Button>
          </Link>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-rose-50 text-stone-500 hover:text-rose-600 text-xs font-medium transition-colors"
              title="Empty Cart"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <Card className="p-12 text-center space-y-5 shadow-soft max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-joyory-rose flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              You haven't added any products yet. Take the Beauty Match Quiz or browse your recommendations to pick 1, 2, or 3 products!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/results">
              <Button size="md" className="shadow-soft hover:shadow-glow">
                <Sparkles className="w-4 h-4 mr-2" />
                View Recommended Products
              </Button>
            </Link>
            <button
              type="button"
              onClick={handleResetToSample}
              className="px-4 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-sm font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              Load Sample Bundle
            </button>
          </div>
        </Card>
      ) : (
        /* Active Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Selected Products ({items.length})
              </span>
              <span className="text-xs text-stone-400">You can adjust quantity or remove items below</span>
            </div>

            {items.map((item, index) => (
              <Card
                key={item.id || index}
                className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-soft hover:shadow-md transition-all border-stone-200/90"
              >
                <div className="flex gap-4 items-center flex-1 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-stone-100 shrink-0 border border-stone-200/60"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-joyory-500">
                        {item.brand}
                      </span>
                      {item.role && (
                        <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                          {item.role}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                    <div className="font-serif font-bold text-stone-900 text-sm mt-1">
                      ₹{item.price.toLocaleString('en-IN')}{' '}
                      <span className="text-[11px] font-normal text-stone-400">each</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      className="p-1.5 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-colors"
                      title="Decrease quantity"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-stone-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                      className="p-1.5 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-colors"
                      title="Increase quantity"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Sub-total for item & remove button */}
                  <div className="flex items-center sm:flex-col sm:items-end gap-2">
                    <div className="font-extrabold text-stone-900 text-base">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 inline-flex items-center gap-1 font-medium transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Quick helper note */}
            <div className="p-3.5 rounded-xl bg-joyory-50/70 border border-joyory-100 flex items-center justify-between text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-joyory-rose" />
                Want to pick only 1 or 2 products instead?
              </span>
              <Link href="/results" className="text-joyory-rose font-bold hover:underline">
                Edit Selection →
              </Link>
            </div>
          </div>

          {/* Order Summary & Checkout (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="glass" className="space-y-4 p-6 shadow-soft sticky top-28">
              <CardHeader className="p-0 border-b border-stone-200/80 pb-3">
                <CardTitle className="text-xl font-serif">Order Summary</CardTitle>
                <CardDescription className="text-xs">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your Beauty Match bundle
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 space-y-3 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>
                    Subtotal ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-medium text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>PAN India Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>AI Consultation & Formulation Match</span>
                  <span className="font-semibold text-joyory-rose">FREE</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-stone-900">Total Payable</span>
                  <span className="font-serif font-bold text-2xl text-stone-900">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-0 flex-col gap-3 pt-2">
                <Link href="/checkout" className="w-full">
                  <Button size="lg" className="w-full shadow-soft hover:shadow-glow text-sm font-semibold py-3.5">
                    Proceed to Checkout ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <a href="https://joyory.com" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" size="sm" className="w-full text-xs border-stone-200 text-stone-700 bg-white hover:bg-stone-50">
                    <Compass className="w-3.5 h-3.5 mr-1.5 text-joyory-rose" />
                    Browse All Products on Joyory Store
                    <ExternalLink className="w-3 h-3 ml-1 text-stone-400" />
                  </Button>
                </a>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center gap-1.5 text-xs text-emerald-800 w-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Authentic Products · 7-day Easy Returns</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
