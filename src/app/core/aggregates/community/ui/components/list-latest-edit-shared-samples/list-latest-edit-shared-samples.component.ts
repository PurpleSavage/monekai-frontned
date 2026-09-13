import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LatestSamplesStateService } from "../../../state-manager/latest-samples-state.service";
import { SampleCardSharedEditComponent } from "../sample-card-shared-edit/sample-card-shared-edit.component";

@Component({
  selector: 'app-list-latest-edit-shared-samples',
  templateUrl: './list-latest-edit-shared-samples.component.html',
  standalone: true,
  imports: [SampleCardSharedEditComponent, RouterLink]
})
export class ListLatestEditSharedSamplesComponent {
  private latestSamplesStateService = inject(LatestSamplesStateService);
  listSharedEditSamples = this.latestSamplesStateService.listSharedEditSamples;
}
