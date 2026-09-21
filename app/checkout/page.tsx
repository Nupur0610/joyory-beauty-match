'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Building2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { CustomerDetails, OrderRecord, DEFAULT_SAMPLE_ITEMS, saveOrderToStorage, getCartFromStorage, clearCart, OrderItem } from '@/lib/order';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh'
];

export default function CheckoutPage() {
  const router = useRouter();

  // Dynamic cart items
  const [items, setItems] = useState<OrderItem[]>(DEFAULT_SAMPLE_ITEMS);

  useEffect(() => {
    const cartItems = getCartFromStorage();
    if (cartItems && cartItems.length > 0) {
      setItems(cartItems);
    }
  }, []);

  // Form State - Starts clean and empty
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'NetBanking'>('UPI');
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState(false);

  // Totals from dynamic cart
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const total = subtotal - discount + shipping;

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for delivery updates.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address / house number is required.';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Please provide complete delivery address.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Please select your state.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required.';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'PIN Code must be 6 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutofillSample = () => {
    setFormData({
      fullName: 'Nupur Shah',
      email: 'nupur.shah@example.com',
      phone: '9876543210',
      address: 'Flat 402, Cyber Heights, Sector 18',
      landmark: 'Near DLF Cyber Hub',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
    });
    setErrors({});
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
    });
    setErrors({});
    setSubmittedAttempt(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAttempt(true);

    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderRecord: OrderRecord = {
      orderId: `JOY-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: formData,
      items: items,
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      total: total,
      paymentMethod:
        paymentMethod === 'UPI'
          ? 'UPI / Instant Pay (Google Pay / PhonePe / Paytm)'
          : paymentMethod === 'Card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'COD'
          ? 'Cash on Delivery (COD)'
          : 'Net Banking',
      paymentStatus: paymentMethod === 'COD' ? 'Cash on Delivery' : 'Paid',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    saveOrderToStorage(orderRecord);
    clearCart();

    setTimeout(() => {
      router.push('/success');
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center text-xs font-semibold text-stone-500 hover:text-joyory-rose mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Cart
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Checkout & Delivery Details
            </h1>
            <Badge variant="rose">Secure Checkout</Badge>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Please provide the customer delivery address and contact information to confirm your order.
          </p>
        </div>

        {/* Action helper buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleAutofillSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-joyory-300 bg-rose-50/70 hover:bg-rose-100 text-joyory-700 text-xs font-semibold transition-colors"
            title="Quickly fill sample details for testing"
          >
            <Sparkles className="w-3.5 h-3.5 text-joyory-rose" />
            Fill Demo Details
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-medium transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {submittedAttempt && Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 flex items-start gap-3 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Incomplete Customer Details</span>
            <span>Please fill out all required customer contact and delivery address fields before placing your order.</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customer Details & Shipping Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Contact Info */}
            <Card className="p-6 space-y-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="font-semibold text-base text-stone-900">Customer Contact Details</h2>
                </div>
                <span className="text-[11px] text-stone-400 font-medium">* Required fields</span>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="text-xs font-semibold text-stone-700 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. Nupur Shah"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.fullName
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-joyory-500 bg-white'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full pl-9 pr-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                          errors.email
                            ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                            : 'border-stone-300 focus:ring-joyory-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-xs font-semibold text-stone-700 block mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        id="phone"
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                        className={`w-full pl-9 pr-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                          errors.phone
                            ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                            : 'border-stone-300 focus:ring-joyory-500 bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 2: Delivery Address */}
            <Card className="p-6 space-y-4 shadow-soft">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h2 className="font-semibold text-base text-stone-900">Delivery Address</h2>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free Express Delivery</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Street Address */}
                <div>
                  <label htmlFor="address" className="text-xs font-semibold text-stone-700 block mb-1">
                    House / Flat / Building / Street <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      id="address"
                      type="text"
                      placeholder="e.g. Flat 402, Cyber Heights, Sector 18"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.address
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-joyory-500 bg-white'
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Landmark (Optional) */}
                <div>
                  <label htmlFor="landmark" className="text-xs font-semibold text-stone-700 block mb-1">
                    Landmark / Area <span className="text-stone-400 text-[11px]">(Optional)</span>
                  </label>
                  <input
                    id="landmark"
                    type="text"
                    placeholder="e.g. Near DLF Cyber Hub / Opposite City Park"
                    value={formData.landmark || ''}
                    onChange={(e) => handleChange('landmark', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-joyory-500 bg-white"
                  />
                </div>

                {/* City, State, PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="city" className="text-xs font-semibold text-stone-700 block mb-1">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="e.g. Gurugram"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.city
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-joyory-500 bg-white'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="text-xs font-semibold text-stone-700 block mb-1">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors bg-white ${
                        errors.state
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-joyory-500'
                      }`}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pincode" className="text-xs font-semibold text-stone-700 block mb-1">
                      PIN Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 122002"
                      value={formData.pincode}
                      onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
                        errors.pincode
                          ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-joyory-500 bg-white'
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3: Payment Method Selection */}
            <Card className="p-6 space-y-4 shadow-soft">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <div className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <h2 className="font-semibold text-base text-stone-900">Payment Option</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* UPI */}
                <label
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-joyory-rose bg-rose-50/40 text-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-joyory-rose" />
                    <div>
                      <div className="text-xs font-bold">UPI / Instant Pay</div>
                      <div className="text-[11px] text-stone-500">GPay, PhonePe, Paytm</div>
                    </div>
                  </div>
                  {paymentMethod === 'UPI' && <CheckCircle2 className="w-4 h-4 text-joyory-rose" />}
                </label>

                {/* Card */}
                <label
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-joyory-rose bg-rose-50/40 text-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-joyory-rose" />
                    <div>
                      <div className="text-xs font-bold">Credit / Debit Card</div>
                      <div className="text-[11px] text-stone-500">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                  {paymentMethod === 'Card' && <CheckCircle2 className="w-4 h-4 text-joyory-rose" />}
                </label>

                {/* Net Banking */}
                <label
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'NetBanking'
                      ? 'border-joyory-rose bg-rose-50/40 text-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-joyory-rose" />
                    <div>
                      <div className="text-xs font-bold">Net Banking</div>
                      <div className="text-[11px] text-stone-500">All Major Banks</div>
                    </div>
                  </div>
                  {paymentMethod === 'NetBanking' && <CheckCircle2 className="w-4 h-4 text-joyory-rose" />}
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-joyory-rose bg-rose-50/40 text-stone-900 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-4 h-4 text-joyory-rose" />
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery</div>
                      <div className="text-[11px] text-stone-500">Pay at your doorstep</div>
                    </div>
                  </div>
                  {paymentMethod === 'COD' && <CheckCircle2 className="w-4 h-4 text-joyory-rose" />}
                </label>
              </div>
            </Card>
          </div>

          {/* Right Column: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="glass" className="p-6 space-y-5 sticky top-28 shadow-soft">
              <div className="border-b border-stone-200/80 pb-3">
                <h3 className="font-serif text-lg font-bold text-stone-900">Order Summary</h3>
                <p className="text-xs text-stone-500">{items.length} items in Beauty Match bundle</p>
              </div>

              {/* Items List Mini */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200/60"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-joyory-500 uppercase tracking-wider block">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-semibold text-stone-800 line-clamp-1">{item.name}</h4>
                      <span className="text-[11px] text-stone-400">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-xs font-bold text-stone-900 shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Personalized Consultation Match</span>
                  <span className="font-semibold text-joyory-rose">FREE</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-stone-900">Total Payable</span>
                  <span className="font-serif font-bold text-xl text-stone-900">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Delivery Guarantee */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Authentic Products · 7-day Easy Return Policy</span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full shadow-soft hover:shadow-glow text-sm font-semibold py-3"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Your Order...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Complete Order · ₹{total.toLocaleString('en-IN')}
                  </span>
                )}
              </Button>

              <p className="text-[11px] text-center text-stone-400">
                By placing this order, you agree to Joyory terms of service & privacy policy.
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
