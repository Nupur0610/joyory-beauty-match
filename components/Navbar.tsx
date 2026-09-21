'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShoppingBag, Menu, X, Compass, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCartFromStorage } from '@/lib/order';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getCartFromStorage();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCount();

    window.addEventListener('joyory_cart_updated', updateCount);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('joyory_cart_updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Match Quiz' },
    { href: '/results', label: 'My Results' },
    { href: '/routine', label: 'Routine Builder' },
    { href: 'https://joyory.com', label: 'Browse Products', isExternal: true },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3">
        <span>✨ <strong>100% Authentic Beauty Products</strong> · Free PAN India Shipping</span>
        <span className="hidden sm:inline text-stone-400">|</span>
        <span className="hidden sm:inline text-rose-200">AI Formulation & Multi-Brand Matching</span>
      </div>

      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-joyory-100/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-joyory-rose to-rose-400 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-joyory-rose transition-colors">
                  Joyory
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-joyory-500 -mt-1">
                  Beauty Match
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-joyory-rose hover:text-[#d64d64] flex items-center gap-1 py-1 transition-colors bg-rose-50/70 px-3 py-1 rounded-full border border-rose-200/80"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-joyory-rose relative py-1',
                      isActive
                        ? 'text-joyory-rose font-semibold'
                        : 'text-stone-600'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-joyory-rose rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://joyory.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-stone-700 hover:text-joyory-rose border border-stone-200 hover:border-rose-300 rounded-lg px-3 py-2 flex items-center gap-1.5 transition-colors bg-white shadow-2xs"
              >
                <Compass className="w-3.5 h-3.5 text-joyory-rose" />
                <span>Explore Joyory Store</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <Link
                href="/cart"
                className="relative p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-joyory-50 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 ? (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-joyory-rose text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-scale-in">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                ) : (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-stone-300 rounded-full" />
                )}
              </Link>

              <Link href="/quiz">
                <Button size="sm" className="shadow-soft hover:shadow-glow">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Take Quiz
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                href="/cart"
                className="relative p-2 rounded-full text-stone-600"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-joyory-rose text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-stone-700 hover:bg-joyory-50 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-joyory-100 bg-white/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-bold text-joyory-rose bg-rose-50/80 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-joyory-50 text-joyory-rose font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Beauty Match Quiz
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
