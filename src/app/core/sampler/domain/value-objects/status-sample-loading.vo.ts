export const StatusSampleLoading = {
  STARTING: 'starting',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELED: 'canceled',
} as const
export type StatusSampleLoadingType = typeof StatusSampleLoading[keyof typeof StatusSampleLoading];

