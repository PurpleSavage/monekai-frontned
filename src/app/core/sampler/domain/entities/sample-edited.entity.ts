import { SampleEffects } from "./sample-effects.entity";
import { SampleEntity } from "./sample.entity";

export interface SampleEditedEntity extends SampleEntity {
  effects: SampleEffects | null
  blobUrlModify:Blob | null
}