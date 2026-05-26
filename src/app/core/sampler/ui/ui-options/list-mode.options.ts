
export const LIST_MODE_PARAM = {
  listPure: "PURE",
  listSaved: "SAVED",
  listUnsaved: "UNSAVED",
} as const 

export type ListMode = typeof LIST_MODE_PARAM[keyof typeof LIST_MODE_PARAM]