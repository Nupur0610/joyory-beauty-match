"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  CheckSquare,
  Camera,
  Upload,
  Scan,
  RefreshCw,
  Eye,
  CheckCircle2,
  ShieldCheck,
  FileText,
  FileCheck,
  FilePlus,
  FileCode,
} from "lucide-react";

type QuizData = {
  category: "skincare" | "haircare" | "bodycare" | "";
  skinOrHairType: string;
  primaryConcern: string[];
  photoScan?: {
    uploaded: boolean;
    imagePreviewUrl?: string | null;
    detectedInsights?: string[];
  };
  prescriptionScan?: {
    uploaded: boolean;
    fileName?: string;
    prescribedActives?: string[];
  };
  budget: number;
  routineComplexity: string;
};

interface OptionItem {
  label: string;
  value: string | number;
  subtitle?: string;
  image?: string;
  tag?: string;
}

interface QuestionConfig {
  key: keyof QuizData;
  title: string;
  description: string;
  options: OptionItem[];
}

const CATEGORY_OPTIONS: OptionItem[] = [
  {
    label: "Skincare",
    value: "skincare",
    subtitle: "Facial cleansers, treatment serums, moisturizers & SPF",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    tag: "Facial Care",
  },
  {
    label: "Haircare",
    value: "haircare",
    subtitle: "Shampoos, deep conditioners, hair masks & serums",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    tag: "Hair & Scalp",
  },
  {
    label: "Body Care",
    value: "bodycare",
    subtitle: "Nourishing body lotions, smoothing scrubs & body washes",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    tag: "Body & Self-care",
  },
];

const TYPE_OPTIONS: Record<string, { title: string; description: string; options: OptionItem[] }> = {
  skincare: {
    title: "What's your skin type?",
    description: "We'll recommend formulas matched to your skin's natural oil & moisture balance.",
    options: [
      { label: "Oily Skin", value: "oily", subtitle: "Excess shine, visible pores, prone to acne" },
      { label: "Dry Skin", value: "dry", subtitle: "Feels tight, flaky, lacks moisture" },
      { label: "Combination Skin", value: "combination", subtitle: "Oily T-zone with dry or normal cheeks" },
      { label: "Sensitive Skin", value: "sensitive", subtitle: "Prone to redness, itching, or reactions" },
      { label: "Normal Skin", value: "normal", subtitle: "Balanced moisture, low reactivity" },
    ],
  },
  haircare: {
    title: "What's your hair & scalp type?",
    description: "We'll select hair products formulated for your specific strand structure and scalp.",
    options: [
      { label: "Dry / Damaged Hair", value: "dry_hair", subtitle: "Brittle strands, split ends, lacks shine" },
      { label: "Oily Scalp & Hair", value: "oily_hair", subtitle: "Feels greasy quickly, needs frequent wash" },
      { label: "Fine / Thinning Hair", value: "fine_hair", subtitle: "Lacks natural body, prone to limp scalp" },
      { label: "Curly / Wavy Hair", value: "curly_hair", subtitle: "Needs moisture definition, prone to frizz" },
      { label: "Color-Treated Hair", value: "color_treated", subtitle: "Chemically treated, needs color protection" },
    ],
  },
  bodycare: {
    title: "What's your body skin type?",
    description: "Tell us about your body skin texture so we can tailor body treatments.",
    options: [
      { label: "Dry Body Skin", value: "dry_body", subtitle: "Rough patches, flaking, tight post-shower" },
      { label: "Sensitive Body Skin", value: "sensitive_body", subtitle: "Easily irritated by heavy synthetic fragrance" },
      { label: "Rough & Bumpy Skin", value: "bumpy_body", subtitle: "Keratosis Pilaris, chicken skin or uneven bumps" },
      { label: "Normal Body Skin", value: "normal_body", subtitle: "Smooth, comfortable everyday body skin" },
    ],
  },
};

const CONCERN_OPTIONS: Record<string, { title: string; description: string; options: OptionItem[] }> = {
  skincare: {
    title: "What are your main skin concerns?",
    description: "Select all that apply. We'll build a routine targeting your complete list of skin goals.",
    options: [
      { label: "Acne & Active Breakouts", value: "acne", subtitle: "Active pimples, clogged pores & acne marks" },
      { label: "Hydration & Barrier Repair", value: "hydration", subtitle: "Dehydrated skin, flaky texture & barrier strengthening" },
      { label: "Pigmentation & Dark Spots", value: "pigmentation", subtitle: "Sun spots, acne scars & hyper-pigmentation" },
      { label: "Anti-Aging & Fine Lines", value: "anti_aging", subtitle: "Loss of elasticity, fine lines & sagging skin" },
      { label: "Enlarged Pores & Excessive Oil", value: "pores", subtitle: "Visible pores, blackheads & T-zone shine" },
      { label: "Dullness & Lack of Glow", value: "dullness", subtitle: "Tired-looking skin needing brightening radiance" },
    ],
  },
  haircare: {
    title: "What are your main hair concerns?",
    description: "Select all that apply. We'll pick formulas that address all your hair needs.",
    options: [
      { label: "Hairfall & Strand Breakage", value: "hairfall", subtitle: "Weak hair roots, excess shedding & thinning" },
      { label: "Frizz & Unmanageability", value: "frizz", subtitle: "Humidity reaction, flyaways & unruly texture" },
      { label: "Dandruff & Scalp Flaking", value: "dandruff", subtitle: "Itchy, flaky scalp needing targeted relief" },
      { label: "Volume, Lift & Density", value: "volume", subtitle: "Flat hair needing density and root lift" },
      { label: "Damage & Split Ends", value: "damage", subtitle: "Heat or chemical damage requiring bond repair" },
      { label: "Scalp Oiliness & Buildup", value: "scalp_buildup", subtitle: "Greasy roots needing scalp detox wash" },
    ],
  },
  bodycare: {
    title: "What are your main body care concerns?",
    description: "Select all that apply. We'll recommend products that cover your full list of body goals.",
    options: [
      { label: "Deep Moisture & Dryness Relief", value: "body_hydration", subtitle: "72-hr long-lasting hydration for dry elbows, knees & flaky skin" },
      { label: "Strawberry Legs & KP (Keratosis Pilaris)", value: "keratosis", subtitle: "Smoothing rough chicken bumps, clogged follicles & uneven skin" },
      { label: "Body Acne & Backne Clarifying", value: "body_acne", subtitle: "Clearing back, chest & shoulder pimples and unclogging body pores" },
      { label: "Sun Tan & Dark Spot Lightening", value: "brightening", subtitle: "Fading tan lines, dark elbows, knees & evening out skin tone" },
      { label: "Stretch Marks & Scar Fading", value: "stretch_marks", subtitle: "Minimizing appearance of stretch marks & post-weight scars" },
      { label: "Firming, Elasticity & Cellulite", value: "firming", subtitle: "Tightening sagging skin & smoothing textured body contours" },
      { label: "Ingrown Hairs & Razor Bumps", value: "razor_bumps", subtitle: "Calming post-shave/wax redness, bumps & razor irritation" },
      { label: "Eczema & Sensitive Skin Soothing", value: "eczema", subtitle: "Relieving itching, redness & rebuilding delicate skin barrier" },
      { label: "Body Odor & Sweat Control", value: "body_odor", subtitle: "Long-lasting freshness, detoxifying underarms & clarifying wash" },
      { label: "Exfoliation & Dull Skin Renewal", value: "exfoliation", subtitle: "Buffing away dead skin cells for smooth, glowing body radiance" },
    ],
  },
};

const BUDGET_QUESTION: QuestionConfig = {
  key: "budget",
  title: "What's your budget preference?",
  description: "We'll prioritize products that fit within your target price point.",
  options: [
    { label: "₹1,000", value: 1000, subtitle: "Essential & Effective Routine" },
    { label: "₹1,500", value: 1500, subtitle: "Balanced Best-Seller Routine" },
    { label: "₹2,000", value: 2000, subtitle: "Advanced Active-Driven Routine" },
    { label: "₹2,500+", value: 2500, subtitle: "Luxe & High-Performance Routine" },
  ],
};

const ROUTINE_QUESTION: QuestionConfig = {
  key: "routineComplexity",
  title: "How simple should your routine be?",
  description: "Choose how many steps you prefer in your daily regimen.",
  options: [
    { label: "Simple Routine", value: "simple", subtitle: "2-3 steps: Quick, foolproof daily regimen" },
    { label: "Comprehensive Routine", value: "moderate", subtitle: "4-5 steps: Dedicated treatment & layering" },
  ],
};

export default function QuizPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizData>({
    category: "",
    skinOrHairType: "",
    primaryConcern: [],
    budget: 1500,
    routineComplexity: "simple",
  });

  // Mode for Step 3: "photo" or "prescription"
  const [assessmentTab, setAssessmentTab] = useState<"photo" | "prescription">("photo");

  // State for optional AI Photo Scan
  const [photoState, setPhotoState] = useState<{
    uploaded: boolean;
    imagePreviewUrl: string | null;
    scanning: boolean;
    scanComplete: boolean;
    detectedInsights: string[];
  }>({
    uploaded: false,
    imagePreviewUrl: null,
    scanning: false,
    scanComplete: false,
    detectedInsights: [],
  });

  // State for optional Dermatologist Prescription Scan
  const [prescriptionState, setPrescriptionState] = useState<{
    uploaded: boolean;
    fileName: string | null;
    scanning: boolean;
    scanComplete: boolean;
    prescribedActives: string[];
  }>({
    uploaded: false,
    fileName: null,
    scanning: false,
    scanComplete: false,
    prescribedActives: [],
  });

  const category = answers.category || "skincare";

  const getQuestionForStep = (currentStep: number): QuestionConfig => {
    switch (currentStep) {
      case 0:
        return {
          key: "category",
          title: "What are you shopping for?",
          description: "Select the area you would like to personalize today.",
          options: CATEGORY_OPTIONS,
        };
      case 1: {
        const config = TYPE_OPTIONS[category] || TYPE_OPTIONS.skincare;
        return {
          key: "skinOrHairType",
          title: config.title,
          description: config.description,
          options: config.options,
        };
      }
      case 2: {
        const config = CONCERN_OPTIONS[category] || CONCERN_OPTIONS.skincare;
        return {
          key: "primaryConcern",
          title: config.title,
          description: config.description,
          options: config.options,
        };
      }
      case 3:
        return {
          key: "photoScan" as any,
          title: "AI Photo & Dermatologist Prescription Scan (Optional)",
          description: "Upload a photo or your Dermatologist Prescription / PDF. Our AI engine will extract prescribed actives and shortlist matching products!",
          options: [],
        };
      case 4:
        return BUDGET_QUESTION;
      case 5:
        return ROUTINE_QUESTION;
      default:
        return BUDGET_QUESTION;
    }
  };

  const currentQuestion = getQuestionForStep(step);
  const currentValue = answers[currentQuestion.key as keyof QuizData];

  const selectOption = (value: string | number) => {
    if (currentQuestion.key === "category") {
      setAnswers((prev) => ({
        ...prev,
        category: value as QuizData["category"],
        skinOrHairType: "",
        primaryConcern: [],
      }));
    } else if (currentQuestion.key === "primaryConcern") {
      setAnswers((prev) => {
        const currentList = prev.primaryConcern || [];
        const strVal = String(value);
        const updated = currentList.includes(strVal)
          ? currentList.filter((item) => item !== strVal)
          : [...currentList, strVal];

        return {
          ...prev,
          primaryConcern: updated,
        };
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.key]: value,
      }));
    }
  };

  // Photo Scan Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      triggerScan(url);
    }
  };

  const handleSampleScan = () => {
    const sampleUrl =
      category === "haircare"
        ? "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
        : category === "bodycare"
          ? "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
          : "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80";
    triggerScan(sampleUrl);
  };

  const triggerScan = (imageUrl: string) => {
    setPhotoState({
      uploaded: true,
      imagePreviewUrl: imageUrl,
      scanning: true,
      scanComplete: false,
      detectedInsights: [],
    });

    setTimeout(() => {
      const insights =
        category === "haircare"
          ? ["Scalp Sebum: Mild oiliness at roots", "Strand Porosity: Medium", "Frizz Density: Moderate"]
          : category === "bodycare"
            ? ["Texture Analysis: Micro KP Bumps on arms", "Hydration Barrier: Dehydrated", "Melanin Evenness: Mild Sun Tan"]
            : ["Pore Visibility: Moderate T-Zone Pores", "Surface Redness: Calmed", "Moisture Level: 68% Balance"];

      setPhotoState({
        uploaded: true,
        imagePreviewUrl: imageUrl,
        scanning: false,
        scanComplete: true,
        detectedInsights: insights,
      });

      setAnswers((prev) => ({
        ...prev,
        photoScan: {
          uploaded: true,
          imagePreviewUrl: imageUrl,
          detectedInsights: insights,
        },
      }));
    }, 1800);
  };

  const removePhoto = () => {
    setPhotoState({
      uploaded: false,
      imagePreviewUrl: null,
      scanning: false,
      scanComplete: false,
      detectedInsights: [],
    });

    setAnswers((prev) => ({
      ...prev,
      photoScan: undefined,
    }));
  };

  // Prescription Scan Handlers
  const handlePrescriptionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      triggerPrescriptionScan(file.name);
    }
  };

  const handlePrescriptionDemo = () => {
    const demoFileName =
      category === "haircare"
        ? "Dermatologist_Rx_Hair_Growth.pdf"
        : category === "bodycare"
          ? "Dermatologist_Rx_Body_KP_Care.pdf"
          : "Dermatologist_Rx_Acne_Care.pdf";

    triggerPrescriptionScan(demoFileName);
  };

  const triggerPrescriptionScan = (fileName: string) => {
    setPrescriptionState({
      uploaded: true,
      fileName: fileName,
      scanning: true,
      scanComplete: false,
      prescribedActives: [],
    });

    setTimeout(() => {
      const actives =
        category === "haircare"
          ? ["Peptides 5%", "Rosemary Extract", "Ketoconazole 1%"]
          : category === "bodycare"
            ? ["Lactic Acid 10%", "Salicylic Acid 2%", "5 Ceramides"]
            : ["Salicylic Acid 2%", "Niacinamide 10%", "SPF 50 PA++++"];

      setPrescriptionState({
        uploaded: true,
        fileName: fileName,
        scanning: false,
        scanComplete: true,
        prescribedActives: actives,
      });

      setAnswers((prev) => ({
        ...prev,
        prescriptionScan: {
          uploaded: true,
          fileName: fileName,
          prescribedActives: actives,
        },
      }));
    }, 1800);
  };

  const removePrescription = () => {
    setPrescriptionState({
      uploaded: false,
      fileName: null,
      scanning: false,
      scanComplete: false,
      prescribedActives: [],
    });

    setAnswers((prev) => ({
      ...prev,
      prescriptionScan: undefined,
    }));
  };

  const canContinue = (() => {
    if (step === 3) return true; // Optional assessment step
    if (currentQuestion.key === "primaryConcern") {
      return Array.isArray(answers.primaryConcern) && answers.primaryConcern.length > 0;
    }
    return currentValue !== undefined && currentValue !== "" && currentValue !== null;
  })();

  const handleNext = () => {
    if (!canContinue) return;

    if (step < 5) {
      setStep((prev) => prev + 1);
      return;
    }

    sessionStorage.setItem("joyoryQuiz", JSON.stringify(answers));
    router.push("/results");
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Heading */}
      <div className="text-center space-y-3">
        <Badge variant="rose" className="px-3 py-1 text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 mr-1 inline" />
          Joyory Match Quiz
        </Badge>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Find Your Personalized Beauty Routine
        </h1>

        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
          Answer a few quick questions to unlock custom recommendations tailored exclusively to your profile.
        </p>
      </div>

      {/* Main Quiz Card */}
      <Card variant="glass" className="border-stone-200 shadow-soft overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
            <span>Question {step + 1} of 6</span>
            <span className="font-semibold text-joyory-rose">
              {Math.round(((step + 1) / 6) * 100)}% Completed
            </span>
          </div>

          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-400 to-joyory-rose h-full rounded-full transition-all duration-300"
              style={{
                width: `${((step + 1) / 6) * 100}%`,
              }}
            />
          </div>

          <CardTitle className="text-2xl sm:text-3xl pt-5 font-serif font-bold text-stone-900">
            {currentQuestion.title}
          </CardTitle>

          <CardDescription className="text-stone-600 text-sm sm:text-base">
            {currentQuestion.description}
          </CardDescription>

          {step === 2 && (
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="rose" className="text-[11px] font-semibold flex items-center gap-1">
                <CheckSquare className="w-3 h-3" />
                Multi-Select
              </Badge>
              <span className="text-xs text-stone-600 font-medium">
                {answers.primaryConcern.length === 0
                  ? "Select one or more concerns that apply to you"
                  : `${answers.primaryConcern.length} concern${answers.primaryConcern.length > 1 ? "s" : ""} selected`}
              </span>
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="emerald" className="text-[11px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                100% Optional & Private Assessment
              </Badge>
              <span className="text-xs text-stone-600 font-medium">
                You can upload a photo, prescription PDF, or click Skip to continue
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-2 pb-6">
          {/* Step 0: Category Image Cards */}
          {step === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentQuestion.options.map((option) => {
                const selected = currentValue === option.value;

                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => selectOption(option.value)}
                    className={`group relative text-left rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${selected
                        ? "border-joyory-rose bg-rose-50/70 ring-2 ring-joyory-rose/30 shadow-md scale-[1.02]"
                        : "border-stone-200 bg-white hover:border-rose-300 hover:shadow-soft hover:scale-[1.01]"
                      }`}
                  >
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      <img
                        src={option.image}
                        alt={option.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                      {option.tag && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {option.tag}
                          </span>
                        </div>
                      )}

                      <div
                        className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${selected
                            ? "bg-joyory-rose text-white shadow-md"
                            : "bg-white/80 text-transparent border border-stone-300 backdrop-blur-sm"
                          }`}
                      >
                        <Check className="w-4 h-4" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-xl font-bold text-white drop-shadow-sm font-serif">
                          {option.label}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {option.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                        <span className={selected ? "text-rose-700" : "text-stone-500 group-hover:text-stone-900"}>
                          {selected ? "Selected" : "Select Category"}
                        </span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selected ? "text-joyory-rose translate-x-1" : "text-stone-400 group-hover:translate-x-0.5"}`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : step === 3 ? (
            /* Step 3: Optional AI Photo & Prescription PDF Scan Component */
            <div className="space-y-6">
              {/* Assessment Mode Switcher Tabs */}
              <div className="flex border-b border-stone-200">
                <button
                  type="button"
                  onClick={() => setAssessmentTab("photo")}
                  className={`py-2.5 px-4 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${assessmentTab === "photo"
                      ? "border-joyory-rose text-joyory-rose bg-rose-50/50 rounded-t-xl"
                      : "border-transparent text-stone-600 hover:text-stone-900"
                    }`}
                >
                  <Camera className="w-4 h-4" />
                  Option A: Face / Scalp Photo Scan
                </button>

                <button
                  type="button"
                  onClick={() => setAssessmentTab("prescription")}
                  className={`py-2.5 px-4 font-bold text-xs border-b-2 transition-all flex items-center gap-2 ${assessmentTab === "prescription"
                      ? "border-joyory-rose text-joyory-rose bg-rose-50/50 rounded-t-xl"
                      : "border-transparent text-stone-600 hover:text-stone-900"
                    }`}
                >
                  <FileText className="w-4 h-4" />
                  Option B: Dermatologist Prescription / PDF Upload
                </button>
              </div>

              {/* TAB A: Photo Scan */}
              {assessmentTab === "photo" ? (
                <div>
                  {!photoState.uploaded ? (
                    <div className="p-8 border-2 border-dashed border-rose-200 rounded-3xl bg-rose-50/30 text-center space-y-5 hover:border-rose-400 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-rose-100 text-joyory-rose flex items-center justify-center mx-auto shadow-sm">
                        <Camera className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-stone-900">
                          Upload Face, Scalp, or Body Skin Photo
                        </h3>
                        <p className="text-xs text-stone-600 max-w-md mx-auto">
                          AI Visual Scan automatically detects texture, redness, and dehydration for a 15% boost in matching confidence.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <Button size="md" type="button" className="shadow-soft pointer-events-none">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Photo from Device
                          </Button>
                        </label>

                        <Button
                          variant="outline"
                          size="md"
                          onClick={handleSampleScan}
                          type="button"
                        >
                          <Scan className="w-4 h-4 mr-2 text-joyory-rose" />
                          Try Instant AI Photo Demo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* Photo Uploaded Window */
                    <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="relative h-64 rounded-2xl overflow-hidden bg-stone-950 shadow-md">
                          <img
                            src={photoState.imagePreviewUrl || ""}
                            alt="Scanned assessment"
                            className="w-full h-full object-cover opacity-90"
                          />

                          {photoState.scanning && (
                            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-pink-300 to-rose-500 shadow-glow animate-pulse top-1/2 -translate-y-1/2" />
                          )}

                          <div className="absolute top-3 left-3">
                            <Badge variant="rose" className="bg-stone-900/80 backdrop-blur-md text-white border-0 text-xs">
                              {photoState.scanning ? "AI Scanning Visual Features..." : "Scan Analysis Complete"}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {photoState.scanning ? (
                            <div className="space-y-3 py-6 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-2 text-rose-600 font-bold text-sm">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Analyzing Texture, Redness & Moisture...</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                <h4 className="font-serif text-xl font-bold text-stone-900">
                                  AI Scan Results
                                </h4>
                              </div>

                              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                  Detected Skin/Hair Characteristics:
                                </div>

                                <ul className="space-y-1 text-xs text-emerald-900">
                                  {photoState.detectedInsights.map((insight, idx) => (
                                    <li key={idx} className="flex items-center gap-1.5 font-medium">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                      {insight}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <Button variant="outline" size="sm" onClick={removePhoto} type="button" className="text-xs">
                                Remove Photo
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* TAB B: Prescription PDF / Image Scanner */
                <div>
                  {!prescriptionState.uploaded ? (
                    <div className="p-8 border-2 border-dashed border-indigo-200 rounded-3xl bg-indigo-50/30 text-center space-y-5 hover:border-indigo-400 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-sm">
                        <FileText className="w-8 h-8" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-stone-900">
                          Upload Dermatologist Prescription or PDF
                        </h3>
                        <p className="text-xs text-stone-600 max-w-md mx-auto">
                          Our AI Prescription Reader extracts prescribed active compounds (Salicylic Acid, Ceramides, Peptides) and auto-shortlists exact product matches!
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,image/*,.doc,.docx"
                            onChange={handlePrescriptionFileUpload}
                            className="hidden"
                          />
                          <Button size="md" type="button" className="shadow-soft pointer-events-none bg-indigo-600 hover:bg-indigo-700">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Prescription PDF / Image
                          </Button>
                        </label>

                        <Button
                          variant="outline"
                          size="md"
                          onClick={handlePrescriptionDemo}
                          type="button"
                          className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                        >
                          <FileCheck className="w-4 h-4 mr-2 text-indigo-600" />
                          Try Demo Rx Prescription Scan
                        </Button>
                      </div>

                      <div className="pt-2 text-[11px] text-stone-500">
                        📄 Supports PDF, PNG, JPG & DOC. Medical privacy protected.
                      </div>
                    </div>
                  ) : (
                    /* Prescription Uploaded Window */
                    <div className="p-6 rounded-3xl bg-white border border-indigo-200 shadow-soft space-y-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                            <FileText className="w-7 h-7" />
                          </div>

                          <div>
                            <Badge variant="indigo" className="text-[10px] uppercase font-bold mb-1">
                              {prescriptionState.scanning ? "Scanning Medical Rx Document..." : "Rx Document Verified"}
                            </Badge>

                            <h4 className="font-serif text-lg font-bold text-stone-900">
                              {prescriptionState.fileName}
                            </h4>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={removePrescription} type="button" className="text-xs">
                          Change Document
                        </Button>
                      </div>

                      {prescriptionState.scanning ? (
                        <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-center space-y-3">
                          <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold text-sm">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Extracting Prescribed Active Compounds...</span>
                          </div>
                          <p className="text-xs text-stone-500">
                            Matching medical ingredients with dermatological product inventory.
                          </p>
                        </div>
                      ) : (
                        <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3">
                          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            Extracted Prescribed Active Compounds:
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {prescriptionState.prescribedActives.map((act, idx) => (
                              <span key={idx} className="bg-white text-indigo-900 font-bold text-xs px-3 py-1.5 rounded-lg border border-indigo-300 shadow-xs">
                                💊 {act}
                              </span>
                            ))}
                          </div>

                          <div className="pt-2 text-xs text-indigo-800 font-medium">
                            ✅ <strong>Auto-Shortlist Enabled:</strong> Products matching your prescription have been prioritized on your results page!
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Steps 1, 2, 4, 5: Standard Option Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = step === 2
                  ? Array.isArray(answers.primaryConcern) && answers.primaryConcern.includes(String(option.value))
                  : currentValue === option.value;

                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => selectOption(option.value)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${isSelected
                        ? "border-joyory-rose bg-rose-50/80 ring-2 ring-joyory-rose/20 shadow-sm"
                        : "border-stone-200 bg-white hover:border-joyory-rose/60 hover:bg-rose-50/30"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="font-bold text-stone-900 text-base">
                        {option.label}
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${isSelected
                            ? "border-joyory-rose bg-joyory-rose text-white"
                            : "border-stone-300 text-transparent"
                          }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                    </div>

                    {option.subtitle && (
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {option.subtitle}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-stone-100 pt-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-stone-600 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canContinue}
            className="px-6 shadow-sm"
          >
            {step === 5
              ? "Find My Matches"
              : step === 3
                ? photoState.uploaded || prescriptionState.uploaded
                  ? "Continue to Budget"
                  : "Skip & Continue"
                : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}