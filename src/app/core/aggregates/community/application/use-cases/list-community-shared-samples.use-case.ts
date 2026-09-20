import { Injectable } from "@angular/core";
import { CommunityPort } from "../ports/community.port";
import { Observable, take } from "rxjs";
import { PaginatedSharedSamplesResponseDTO } from "../dtos/responses/paginated-shared-samples.dto";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";

@Injectable()
export class ListCommunitySharedSamplesUseCase { 
  constructor(private communityHttpService: CommunityPort) { }
  execute(dto: PaginatedRequestDTO):Observable<PaginatedSharedSamplesResponseDTO> { 
    return this.communityHttpService.listSharedSamples(dto).pipe(
      take(1)
    )
  }
}