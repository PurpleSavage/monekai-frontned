import { Component, signal } from "@angular/core";
import { PricingPlan } from "../../types";
import { CommonModule } from "@angular/common";



@Component({
    templateUrl:'./plans.component.html',
    standalone:true,
    selector:'app-plans',
    imports:[CommonModule]
})
export class PlansComponent{
    public plans = signal<PricingPlan[]>([
    {
      name: 'Free',
      price: '$0',
      credits: '50 Credits',
      features: ['Standard Generation', 'WAV Export'],
      isPopular: false
    },
    {
      name: 'Creator',
      price: '$12',
      billing: '/mo',
      credits: '1,000 Credits / month',
      features: ['Faster Generations', 'HD Audio Export'],
      isPopular: true // Resalta visualmente este plan
    },
    {
      name: 'Pro',
      price: '$29',
      billing: '/mo',
      credits: '5,000 Credits / month',
      features: ['Priority Queue', 'Best Quality Generation', 'Longer Audio Outputs'],
      isPopular: false
    }
  ])

  public selectPlan(planName: string): void {
    console.log(`Plan seleccionado: ${planName}`);
  }
}