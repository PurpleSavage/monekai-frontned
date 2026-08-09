import { SampleEditBaseInfoResponseDTO } from "./sample-edit-base-info-response.dto"
import { SharedByResponseDto } from "./shared-by-response.dto"

export interface SharedEditSampleResponseDTO { 
  id: string
  likes: number
  downloads: number
  createdAt:string
  sharedBy:SharedByResponseDto
  sample:SampleEditBaseInfoResponseDTO
}