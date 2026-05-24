import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
 import { NgxAuroraComponent } from '@omnedia/ngx-aurora';
@Component({
  templateUrl:'./landing-hero.component.html',
  selector:'app-landing-hero',
  standalone:true,
  imports: [
    NgxAuroraComponent,
    RouterLink
  ]
})
export class LandingHeroComponent{} 