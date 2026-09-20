import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { PaginatedSharedEditSamplesResponseDTO } from "../dtos/responses/paginated-shared-edit-sample.dto";
import { CommunityPort } from "../ports/community.port";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";

@Injectable()
export class ListCommunitySharedEditSamplesUseCase { 
  constructor(private communityHttpService: CommunityPort) { }
  execute(dto: PaginatedRequestDTO):Observable<PaginatedSharedEditSamplesResponseDTO> { 
    return this.communityHttpService.listSharedEditSamples(dto).pipe(
      take(1)
    )
  }
}