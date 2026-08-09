import { SampleBaseInfo } from "./sample-base-info.entity";
import { SharedBy } from "./shared-by.entity";

export interface SharedSampleEntity {
  id: string
  likes: number
  downloads: number
  createdAt:string
  sharedBy:SharedBy
  sample:SampleBaseInfo
}


