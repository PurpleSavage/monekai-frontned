import { Observable } from "rxjs";
import { PaginatedRequestDTO } from "../../../../shared/common/application/dtos/requests/paginated-request.dto";
import { SharedSampleResponseDto } from "../dtos/responses/shared-sample-response.dto";
import { LikeSharedSampleResponseDto } from "../dtos/responses/like-shared-sample-response.dto";
import { DownloadSampleResponseDto } from "../dtos/responses/download-response.dto";
import { PaginatedSharedSamplesResponseDTO } from "../dtos/responses/paginated-shared-samples.dto";
import { PaginatedSharedEditSamplesResponseDTO } from "../dtos/responses/paginated-shared-edit-sample.dto";
import { LatestRequestDTO } from "../dtos/requests/latest-request.dto";

export abstract class CommunityPort {
  abstract listSharedSamples(dto:PaginatedRequestDTO): Observable<PaginatedSharedSamplesResponseDTO>
  abstract listSharedEditSamples(dto:PaginatedRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO>
  abstract listLatestSharedSamples(dto: LatestRequestDTO): Observable<PaginatedSharedSamplesResponseDTO>
  abstract listLatestSharedEditSamples(dto: LatestRequestDTO): Observable<PaginatedSharedEditSamplesResponseDTO>
  abstract likeToSharedSample(sampleID: string): Observable<LikeSharedSampleResponseDto>
  abstract downloadSample(sampleID:string):Observable<DownloadSampleResponseDto>
}