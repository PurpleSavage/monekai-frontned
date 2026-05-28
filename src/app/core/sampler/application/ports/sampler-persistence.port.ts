import { Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { SampleEntity } from "../../domain/entities/sample.entity";

export abstract class  SamplerPersistencePort {
  abstract saveSamples(samples: SampleEntity[]): Observable<void>
  abstract listSamples(dto:PaginatedRequestDTO): Observable<SampleEntity[]>
}