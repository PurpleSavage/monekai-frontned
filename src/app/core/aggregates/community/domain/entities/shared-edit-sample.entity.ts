import { SampleEditBaseInfoEntity } from "./sample-edit-base-info.entity"
import { SharedBy } from "./shared-by.entity"

export interface SharedEditSampleEntity { 
  id: string
  likes: number
  downloads: number
  createdAt:string
  sharedBy:SharedBy
  sample:SampleEditBaseInfoEntity
}