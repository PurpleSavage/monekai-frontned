import { PaginatedResponseDTO } from "../../../../shared/common/application/dtos/responses/paginated-response.dto";
import { SampleRepsonseDTO } from "./sample-response.dto";

export interface PaginatedSampleResponseDTO extends PaginatedResponseDTO<SampleRepsonseDTO> {}