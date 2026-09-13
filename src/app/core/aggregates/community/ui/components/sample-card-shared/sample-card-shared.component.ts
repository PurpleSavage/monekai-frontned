import { Component, input } from "@angular/core";
import { SharedSampleEntity } from "../../../domain/entities/shared-sample.entity";

@Component({
  selector: 'app-sample-card-shared',
  templateUrl: './sample-card-shared.component.html',
  standalone: true
})
export class SampleCardSharedComponent {
  sample = input.required<SharedSampleEntity>();
}
