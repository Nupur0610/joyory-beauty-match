import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Joyory Beauty Match | Personalized Beauty Shopping Assistant',
  description:
    'Discover science-backed, personalized skincare and haircare routines perfectly matched to your skin type, concerns, and budget.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF7F5] text-stone-900 antialiased selection:bg-rose-100 selection:text-rose-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
