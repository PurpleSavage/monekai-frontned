import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { map, Observable } from "rxjs";
import { SampleEditedEntity } from "../../domain/entities/sample-edited.entity";

export interface ICheckObjectChanges {
  isChange: boolean,
  sample: SampleEditedEntity,
}

@Injectable()
export class CheckSampleChangesUseCase {
  constructor(
    private persistence: SamplerPersistencePort
  ) { }
  execute(prevSample: SampleEditedEntity): Observable<ICheckObjectChanges | null>{ 
    return this.persistence.findSampleEditedById(prevSample.id).pipe(
      map((result) => {
        if(result) {
          return {
            isChange: JSON.stringify(prevSample.effects) !== JSON.stringify(result.effects),
            sample:prevSample,
          }
        }
        return null
      })
    )
  }
}