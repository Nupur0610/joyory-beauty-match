'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShoppingBag, Menu, X, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quiz', label: 'Match Quiz' },
    { href: '/results', label: 'My Results' },
    { href: '/routine', label: 'Routine Builder' },
    { href: '/product', label: 'Products' },
  ];

  return (
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
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-joyory-50 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-joyory-rose rounded-full" />
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
          {navLinks.map((link) => (
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
          ))}
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
  );
}

export default Navbar;
