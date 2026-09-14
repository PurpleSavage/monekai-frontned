import { Component, computed, input } from "@angular/core";
import { SharedSampleEntity } from "../../../domain/entities/shared-sample.entity";

@Component({
  selector: 'app-sample-card-shared',
  templateUrl: './sample-card-shared.component.html',
  standalone: true
})
export class SampleCardSharedComponent {
  sample = input.required<SharedSampleEntity>();
  
    // color pseudo-random pero determinístico según el id, para que cada card
    // tenga un color distinto tipo Spotify sin necesitar el campo en el back
    private readonly palette = [
      'from-orange-400 to-orange-600',
      'from-emerald-400 to-emerald-600',
      'from-amber-300 to-amber-500',
      'from-violet-400 to-violet-600',
      'from-teal-400 to-teal-600',
      'from-rose-400 to-rose-600',
      'from-sky-400 to-sky-600',
    ];
  
    bgClass = computed(() => {
      const id = this.sample().id;
      const index = [...id].reduce((acc, c) => acc + c.charCodeAt(0), 0) % this.palette.length;
      return this.palette[index];
    });
}
