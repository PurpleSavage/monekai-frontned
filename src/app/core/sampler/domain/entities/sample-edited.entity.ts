import { SampleEffects } from "./bucket-effects.entity";
import { SampleEntity } from "./sample.entity";

export interface SampleEditedEntity extends SampleEntity {
  effects:SampleEffects | null
}