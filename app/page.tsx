import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ShieldCheck, Layers, ArrowRight, Star, Heart, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const steps = [
    {
      step: '01',
      title: 'Share Your Profile',
      description: 'Tell us your skin or hair type, primary concerns, budget, and ingredient preferences in a 60-second quiz.',
      badge: 'Step 1'
    },
    {
      step: '02',
      title: 'AI Matching Engine',
      description: 'Our deterministic scoring algorithm evaluates 20+ dermatological formulas across active ingredients and price.',
      badge: 'Step 2'
    },
    {
      step: '03',
      title: 'Personalized Routine',
      description: 'Receive top 3 matched products with transparent reasonings, routine balance, and one-click cart building.',
      badge: 'Step 3'
    },
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: 'Explainable Matching',
      desc: 'Transparent scoring breakdowns so you know exactly why each product matches your skin barrier.',
    },
    {
      icon: ShieldCheck,
      title: 'Ingredient Intelligence',
      desc: 'Formulas vetted for active concentrations (Salicylic Acid, Ceramides, Peptides, Hyaluronic Acid).',
    },
    {
      icon: Layers,
      title: 'Cohesive Routine Builder',
      desc: 'Automated AM/PM routine structuring that avoids ingredient clashes and maximizes skin synergy.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-joyory-rose text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Personalized Beauty Assistant
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-stone-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Beauty matched to your{' '}
            <span className="text-gradient-rose italic font-medium">
              exact skin & hair
            </span>{' '}
            profile.
          </h1>

          <p className="text-stone-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Stop guessing through thousands of products. Get science-backed, personalized recommendations with transparent ingredient matching in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/quiz">
              <Button size="lg" className="shadow-soft hover:shadow-glow text-base px-8 py-4">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Beauty Match Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" size="lg" className="text-base px-8 py-4">
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Deterministic Engine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dermatological Active Matching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Budget-Conscious INR Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <Badge variant="subtle" className="text-xs px-3 py-1">Simple 3-Step Journey</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            How Joyory Matches You
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm">
            From concerns to cart in under 2 minutes with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <Card key={idx} variant="interactive" className="relative group overflow-hidden">
              <div className="text-5xl font-serif font-black text-rose-100 group-hover:text-rose-200 transition-colors absolute top-4 right-6 select-none">
                {item.step}
              </div>
              <CardHeader>
                <Badge variant="rose" className="w-fit mb-3">{item.badge}</Badge>
                <CardTitle className="text-xl font-bold text-stone-900">{item.title}</CardTitle>
                <CardDescription className="text-stone-600 leading-relaxed pt-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Value Propositions */}
      <section className="bg-white py-20 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <Badge variant="emerald" className="text-xs px-3 py-1">Why Joyory</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Built for Informed Beauty Shoppers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="p-8 rounded-2xl bg-joyory-50/60 border border-joyory-100 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center text-joyory-rose">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900">{h.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ready to Start CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-12 sm:p-16 text-white shadow-soft-lg space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-joyory-rose/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Ready to meet your perfect match?
          </h2>
          <p className="text-stone-300 text-base max-w-xl mx-auto font-light">
            Take the 60-second Joyory Beauty Match Quiz and discover curated formulations tailored specifically to your needs.
          </p>
          <div className="pt-4">
            <Link href="/quiz">
              <Button size="lg" className="bg-joyory-rose hover:bg-[#d64d64] text-white px-8 py-4 shadow-glow">
                <Sparkles className="w-5 h-5 mr-2" />
                Take Beauty Match Quiz Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
