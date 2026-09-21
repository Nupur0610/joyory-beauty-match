'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Home,
  Compass,
  ExternalLink,
  Printer,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  Package,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { OrderRecord, getOrderFromStorage, DEFAULT_SAMPLE_ITEMS } from '@/lib/order';

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = getOrderFromStorage();
    if (savedOrder) {
      setOrder(savedOrder);
    } else {
      // Fallback default sample order so page remains visually complete if visited directly
      setOrder({
        orderId: `JOY-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: 'Nupur Shah',
          email: 'nupur.shah@example.com',
          phone: '9876543210',
          address: 'Flat 402, Cyber Heights, Sector 18',
          landmark: 'Near DLF Cyber Hub',
          city: 'Gurugram',
          state: 'Haryana',
          pincode: '122002',
        },
        items: DEFAULT_SAMPLE_ITEMS,
        subtotal: 1547,
        discount: 0,
        shipping: 0,
        total: 1547,
        paymentMethod: 'UPI / Instant Pay (Mock)',
        paymentStatus: 'Paid',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    }
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-3 border-joyory-rose border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 text-sm">Loading order confirmation...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 print:p-0 print:m-0">
      {/* Success Celebration Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft animate-bounce-subtle">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Order Placed & Confirmed</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Thank You, {order.customer.fullName}!
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Your Joyory personalized beauty order <strong className="text-stone-900 font-semibold">{order.orderId}</strong> has been received and is being prepared with clinical precision.
        </p>
      </div>

      {/* Tracking Progress Timeline */}
      <Card variant="glass" className="p-6">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Truck className="w-4 h-4 text-joyory-rose" />
          <span>Delivery Tracking Status</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-soft">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900">Order Confirmed</span>
            <span className="text-[11px] text-stone-500">Just Now</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div className="w-10 h-10 rounded-full bg-joyory-rose text-white flex items-center justify-center shadow-soft animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-joyory-700">Curating Routine</span>
            <span className="text-[11px] text-stone-500">Processing</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center border border-stone-200">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-500">Dispatched</span>
            <span className="text-[11px] text-stone-400">Within 24 Hours</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center space-y-2 relative">
            <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center border border-stone-200">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-500">Est. Delivery</span>
            <span className="text-[11px] font-medium text-emerald-700">{order.estimatedDelivery}</span>
          </div>
        </div>
      </Card>

      {/* Details Grid: Customer Info & Order Items */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Customer & Shipping Details (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <Card className="p-6 space-y-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="font-semibold text-base text-stone-900 flex items-center gap-2">
                <User className="w-4 h-4 text-joyory-rose" />
                Customer & Delivery Info
              </h2>
              <Badge variant="rose">Verified</Badge>
            </div>

            {/* Customer Details Content */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-stone-400 uppercase tracking-wider font-bold text-[10px] block">
                  Customer Name
                </span>
                <span className="font-bold text-stone-900 text-sm mt-0.5 block">
                  {order.customer.fullName}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-stone-100">
                <div className="flex items-start gap-2 text-stone-700">
                  <Mail className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-start gap-2 text-stone-700">
                  <Phone className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                  <span>+91 {order.customer.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-stone-400 uppercase tracking-wider font-bold text-[10px] block mb-1">
                  Shipping Address
                </span>
                <div className="flex items-start gap-2 text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                  <MapPin className="w-4 h-4 text-joyory-rose mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-medium text-stone-900">{order.customer.address}</p>
                    {order.customer.landmark && (
                      <p className="text-stone-500">Landmark: {order.customer.landmark}</p>
                    )}
                    <p className="text-stone-700">
                      {order.customer.city}, {order.customer.state} - <strong>{order.customer.pincode}</strong>
                    </p>
                    <p className="text-stone-500 text-[11px]">India</p>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-stone-400 uppercase tracking-wider font-bold text-[10px] block">
                  Payment Information
                </span>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-stone-400" />
                    {order.paymentMethod}
                  </span>
                  <Badge variant={order.paymentStatus === 'Paid' ? 'emerald' : 'gold'}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Guarantee Card */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2 text-xs text-amber-900 print:hidden">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Joyory Customer Care & Support</span>
            </div>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Order status SMS and WhatsApp tracking links have been sent to <strong>+91 {order.customer.phone}</strong>. For any queries, write to support@joyory.com.
            </p>
          </div>
        </div>

        {/* Order Items & Receipt (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <Card className="p-6 space-y-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="font-semibold text-base text-stone-900">Items in Your Order</h2>
                <p className="text-xs text-stone-500">Personalized AM & PM routine regimen</p>
              </div>
              <span className="text-xs font-bold text-stone-700">{order.items.length} Products</span>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-100 hover:border-stone-200 bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200/60"
                      />
                    )}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-joyory-500 block">
                        {item.brand} {item.role ? `· ${item.role}` : ''}
                      </span>
                      <h3 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">{item.name}</h3>
                      <div className="text-[11px] text-stone-500 mt-0.5">Qty: {item.quantity}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-stone-900 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping & Handling</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm">
                <span className="font-bold text-stone-900">Total Paid</span>
                <span className="font-serif font-bold text-xl text-stone-900">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Actions & Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-stone-200 print:hidden">
        <Button variant="outline" size="md" onClick={handlePrint}>
          <Printer className="w-4 h-4 mr-2" />
          Print / Save Receipt
        </Button>

        <Link href="/">
          <Button variant="outline" size="md">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Link href="/quiz">
          <Button variant="outline" size="md">
            <Sparkles className="w-4 h-4 mr-2 text-joyory-rose" />
            Consultation Quiz
          </Button>
        </Link>

        <a href="https://joyory.com" target="_blank" rel="noopener noreferrer">
          <Button size="md" className="bg-joyory-rose hover:bg-[#d64d64] text-white shadow-soft">
            <Compass className="w-4 h-4 mr-2" />
            Browse More on Joyory
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
          </Button>
        </a>
      </div>
    </div>
  );
}
