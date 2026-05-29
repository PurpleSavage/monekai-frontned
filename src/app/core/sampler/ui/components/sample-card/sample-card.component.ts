import { Component, Input, signal } from "@angular/core";
import { SampleEntity } from "../../../domain/entities/sample.entity";
import { LucidePlay } from "@lucide/angular";

@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [LucidePlay],
  templateUrl: './sample-card.component.html',
})
export class SampleCardComponent {
  @Input({ required: true })
  sample!: SampleEntity;
  public isPlaying = signal(false);
  
  togglePlay() {
    this.isPlaying.update(v => !v);
  }
}