import { SampleBaseInfoResponseDto } from "./sample-base-info-response.dto"
import { SharedByResponseDto } from "./shared-by-response.dto"


export interface SharedSampleResponseDto { 
  id: string
  likes: number
  downloads: number
  createdAt:string
  sharedBy:SharedByResponseDto
  sample:SampleBaseInfoResponseDto
}