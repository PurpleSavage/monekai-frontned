import { SharedSampleResponseDto } from "../../application/dtos/responses/shared-sample-response.dto";
import { SharedSampleEntity } from "../../domain/entities/shared-sample.entity";
import { toSampleInfoEntity } from "./to-sample-info-entity.mapper";
import { toSharedByEntity } from "./to-shared-by-entity.mapper";



export function toSharedSampleEntity(sample: SharedSampleResponseDto): SharedSampleEntity {
  return {
    id:sample.id,
    likes: sample.likes,
    downloads: sample.downloads,
    createdAt:sample.createdAt,
    sharedBy:toSharedByEntity(sample.sharedBy),
    sample:toSampleInfoEntity(sample.sample)
  }
}
    