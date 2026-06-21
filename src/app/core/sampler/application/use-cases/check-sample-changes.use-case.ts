import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { map, Observable } from "rxjs";

export interface ICheckObjectChanges {
  isChange: boolean,
  currentSample: SampleEntity,
  prevSample: SampleEntity,
}

@Injectable()
export class CheckSampleChangesUseCase {
  constructor(
    private persistence: SamplerPersistencePort
  ) { }
  execute(prevSample: SampleEntity, currentSample: SampleEntity): Observable<ICheckObjectChanges | null>{ 
    return this.persistence.findSampleEditedById(currentSample.id).pipe(
      map((result) => {
        if(result) {
          return {
            isChange: JSON.stringify(prevSample) !== JSON.stringify(result),
            currentSample,
            prevSample,
          }
        }
        return null
      })
    )
  }
}