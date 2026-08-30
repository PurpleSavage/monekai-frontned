import { Component, inject, input } from "@angular/core";

@Component({
  selector: 'app-list-latest-shared-samples-version',
  templateUrl: './list-latest-shared-samples-version.component.html',
  standalone:true
})
export class ListLatestSharedSamplesVersionComponent { 
  private listSharedEditSamples =input<string>()
}