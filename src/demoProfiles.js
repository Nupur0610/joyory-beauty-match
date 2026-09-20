/**
 * Joyory Beauty Match - Demo Profiles
 * Three canonical profiles for testing and demonstration.
 */

export const demoProfiles = [
  {
    id: "profile-1",
    title: "PROFILE 1: Oily Skin & Acne Control",
    description: "Young adult dealing with excess oiliness, clogged pores, and active acne breakouts looking for a simple, budget-conscious daily skincare routine.",
    input: {
      skinOrHairType: "Oily",
      primaryConcern: "Acne",
      category: "Skincare",
      budget: 1500,
      preferences: ["fragrance-free", "vegan"],
      routineComplexity: "simple"
    }
  },
  {
    id: "profile-2",
    title: "PROFILE 2: Dry Skin & Deep Hydration",
    description: "Individual with dehydrated, dry, or barrier-compromised skin seeking high-performing moisture replenishment and soothing care.",
    input: {
      skinOrHairType: "Dry",
      primaryConcern: "Hydration",
      category: "Skincare",
      budget: 2500,
      preferences: ["cruelty-free", "fragrance-free"],
      routineComplexity: "moderate"
    }
  },
  {
    id: "profile-3",
    title: "PROFILE 3: Dry/Damaged Hair Repair",
    description: "User with heat-damaged, brittle, and frizzy hair looking for restorative bond-repair haircare products within ₹2,000.",
    input: {
      skinOrHairType: "Dry/damaged hair",
      primaryConcern: "Hair damage",
      category: "Haircare",
      budget: 2000,
      preferences: ["sulphate-free", "vegan"],
      routineComplexity: "simple"
    }
  }
];

export default demoProfiles;
