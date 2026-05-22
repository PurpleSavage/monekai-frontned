import { Component } from "@angular/core";
import { LandingHeroComponent } from "../sections/hero/landing-hero.component";
import { LandingHeaderComponent } from "../sections/header/landing-header.component";
import { LandingFeaturesComponent } from "../sections/features/landing-features.component";
import { FeatureSplitComponent } from "../sections/feature-split/feature-split.component";

@Component({
    templateUrl:'./landing-layout.component.html',
    selector: 'app-landing-layout',
    standalone: true,
    imports: [
        LandingHeroComponent,
        LandingHeaderComponent,
        LandingFeaturesComponent,
        FeatureSplitComponent
    ]
})
export class LandingLayoutComponent{}