import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-joyory-rose flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Joyory
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your personalized AI-guided beauty match assistant. Clear ingredient intelligence, routine building, and science-backed recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://joyory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-joyory-rose font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Browse Products on Joyory</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-joyory-rose transition-colors">
                  Beauty Match Quiz
                </Link>
              </li>
              <li>
                <Link href="/routine" className="hover:text-joyory-rose transition-colors">
                  Routine Builder
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-joyory-rose transition-colors">
                  Match Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Routine Steps */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              AI Beauty Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-stone-300">✨ Beauty Match Quiz</span></li>
              <li><span className="text-stone-300">💄 AI Virtual Try-On</span></li>
              <li><span className="text-stone-300">🎨 Foundation Shade Finder</span></li>
              <li><span className="text-stone-300">🧪 Ingredient Safety Checker</span></li>
            </ul>
          </div>

          {/* Joyory Info */}
          <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/50 space-y-2">
            <span className="text-xs font-semibold text-joyory-rose tracking-wide uppercase">
              Joyory Platform
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              Joyory is an exciting beauty-tech platform offering 100% authentic cosmetics, skincare, haircare, and body care with PAN India delivery.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Joyory Beauty Match. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-joyory-rose inline fill-joyory-rose" /> for personalized beauty
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
