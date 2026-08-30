import { Injectable } from "@angular/core";
import { CommunityPort } from "../ports/community.port";
import { LatestRequestDTO } from "../dtos/requests/latest-request.dto";
import { Observable, take } from "rxjs";
import { PaginatedSharedSamplesResponseDTO } from "../dtos/responses/paginated-shared-samples.dto";

@Injectable()
export class ListLatestSharedSamplesUseCase {
  constructor(private communityHttpService: CommunityPort) { }

  public execute(dto: LatestRequestDTO): Observable<PaginatedSharedSamplesResponseDTO> {
    return this.communityHttpService.listLatestSharedSamples(dto).pipe(
      take(1)
    );
  }
}
