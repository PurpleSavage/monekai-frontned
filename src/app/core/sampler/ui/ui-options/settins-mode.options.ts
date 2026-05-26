export const SETTINGS_MODE_PARAM = {
  clipper: "CLIPPER",
  effects:"EFFECTS"
} as const

export type SettingsMode = typeof SETTINGS_MODE_PARAM[keyof typeof SETTINGS_MODE_PARAM]