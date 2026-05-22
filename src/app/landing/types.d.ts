export interface PricingPlan {
  name: string;
  price: string;
  billing?: string;
  credits: string;
  features: string[];
  isPopular?: boolean;
}