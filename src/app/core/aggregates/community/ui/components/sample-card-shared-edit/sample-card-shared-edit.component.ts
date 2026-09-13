import { Component, input } from "@angular/core";
import { SharedEditSampleEntity } from "../../../domain/entities/shared-edit-sample.entity";

@Component({
  selector: 'app-sample-card-shared-edit',
  templateUrl: './sample-card-shared-edit.component.html',
  standalone: true
})
export class SampleCardSharedEditComponent {
  sample = input.required<SharedEditSampleEntity>();
}
