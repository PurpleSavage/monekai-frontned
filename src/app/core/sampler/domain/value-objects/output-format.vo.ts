export const OutputFormat = {
  wav: 'wav',
  mp3: 'mp3',
} as const

export type OutputFormatType = typeof OutputFormat[keyof typeof OutputFormat]