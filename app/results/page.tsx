'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  SlidersHorizontal,
  Check,
  Heart,
  HelpCircle,
  Tag,
  Sun,
  Moon,
  Clock,
  Zap,
  ShieldCheck,
  FileText,
  FileCheck,
  Compass,
  ExternalLink,
  CheckSquare,
  Square,
  CheckCircle2,
  X,
  CreditCard,
} from 'lucide-react';
import {
  OrderItem,
  addToCart,
  addMultipleToCart,
  getCartFromStorage,
} from '@/lib/order';

interface BrandOption {
  brand: string;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  score: number;
  intro: string;
  problemSolved: string;
  benefits: string[];
  reason: string;
  tags: string[];
}

interface ProductSlot {
  slotTitle: string;
  stepNumber: number;
  role: string;
  options: BrandOption[];
}

// Body Care Product Slots with Multiple Brand Options
const bodycareSlots: ProductSlot[] = [
  {
    slotTitle: "Smoothing Body Treatment",
    stepNumber: 1,
    role: "Exfoliate & Smooth Bumps",
    options: [
      {
        brand: "Joyory Body",
        name: "10% AHA & BHA Smooth Body Lotion",
        price: 599,
        priceFormatted: "₹599",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        score: 99,
        intro: "A silky, non-greasy exfoliating body lotion powered by 10% Lactic Acid and Salicylic Acid.",
        problemSolved: "Keratosis Pilaris (strawberry legs), rough arm bumps & uneven skin texture.",
        benefits: ["72h Long Moisture", "Gentle Micro-Exfoliation", "Fragrance-Free & Non-Comedogenic"],
        reason: "Directly dissolves keratin plugs trapped inside hair follicles for smooth, touchable skin.",
        tags: ["Chemical Exfoliant", "AHA + BHA", "KP Care"],
      },
      {
        brand: "Minimalist Body",
        name: "10% Lactic Acid + Zemea Exfoliating Lotion",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        score: 95,
        intro: "Lightweight lotion infused with pure Lactic Acid for gentle surface skin cell renewal.",
        problemSolved: "Dry, flaky body skin & dull skin tone.",
        benefits: ["Soothes Rough Flakes", "Fast Absorption", "Vegan Formula"],
        reason: "Mild AHA exfoliation suitable for dry and dull skin textures.",
        tags: ["Budget Friendly", "Lactic Acid", "Lightweight"],
      },
      {
        brand: "Chemist at Play",
        name: "Exfoliating Body Lotion with 3 Ceramides",
        price: 549,
        priceFormatted: "₹549",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
        score: 94,
        intro: "Ceramide-enriched smoothing body cream designed to clear bumps while repairing the skin barrier.",
        problemSolved: "KP bumps & compromised skin barrier.",
        benefits: ["3 Essential Ceramides", "Barrier Repair", "Smooth Texture"],
        reason: "Combines gentle BHA with skin-identical lipids.",
        tags: ["Ceramide Boost", "BHA", "Barrier Care"],
      },
      {
        brand: "The Ordinary",
        name: "Glycolic Acid 7% Exfoliating Body Solution",
        price: 790,
        priceFormatted: "₹790",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        score: 92,
        intro: "High-strength liquid glycolic toner for body radiance and smoothing stubborn rough spots.",
        problemSolved: "Dark elbows, knees, sun tan & severe roughness.",
        benefits: ["Potent AHA Strength", "Multi-area use", "Clarifying Liquid"],
        reason: "Powerful surface exfoliator for stubborn hyper-pigmentation.",
        tags: ["High Strength", "Glycolic Acid", "Multi-use"],
      },
    ],
  },
  {
    slotTitle: "Deep Barrier Body Moisturizer",
    stepNumber: 2,
    role: "Hydrate & Lock Moisture",
    options: [
      {
        brand: "Joyory Body",
        name: "5 Ceramide Deep Moisture Body Butter",
        price: 649,
        priceFormatted: "₹649",
        image: "https://images.unsplash.com/photo-1512290900673-42e7d7164b38?auto=format&fit=crop&w=600&q=80",
        score: 98,
        intro: "Luxurious, rich body cream packed with 5 plant ceramides and shea butter.",
        problemSolved: "Extreme body dryness, tightness after shower & flaking.",
        benefits: ["72-Hour Moisture Lock", "Restores Skin Barrier", "Zero Greasiness"],
        reason: "Rebuilds intercellular lipid layers for velvety, touchable softness.",
        tags: ["5 Ceramides", "Shea Butter", "Intense Moisture"],
      },
      {
        brand: "Minimalist Body",
        name: "5% Marula Oil & Cocoa Intensive Cream",
        price: 599,
        priceFormatted: "₹599",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        score: 94,
        intro: "Deeply nourishing butter infused with pure Marula Oil to soften rough elbows and knees.",
        problemSolved: "Parched skin, winter dryness & flaky knees/elbows.",
        benefits: ["Rich Antioxidants", "Cocoa Butter Relief", "Deep Softening"],
        reason: "Rich plant lipids soothe barrier tightness.",
        tags: ["Marula Oil", "Cocoa Butter", "Deep Relief"],
      },
      {
        brand: "Dot & Key",
        name: "Cica & Niacinamide Soothing Body Moisturizer",
        price: 495,
        priceFormatted: "₹495",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
        score: 91,
        intro: "Cooling cream-gel moisturizer designed to calm irritated and sensitive body skin.",
        problemSolved: "Sensitive skin redness, razor irritation & dryness.",
        benefits: ["Cooling Gel Feeling", "Brightens Tone", "Calms Red Bumps"],
        reason: "Cica extracts soothe inflammation rapidly.",
        tags: ["Cica Soothing", "Niacinamide", "Sensitive Safe"],
      },
    ],
  },
  {
    slotTitle: "Clarifying Body Wash",
    stepNumber: 3,
    role: "Cleanse & Prevent Breakouts",
    options: [
      {
        brand: "Joyory Body",
        name: "Salicylic & Tea Tree Clarifying Body Wash",
        price: 449,
        priceFormatted: "₹449",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
        score: 97,
        intro: "Refreshingly gentle foaming wash formulated with Salicylic Acid and Australian Tea Tree.",
        problemSolved: "Backne (back acne), chest breakouts & clogged body pores.",
        benefits: ["2% BHA Deep Clean", "Sulfate-Free Foaming", "Antimicrobial Tea Tree"],
        reason: "Purifies pore-clogging sweat and sebum without stripping body skin moisture.",
        tags: ["Sulfate-Free", "2% BHA", "Anti-Backne"],
      },
      {
        brand: "Minimalist Body",
        name: "2% Salicylic Acid Body Cleanser",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        score: 94,
        intro: "Fragrance-free active body wash designed for breakout-prone skin.",
        problemSolved: "Excessive body sebum & shoulder pimples.",
        benefits: ["Fragrance-Free", "pH 5.5 Balanced", "Gentle Surfactants"],
        reason: "Directly clears sebum traps in sweat glands.",
        tags: ["Fragrance-Free", "Salicylic Acid"],
      },
      {
        brand: "Chemist at Play",
        name: "Acne Control Body Wash with Azelaic Acid",
        price: 399,
        priceFormatted: "₹399",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
        score: 92,
        intro: "Clarifying shower gel targeting dark acne marks and active body blemishes.",
        problemSolved: "Inflamed body pimples & dark post-acne spots.",
        benefits: ["Azelaic Spot Fading", "Affordable", "Gentle Suds"],
        reason: "Dual action clearing and mark reduction.",
        tags: ["Azelaic Acid", "Budget Pick"],
      },
    ],
  },
];

// Skincare Product Slots with Multiple Brand Options
const skincareSlots: ProductSlot[] = [
  {
    slotTitle: "Target Treatment Serum",
    stepNumber: 1,
    role: "Target Active Concerns",
    options: [
      {
        brand: "Minimalist",
        name: "2% Salicylic Acid + LHA Anti-Acne Serum",
        price: 549,
        priceFormatted: "₹549",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        score: 100,
        intro: "High-purity BHA serum engineered to penetrate deep pore oil and dissolve blackheads.",
        problemSolved: "Active acne, whiteheads, blackheads & clogged pores.",
        benefits: ["Pure Salicylic BHA", "Oil-Free Hydration", "Dermatologically Tested"],
        reason: "Exfoliates deep inside hair follicle linings to eliminate acne at the source.",
        tags: ["Fragrance-Free", "Acne Control", "Best Seller"],
      },
      {
        brand: "Joyory",
        name: "10% Niacinamide & Zinc Clarifying Serum",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
        score: 98,
        intro: "Ultra-soothing niacinamide serum that fades dark spots while regulating sebum.",
        problemSolved: "Acne scars, dark spots, redness & enlarged pores.",
        benefits: ["Fades Post-Acne Marks", "10% Niacinamide", "Zinc PCA Sebum Control"],
        reason: "Strengthens skin barrier while lightening hyper-pigmentation.",
        tags: ["Spot Fading", "Niacinamide", "Sebum Control"],
      },
      {
        brand: "The Ordinary",
        name: "Niacinamide 10% + Zinc 1%",
        price: 600,
        priceFormatted: "₹600",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        score: 93,
        intro: "High-strength vitamin and mineral blemish formula.",
        problemSolved: "Congested pores & uneven texture.",
        benefits: ["Pore Tightening", "Oil Reduction", "Global Cult Favorite"],
        reason: "Regulates excess oil production effectively.",
        tags: ["Global Favorite", "Zinc"],
      },
    ],
  },
  {
    slotTitle: "Daily Facial Cleanser",
    stepNumber: 2,
    role: "Cleanse Without Stripping",
    options: [
      {
        brand: "Joyory",
        name: "Clarifying Salicylic Gel Cleanser",
        price: 449,
        priceFormatted: "₹449",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
        score: 99,
        intro: "pH-balanced, sulphate-free foaming cleanser that melts away grime and excess oil.",
        problemSolved: "Daily sebum buildup, grime & dull facial skin.",
        benefits: ["Sulphate-Free", "Gentle Foam", "Tea Tree Extract"],
        reason: "Leaves skin soft and thoroughly clean without feeling tight or stripped.",
        tags: ["pH Balanced", "Gentle Wash"],
      },
      {
        brand: "Minimalist",
        name: "2% Salicylic Acid Face Cleanser",
        price: 399,
        priceFormatted: "₹399",
        image: "https://images.unsplash.com/photo-1512290900673-42e7d7164b38?auto=format&fit=crop&w=600&q=80",
        score: 94,
        intro: "Daily exfoliating cleanser formulated with Capryloyl Salicylic Acid.",
        problemSolved: "T-zone shine & surface pore oil.",
        benefits: ["LHA Gentle Clean", "No Fragrance", "Non-drying"],
        reason: "Mild surface BHA wash suitable for everyday oily skin.",
        tags: ["Budget Pick", "Minimalist"],
      },
    ],
  },
  {
    slotTitle: "Sunscreen Shield",
    stepNumber: 3,
    role: "UV Shield & Hydration",
    options: [
      {
        brand: "Joyory",
        name: "Matte Finish Ultra-Light Sunscreen Gel SPF 50",
        price: 549,
        priceFormatted: "₹549",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        score: 100,
        intro: "Velvety dry-touch sunscreen gel providing broad spectrum PA++++ protection.",
        problemSolved: "Sun tanning, dark spots & daytime greasy shine.",
        benefits: ["Zero White Cast", "Matte Touch Finish", "Sweat & Water Resistant"],
        reason: "Protects against UVA/UVB rays without clogging pores or leaving a sticky feel.",
        tags: ["SPF 50 PA++++", "Zero Cast"],
      },
      {
        brand: "Minimalist",
        name: "SPF 50 PA++++ Multi-Vitamin Sunscreen",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        score: 93,
        intro: "Nourishing sunscreen lotion packed with Vitamin B3, F, and E.",
        problemSolved: "UV damage & skin dehydration.",
        benefits: ["Multi-Vitamin Shield", "Broad Spectrum", "Light Texture"],
        reason: "Provides hybrid filters for complete solar protection.",
        tags: ["Multi-Vitamin", "SPF 50"],
      },
    ],
  },
];

// Haircare Product Slots with Multiple Brand Options
const haircareSlots: ProductSlot[] = [
  {
    slotTitle: "Scalp & Root Treatment",
    stepNumber: 1,
    role: "Density & Root Strength",
    options: [
      {
        brand: "Joyory Hair",
        name: "Peptide & Rosemary Scalp Strengthening Serum",
        price: 699,
        priceFormatted: "₹699",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        score: 98,
        intro: "Concentrated leave-in scalp elixir infused with Copper Tripeptide and Rosemary Oil.",
        problemSolved: "Excess hair fall, weak hair roots & thinning hair.",
        benefits: ["Stimulates Micro-Circulation", "Silicone-Free", "Non-Greasy Root Feel"],
        reason: "Nourishes dormant follicles to extend the hair growth (anagen) phase.",
        tags: ["Rosemary Extract", "Copper Peptides", "Scalp Care"],
      },
      {
        brand: "Minimalist Hair",
        name: "18% Hair Growth Actives Serum",
        price: 799,
        priceFormatted: "₹799",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
        score: 95,
        intro: "Potent blend of Capixyl, Redensyl, Procapil, and Anagain for hair density.",
        problemSolved: "Advanced hair thinning & scalp visibility.",
        benefits: ["5 Proven Actives", "High Strength", "Water-based"],
        reason: "Multi-target action to revive hair strand count.",
        tags: ["Redensyl", "Capixyl", "High Tech"],
      },
    ],
  },
  {
    slotTitle: "Deep Conditioning Hair Mask",
    stepNumber: 2,
    role: "Repair & Smooth Frizz",
    options: [
      {
        brand: "Joyory Hair",
        name: "Nourishing Keratin Hydrating Hair Mask",
        price: 599,
        priceFormatted: "₹599",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
        score: 95,
        intro: "Rich butter mask that seals cracked hair cuticles and restores glossy silkiness.",
        problemSolved: "Frizz, split ends, heat damage & dry brittle hair.",
        benefits: ["Keratin Protein Bond Repair", "Argan & Macadamia Oils", "Silky Detangling"],
        reason: "Fills structural micro-gaps in heat-damaged hair shafts.",
        tags: ["Keratin Repair", "Argan Oil"],
      },
      {
        brand: "Minimalist Hair",
        name: "Maleic Bond Repair Complex 05% Mask",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
        score: 93,
        intro: "Patent-pending bond repair treatment that fixes broken disulfide hair bonds.",
        problemSolved: "Chemically bleached & severely damaged hair.",
        benefits: ["Rebuilds Disulfide Bonds", "Protects Shaft", "Dermat Tested"],
        reason: "Fixes internal strand architecture damaged by color or perms.",
        tags: ["Bond Repair", "Maleic Acid"],
      },
    ],
  },
  {
    slotTitle: "Clarifying Shampoo",
    stepNumber: 3,
    role: "Purify Scalp & Buildup",
    options: [
      {
        brand: "Joyory Hair",
        name: "Gentle Sulphate-Free Clarifying Shampoo",
        price: 499,
        priceFormatted: "₹499",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
        score: 96,
        intro: "Color-safe clarifying shampoo that removes hard water minerals and excess sebum.",
        problemSolved: "Scalp buildup, itchiness & greasy limp roots.",
        benefits: ["Sulphate-Free", "Color-Safe", "Scalp Soothing"],
        reason: "Cleanses without stripping natural oils or dulling hair color.",
        tags: ["Sulphate-Free", "Scalp Detox"],
      },
    ],
  },
];

export default function ResultsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<{
    category: string;
    skinOrHairType: string;
    primaryConcern: string | string[];
    photoScan?: {
      uploaded: boolean;
      detectedInsights?: string[];
    };
    prescriptionScan?: {
      uploaded: boolean;
      fileName?: string;
      prescribedActives?: string[];
    };
  }>({
    category: 'skincare',
    skinOrHairType: '',
    primaryConcern: [],
  });

  // Track selected brand index for each slot
  const [selectedBrands, setSelectedBrands] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
  });

  // Track which product slots are included in the custom bundle (0 = Step 1, 1 = Step 2, 2 = Step 3)
  const [selectedSlotIndices, setSelectedSlotIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    itemCount: number;
    totalPrice: number;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('joyoryQuiz');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile({
          category: parsed.category || 'skincare',
          skinOrHairType: parsed.skinOrHairType || '',
          primaryConcern: parsed.primaryConcern || [],
          photoScan: parsed.photoScan,
          prescriptionScan: parsed.prescriptionScan,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getSlots = (): ProductSlot[] => {
    switch (profile.category) {
      case 'haircare':
        return haircareSlots;
      case 'bodycare':
        return bodycareSlots;
      default:
        return skincareSlots;
    }
  };

  const slots = getSlots();
  const categoryLabel =
    profile.category === 'haircare'
      ? 'Haircare'
      : profile.category === 'bodycare'
      ? 'Body Care'
      : 'Skincare';

  const concernsList = Array.isArray(profile.primaryConcern)
    ? profile.primaryConcern
    : profile.primaryConcern
    ? [profile.primaryConcern]
    : [];

  const photoScanVerified = profile.photoScan?.uploaded;
  const prescriptionVerified = profile.prescriptionScan?.uploaded;
  const prescribedActives = profile.prescriptionScan?.prescribedActives || [];

  // Helper function to check if a product option matches Rx prescribed actives
  const getRxMatches = (option: BrandOption): string[] => {
    if (!prescribedActives || prescribedActives.length === 0) return [];
    const textToSearch = `${option.name} ${option.intro} ${option.reason} ${option.tags.join(' ')} ${option.benefits.join(' ')}`.toLowerCase();

    return prescribedActives.filter((active) => {
      const actLower = active.toLowerCase();
      if (actLower.includes('salicylic') && textToSearch.includes('salicylic')) return true;
      if (actLower.includes('ceramide') && textToSearch.includes('ceramide')) return true;
      if (actLower.includes('lactic') && textToSearch.includes('lactic')) return true;
      if (actLower.includes('peptide') && textToSearch.includes('peptide')) return true;
      if (actLower.includes('niacinamide') && textToSearch.includes('niacinamide')) return true;
      if (actLower.includes('azelaic') && textToSearch.includes('azelaic')) return true;
      if (actLower.includes('glycolic') && textToSearch.includes('glycolic')) return true;
      return textToSearch.includes(actLower);
    });
  };

  const handleBrandSelect = (slotIdx: number, brandIdx: number) => {
    setSelectedBrands((prev) => ({
      ...prev,
      [slotIdx]: brandIdx,
    }));
  };

  const toggleSlotSelection = (slotIdx: number) => {
    setSelectedSlotIndices((prev) => {
      const currentSelectedCount = Object.values(prev).filter(Boolean).length;
      // Allow deselecting as long as at least 1 remains or toggle freely
      return {
        ...prev,
        [slotIdx]: !prev[slotIdx],
      };
    });
  };

  const handleSetPresetCount = (count: number) => {
    if (count === 1) {
      setSelectedSlotIndices({ 0: true, 1: false, 2: false });
    } else if (count === 2) {
      setSelectedSlotIndices({ 0: true, 1: true, 2: false });
    } else {
      setSelectedSlotIndices({ 0: true, 1: true, 2: true });
    }
  };

  // Convert currently selected slot options into OrderItem array
  const getSelectedItems = (): OrderItem[] => {
    return slots
      .map((slot, slotIdx) => {
        if (!selectedSlotIndices[slotIdx]) return null;
        const brandIdx = selectedBrands[slotIdx] || 0;
        const option = slot.options[brandIdx] || slot.options[0];
        return {
          id: `prod-${profile.category}-${slotIdx}-${brandIdx}`,
          name: option.name,
          brand: option.brand,
          price: option.price,
          quantity: 1,
          image: option.image,
          role: slot.role,
        };
      })
      .filter(Boolean) as OrderItem[];
  };

  const selectedItems = getSelectedItems();
  const selectedCount = selectedItems.length;
  const selectedTotalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  // Helper for single product add
  const handleAddSingleProduct = (slotIdx: number) => {
    const slot = slots[slotIdx];
    const brandIdx = selectedBrands[slotIdx] || 0;
    const option = slot.options[brandIdx] || slot.options[0];

    const orderItem: OrderItem = {
      id: `prod-${profile.category}-${slotIdx}-${brandIdx}`,
      name: option.name,
      brand: option.brand,
      price: option.price,
      quantity: 1,
      image: option.image,
      role: slot.role,
    };

    addToCart(orderItem);

    setToastMessage({
      title: `Added 1 Product: ${option.brand} ${option.name}`,
      description: `Successfully added to cart for ₹${option.price.toLocaleString('en-IN')}`,
      itemCount: 1,
      totalPrice: option.price,
    });
  };

  // Buy single product directly (1-click checkout)
  const handleBuySingleProduct = (slotIdx: number) => {
    const slot = slots[slotIdx];
    const brandIdx = selectedBrands[slotIdx] || 0;
    const option = slot.options[brandIdx] || slot.options[0];

    const orderItem: OrderItem = {
      id: `prod-${profile.category}-${slotIdx}-${brandIdx}`,
      name: option.name,
      brand: option.brand,
      price: option.price,
      quantity: 1,
      image: option.image,
      role: slot.role,
    };

    // Replace cart with this single product and go to checkout
    addToCart(orderItem, true);
    router.push('/checkout');
  };

  // Add all selected products (1, 2, or 3) to cart
  const handleAddSelectedToCart = (replaceAll = false) => {
    const itemsToAdd = getSelectedItems();
    if (itemsToAdd.length === 0) return;

    addMultipleToCart(itemsToAdd, replaceAll);

    setToastMessage({
      title: `Added ${itemsToAdd.length} ${itemsToAdd.length === 1 ? 'Product' : 'Products'} to Cart!`,
      description: `Your custom selection (Total: ₹${selectedTotalPrice.toLocaleString('en-IN')}) is ready in your cart.`,
      itemCount: itemsToAdd.length,
      totalPrice: selectedTotalPrice,
    });
  };

  // Buy all selected products directly
  const handleBuySelectedDirectly = () => {
    const itemsToAdd = getSelectedItems();
    if (itemsToAdd.length === 0) return;

    addMultipleToCart(itemsToAdd, true);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white p-4 rounded-2xl shadow-soft-lg border border-stone-700 animate-slide-up flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-joyory-rose text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-rose-200">{toastMessage.title}</div>
                <div className="text-[11px] text-stone-300">{toastMessage.description}</div>
              </div>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-stone-800">
            <Link href="/cart" className="flex-1">
              <Button size="sm" className="w-full bg-joyory-rose hover:bg-[#d64d64] text-xs py-1.5 font-semibold">
                View Cart ({toastMessage.itemCount})
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button size="sm" variant="outline" className="w-full text-xs py-1.5 border-stone-700 text-white hover:bg-stone-800">
                <CreditCard className="w-3.5 h-3.5 mr-1 text-joyory-rose" />
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Top Friendly Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-100/80 via-white to-pink-50 border border-rose-200/70 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="rose" className="px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-joyory-rose" />
              Your Custom Beauty Match
            </Badge>

            {photoScanVerified && (
              <Badge variant="emerald" className="px-3 py-1 text-xs font-semibold">
                📸 AI Visual Scan Verified (+15% Match Precision)
              </Badge>
            )}

            {prescriptionVerified && (
              <Badge variant="indigo" className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white shadow-xs">
                📋 Rx Verified: Shortlisted by Prescribed Actives
              </Badge>
            )}

            <span className="text-xs text-stone-600 font-medium">
              Category: <strong className="text-stone-900">{categoryLabel}</strong>
              {concernsList.length > 0 && ` · ${concernsList.length} Targeted Concern${concernsList.length > 1 ? 's' : ''}`}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            We Found Your Perfect {categoryLabel} Match!
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {prescriptionVerified
              ? `Hey friend! We extracted prescribed active compounds (${prescribedActives.join(', ')}) from your uploaded prescription (${profile.prescriptionScan?.fileName || 'PDF/Rx'}). You can choose 1 product, 2 products, or the complete routine below!`
              : photoScanVerified
              ? "Hey friend! Your optional AI photo scan confirmed key texture & hydration traits! Choose 1 product, 2 products, or customize your multi-brand routine."
              : "Hey friend! We analyzed your goals and crafted your personalized recommendations. You can choose only 1 product, pick 2 products, or select all 3!"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a href="https://joyory.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="bg-white hover:bg-stone-50 border-rose-200 text-joyory-rose font-semibold">
              <Compass className="w-3.5 h-3.5 mr-1.5 text-joyory-rose" />
              Browse All Products on Joyory
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </a>
          <Link href="/quiz">
            <Button variant="outline" size="sm" className="bg-white hover:bg-stone-50">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              Retake Quiz
            </Button>
          </Link>
          <Link href="/routine">
            <Button size="sm" className="shadow-sm">
              Routine Builder
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Recommendations Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Choose 1, 2, or 3 Recommended Products
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Select your preferred brand for each step, and choose whether to buy 1 item, 2 items, or the full routine.
            </p>
          </div>

          {/* Quick Selection Selector Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-stone-500 uppercase px-2 hidden md:inline">
              Quick Pick:
            </span>
            <button
              type="button"
              onClick={() => handleSetPresetCount(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCount === 1 && selectedSlotIndices[0]
                  ? 'bg-joyory-rose text-white shadow-xs'
                  : 'text-stone-700 hover:bg-white/80'
              }`}
            >
              Choose 1 Product
            </button>
            <button
              type="button"
              onClick={() => handleSetPresetCount(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCount === 2
                  ? 'bg-joyory-rose text-white shadow-xs'
                  : 'text-stone-700 hover:bg-white/80'
              }`}
            >
              Choose 2 Products
            </button>
            <button
              type="button"
              onClick={() => handleSetPresetCount(3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCount === 3
                  ? 'bg-joyory-rose text-white shadow-xs'
                  : 'text-stone-700 hover:bg-white/80'
              }`}
            >
              All 3 Products
            </button>
          </div>
        </div>

        {/* Grid of Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {slots.map((slot, slotIdx) => {
            const activeBrandIdx = selectedBrands[slotIdx] || 0;
            const currentOption = slot.options[activeBrandIdx] || slot.options[0];
            const currentRxMatches = getRxMatches(currentOption);
            const isSlotSelected = !!selectedSlotIndices[slotIdx];

            return (
              <Card
                key={slotIdx}
                variant="interactive"
                className={`flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
                  isSlotSelected
                    ? currentRxMatches.length > 0
                      ? 'border-indigo-400 ring-2 ring-indigo-500/30 shadow-md bg-white'
                      : 'border-rose-300 ring-2 ring-joyory-rose/30 shadow-md bg-white'
                    : 'border-stone-200/80 opacity-80 hover:opacity-100 bg-stone-50/40'
                }`}
              >
                <div>
                  {/* Step Header with Selection Toggle */}
                  <div className="p-3 bg-stone-900 text-white flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSlotSelection(slotIdx)}
                        className="flex items-center gap-1.5 text-white hover:text-rose-200 transition-colors focus:outline-none"
                        title={isSlotSelected ? 'Click to uncheck' : 'Click to select'}
                      >
                        {isSlotSelected ? (
                          <CheckSquare className="w-4 h-4 text-joyory-rose fill-joyory-rose/30" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400" />
                        )}
                        <span className="w-5 h-5 rounded-full bg-joyory-rose text-white text-[11px] font-bold flex items-center justify-center">
                          {slot.stepNumber}
                        </span>
                        <span>{slot.slotTitle}</span>
                      </button>
                    </div>

                    <span className="text-rose-200 text-[11px] font-medium">
                      {slot.role}
                    </span>
                  </div>

                  {/* Selection Status Banner on Card */}
                  <div
                    onClick={() => toggleSlotSelection(slotIdx)}
                    className={`px-3 py-1.5 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      isSlotSelected
                        ? 'bg-rose-50 text-rose-800 border-b border-rose-100'
                        : 'bg-stone-100 text-stone-500 border-b border-stone-200 hover:bg-stone-200/60'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isSlotSelected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-joyory-rose" />
                          <span>Included in Selected Bundle</span>
                        </>
                      ) : (
                        <span>Click to Include Step {slot.stepNumber}</span>
                      )}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {isSlotSelected ? 'Active' : 'Optional'}
                    </span>
                  </div>

                  {/* Image Header with Match Score */}
                  <div className="relative h-56 rounded-b-xl overflow-hidden bg-stone-100">
                    <img
                      src={currentOption.image}
                      alt={currentOption.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <Badge variant="emerald" className="shadow-md font-bold text-xs px-2.5 py-1">
                        ⭐ {currentOption.score}% Match
                      </Badge>

                      {currentRxMatches.length > 0 && (
                        <Badge variant="indigo" className="bg-indigo-600 text-white shadow-md font-extrabold text-[11px] px-2 py-0.5">
                          📋 Rx Match: {currentRxMatches[0]}
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge variant="default" className="bg-white/95 text-stone-900 font-extrabold shadow-md text-xs">
                        {currentOption.priceFormatted}
                      </Badge>
                    </div>
                  </div>

                  {/* Brand Switcher Bar */}
                  <div className="p-3 bg-stone-50 border-y border-stone-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-joyory-rose" />
                        Brand Options & Prices:
                      </span>
                      {prescriptionVerified && (
                        <span className="text-indigo-700 font-bold text-[10px]">
                          💊 Rx Shortlisted
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {slot.options.map((opt, bIdx) => {
                        const isSelected = activeBrandIdx === bIdx;
                        const optRxMatches = getRxMatches(opt);

                        return (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => handleBrandSelect(slotIdx, bIdx)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                              isSelected
                                ? optRxMatches.length > 0
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                  : 'bg-joyory-rose text-white border-joyory-rose shadow-xs'
                                : optRxMatches.length > 0
                                ? 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-joyory-rose hover:bg-rose-50/50'
                            }`}
                          >
                            <span>{opt.brand} ({opt.priceFormatted})</span>
                            {optRxMatches.length > 0 && <span className="text-[10px]">📋</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Title & Intro */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-0.5">
                        {currentOption.brand}
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 leading-snug">
                        {currentOption.name}
                      </h3>

                      <p className="text-xs text-stone-600 mt-2 leading-relaxed font-normal">
                        {currentOption.intro}
                      </p>
                    </div>

                    {/* Problem Solved Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200/80 space-y-1">
                      <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-joyory-rose fill-joyory-rose" />
                        Exact Problem It Solves:
                      </div>

                      <p className="text-xs text-rose-800 leading-relaxed font-medium">
                        {currentOption.problemSolved}
                      </p>
                    </div>

                    {/* Key Benefits List */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Key Benefits:
                      </div>

                      <ul className="space-y-1 text-xs text-stone-600">
                        {currentOption.benefits.map((b, bI) => (
                          <li key={bI} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {currentOption.tags.map((t, tI) => (
                        <Badge key={tI} variant="default" className="text-[10px] bg-stone-100 text-stone-700">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions: Choose 1 product or buy now */}
                <div className="p-5 pt-0 space-y-2.5">
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="text-xs text-stone-500 font-medium">Single Price (INR)</span>
                    <span className="text-xl font-extrabold text-stone-900">
                      {currentOption.priceFormatted}
                    </span>
                  </div>

                  {/* Individual Product Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddSingleProduct(slotIdx)}
                      className="w-full text-xs border-stone-300 hover:border-joyory-rose hover:bg-rose-50/50"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1 text-joyory-rose" />
                      Add This 1 Only
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleBuySingleProduct(slotIdx)}
                      className="w-full text-xs shadow-2xs font-semibold"
                    >
                      Buy 1 Now
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <a
                      href="https://joyory.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-600 font-medium"
                    >
                      <span>Explore this on Joyory.com</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dynamic Selection Summary & Bundle Action Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-stone-900 shadow-soft-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="rose">Custom Product Bundle</Badge>
              <span className="text-xs font-bold text-stone-700">
                {selectedCount} of 3 Products Selected
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {selectedCount === 1
                ? 'Your 1-Product Targeted Treatment'
                : selectedCount === 2
                ? 'Your 2-Product Synergistic Routine'
                : selectedCount === 3
                ? 'Your Complete 3-Step Routine Bundle'
                : 'No Products Selected'}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600">
              {selectedCount === 0
                ? 'Please click on at least 1 product above to add to your bundle.'
                : selectedCount === 1
                ? 'Great targeted choice! You can always add the matching cleanser or sunscreen later.'
                : selectedCount === 2
                ? 'Perfect 2-step daily pairing that complements your primary skin goal.'
                : 'Complete AM/PM synergistic protection for maximum dermatological results.'}
            </p>
          </div>

          <div className="text-left md:text-right bg-stone-50 md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-0 border-stone-200 shrink-0">
            <span className="text-xs text-stone-500 font-medium block">
              Total for {selectedCount} Selected {selectedCount === 1 ? 'Product' : 'Products'}
            </span>
            <span className="text-3xl font-serif font-extrabold text-stone-900">
              ₹{selectedTotalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
              + Free PAN India Shipping
            </span>
          </div>
        </div>

        {/* Selected Items Mini Badges */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-1">
              Included Items:
            </span>
            {selectedItems.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-joyory-900 border border-rose-200 text-xs font-semibold"
              >
                <Check className="w-3 h-3 text-joyory-rose" />
                <span>{item.brand} {item.name} (₹{item.price})</span>
              </span>
            ))}
          </div>
        )}

        {/* Bundle Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Authentic Products · 7-day Easy Return Policy</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={selectedCount === 0}
              onClick={() => handleAddSelectedToCart(false)}
              className="w-full sm:w-auto border-stone-300 hover:border-joyory-rose font-bold text-sm px-6"
            >
              <ShoppingBag className="w-4 h-4 mr-2 text-joyory-rose" />
              Add Selected ({selectedCount} {selectedCount === 1 ? 'Product' : 'Products'}) to Cart
            </Button>

            <Button
              type="button"
              size="lg"
              disabled={selectedCount === 0}
              onClick={handleBuySelectedDirectly}
              className="w-full sm:w-auto shadow-soft hover:shadow-glow font-bold text-sm px-8 py-3.5"
            >
              Proceed to Checkout · ₹{selectedTotalPrice.toLocaleString('en-IN')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Customer's Friend Step-by-Step Routine Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <Badge variant="rose" className="px-3 py-1 text-xs uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 mr-1 inline fill-joyory-rose" />
              Customer's Friend Routine Guide
            </Badge>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              How & When To Apply Your Regimen
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              We're here as your beauty friends! Here is the exact step-by-step layering order for best results.
            </p>
          </div>
        </div>

        {/* Step-by-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Morning & Evening
              </span>
            </div>

            <h4 className="font-bold text-stone-900 text-base">
              Step 1: Gentle Cleansing & Prep
            </h4>

            <p className="text-xs text-stone-600 leading-relaxed">
              Lather a coin-sized amount with lukewarm water for 60 seconds. Pat dry with a clean towel.
            </p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-800">
                <span>💡 Friend's Tip:</span>
              </div>
              <p>Never scrub hard! Let the active BHA foaming bubbles dissolve the oil for you.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Targeting Phase
              </span>
            </div>

            <h4 className="font-bold text-stone-900 text-base">
              Step 2: Active Treatment Exfoliation
            </h4>

            <p className="text-xs text-stone-600 leading-relaxed">
              Apply 3-4 drops or a thin layer directly to clean dry skin. Allow 2 minutes to absorb deeply into pores.
            </p>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-rose-800">
                <span>💡 Friend's Tip:</span>
              </div>
              <p>Use consistently 3-4 times a week. Noticeably smooth skin appears within 14 days!</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-joyory-rose text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Seal & Shield
              </span>
            </div>

            <h4 className="font-bold text-stone-900 text-base">
              Step 3: Moisture Barrier Lock
            </h4>

            <p className="text-xs text-stone-600 leading-relaxed">
              Massage rich cream over treated areas to lock in active ingredients and repair lipid barrier.
            </p>

            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-indigo-800">
                <span>💡 Friend's Tip:</span>
              </div>
              <p>If stepping out during daytime, always finish with SPF 50 sun protection!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
