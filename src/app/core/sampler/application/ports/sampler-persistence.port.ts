import { Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { SampleEditedEntity } from "../../domain/entities/sample-edited.entity";

export abstract class  SamplerPersistencePort {
  abstract saveSamples(samples: SampleEditedEntity[]): Observable<void>
  abstract listSamplesEdited(dto: PaginatedRequestDTO): Observable<SampleEditedEntity[]>
  abstract getLastEdition(): Observable<SampleEditedEntity | null>
  abstract saveSample(sample: SampleEditedEntity): Observable<void>
  abstract findSampleEditedById(id: string): Observable<SampleEditedEntity | null>
}