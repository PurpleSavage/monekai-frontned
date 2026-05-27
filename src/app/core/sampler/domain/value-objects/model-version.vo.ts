export const ModelVersion = {
  stereoMelodyLarge: 'stereo-melody-large',
  stereoLarge: 'stereo-large',
  melodyLarge: 'melody-large',
  large: 'large',
} as const

export type ModelVersionType = typeof ModelVersion[keyof typeof ModelVersion]