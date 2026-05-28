export interface SampleRepsonseDTO{ 
  id: string,
  sampleName: string,
  prompt: string,
  audioUrl: string | null,
  duration: number,
  outputFormat: string,
  modelVersion: string,
  status: string,
  createdAt: string,
}