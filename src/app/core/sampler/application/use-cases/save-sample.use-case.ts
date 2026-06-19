import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { Observable } from "rxjs";
import { SampleEntity } from "../../domain/entities/sample.entity";

@Injectable() 
export class SaveSampleUseCase {
  constructor(private persistence: SamplerPersistencePort) {}

  execute(sample: SampleEntity): Observable<void> {
    return this.persistence.saveSample(sample)
  }
}
