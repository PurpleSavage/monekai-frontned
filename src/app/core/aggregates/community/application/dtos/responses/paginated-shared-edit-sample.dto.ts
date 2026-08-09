import { PaginatedResponseDTO } from "../../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SharedEditSampleEntity } from "../../../domain/entities/shared-edit-sample.entity";

export interface PaginatedSharedEditSamplesResponseDTO extends PaginatedResponseDTO<SharedEditSampleEntity> {}
