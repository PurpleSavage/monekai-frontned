import { Injectable } from "@angular/core";
import { SamplerPersistencePort } from "../ports/sampler-persistence.port";
import { Observable } from "rxjs";
import { SampleEditedEntity } from "../../domain/entities/sample-edited.entity";

@Injectable()
export class GetLastSampleEditedUseCase { 
  constructor(private samplerPersistencePort: SamplerPersistencePort) { }
  public execute(): Observable<SampleEditedEntity | null> { 
    return this.samplerPersistencePort.getLastEdition()
  }
}