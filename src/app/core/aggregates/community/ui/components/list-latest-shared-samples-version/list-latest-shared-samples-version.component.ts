import { Component, inject } from "@angular/core";
import { LatestSamplesStateService } from "../../../state-manager/latest-samples-state.service";
import { SampleCardSharedComponent } from "../sample-card-shared/sample-card-shared.component";

@Component({
  selector: 'app-list-latest-shared-samples-version',
  templateUrl: './list-latest-shared-samples-version.component.html',
  standalone: true,
  imports: [SampleCardSharedComponent]
})
export class ListLatestSharedSamplesVersionComponent {
  private latestSamplesStateService = inject(LatestSamplesStateService);
  listSharedSamples = this.latestSamplesStateService.listSharedSamples;
}