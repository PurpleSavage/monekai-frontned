import { SampleEffects } from "../../../domain/entities/sample-effects.entity";

export interface SampleEffectsRequestDto {
  reverb: number;
  slowPitch: number;
  saturation: number;
  delay: number;
  lowPass: number;
  highPass: number;
  gain: number;
  reverse: boolean;
}
export function fromEntityToDto(effects: SampleEffects): SampleEffectsRequestDto {
  return {
    reverb: effects.reverb,
    slowPitch: effects.slowPitch,
    saturation: effects.saturation,
    delay: effects.delay,
    lowPass: effects.lowPass,
    highPass: effects.highPass,
    gain: effects.gain,
    reverse: effects.reverse,
  }
}