import { Injectable } from "@angular/core";
import { CommunityPort } from "../ports/community.port";
import { LatestRequestDTO } from "../dtos/requests/latest-request.dto";
import { Observable, take } from "rxjs";
import { PaginatedSharedEditSamplesResponseDTO } from "../dtos/responses/paginated-shared-edit-sample.dto";

@Injectable()
export class ListLatestSharedEditSamplesUseCase {
  constructor(private communityHttpService: CommunityPort) { }

  public execute(dto: LatestRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO> {
    return this.communityHttpService.listLatestSharedEditSamples(dto).pipe(
      take(1)
    );
  }
}
