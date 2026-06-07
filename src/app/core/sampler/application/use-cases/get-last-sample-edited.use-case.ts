import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { Observable } from "rxjs";
import { SampleEntity } from "../../domain/entities/sample.entity";

@Injectable()
export class GetLastSampleEditedUseCase { 
  constructor(private samplerPersistencePort: SamplerPersistencePort) { }
  public execute(): Observable<SampleEntity | null> { 
    return this.samplerPersistencePort.getLastEdition()
  }
}