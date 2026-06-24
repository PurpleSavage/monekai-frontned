import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { Observable } from "rxjs";
import { SampleEditedEntity } from "../../domain/entities/sample-edited.entity";

@Injectable() 
export class SaveSampleUseCase {
  constructor(private persistence: SamplerPersistencePort) {}

  execute(sample: SampleEditedEntity): Observable<void> {
    
    return this.persistence.saveSample(sample)
  }
}
