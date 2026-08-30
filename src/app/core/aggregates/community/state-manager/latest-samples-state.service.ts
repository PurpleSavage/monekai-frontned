import { Injectable, signal } from "@angular/core";
import { SharedEditSampleEntity } from "../domain/entities/shared-edit-sample.entity";
import { SharedSampleEntity } from "../domain/entities/shared-sample.entity";

@Injectable()
export class LatestSamplesStateService { 
  public listSharedEditSamples = signal<SharedEditSampleEntity[]>([])
  public listSharedSamples = signal<SharedSampleEntity[]>([])

  public setListSharedEditSamples(list:SharedEditSampleEntity[]):void{ 
    this.listSharedEditSamples.set(list)
  }
  public setListSharedSamples(list:SharedSampleEntity[]):void { 
    this.listSharedSamples.set(list)
  }
}