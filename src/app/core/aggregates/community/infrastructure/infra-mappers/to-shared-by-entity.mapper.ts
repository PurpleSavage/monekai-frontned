import { SharedByResponseDto } from "../../application/dtos/responses/shared-by-response.dto";
import { SharedBy } from "../../domain/entities/shared-by.entity";

export function toSharedByEntity(dto:SharedByResponseDto): SharedBy { 
  return {
    email:dto.email,
    id:dto.id
  }
}