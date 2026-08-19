import { Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { PaginatedSharedEditSamplesResponseDTO } from "../../../aggregates/community/application/dtos/responses/paginated-shared-edit-sample.dto";

export abstract class SharedEditSamplesPort {
  abstract listSharedEditSamples(dto: PaginatedRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO>
}
