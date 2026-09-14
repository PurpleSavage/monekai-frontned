import { Component, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LatestSamplesStateService } from "../../../state-manager/latest-samples-state.service";
import { SampleCardSharedComponent } from "../sample-card-shared/sample-card-shared.component";

@Component({
  selector: 'app-list-latest-shared-samples-version',
  templateUrl: './list-latest-shared-samples-version.component.html',
  standalone: true,
  imports: [SampleCardSharedComponent, RouterLink] 
})
export class ListLatestSharedSamplesVersionComponent {
  private latestSamplesStateService = inject(LatestSamplesStateService);
  listSharedSamples = this.latestSamplesStateService.listSharedSamples;
    
  
    @ViewChild('track') track!: ElementRef<HTMLElement>;
    @ViewChild('wrapper') wrapper!: ElementRef<HTMLElement>;
  
    currentTranslate = 0;
    canGoPrev = signal(false);
    canGoNext = signal(true);
  
    public next() {
      const trackEl = this.track.nativeElement;
      const wrapperWidth = this.wrapper.nativeElement.clientWidth;
      const maxTranslate = Math.max(trackEl.scrollWidth - wrapperWidth, 0);
  
      const step = this.getStep();
      this.currentTranslate = Math.min(this.currentTranslate + step, maxTranslate);
      this.updateButtons(maxTranslate);
    }
  
    public prev() {
      const step = this.getStep();
      this.currentTranslate = Math.max(this.currentTranslate - step, 0);
  
      const wrapperWidth = this.wrapper.nativeElement.clientWidth;
      const maxTranslate = Math.max(this.track.nativeElement.scrollWidth - wrapperWidth, 0);
      this.updateButtons(maxTranslate);
    }
  
    private getStep(): number {
      // avanza aprox una "pantalla" visible, tipo Spotify
      return this.wrapper.nativeElement.clientWidth * 0.9;
    }
  
    private updateButtons(maxTranslate: number) {
      this.canGoPrev.set(this.currentTranslate > 0);
      this.canGoNext.set(this.currentTranslate < maxTranslate - 1);
    }
}