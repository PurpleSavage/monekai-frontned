import { PaginatedResponseDTO } from "../../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SharedSampleEntity } from "../../../domain/entities/shared-sample.entity";

export interface PaginatedSharedSamplesResponseDTO extends PaginatedResponseDTO<SharedSampleEntity> {}