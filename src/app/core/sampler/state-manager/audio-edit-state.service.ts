import {  Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";

@Injectable()
export class AudioEditStateService { 
  public audioSelectedToEdit = signal<SampleEntity | null>(null)
  public audioSelectedToEditIsPalying = signal<boolean>(false)

  public setAudioToEditIsPlaying(isPlaying: boolean) {
    this.audioSelectedToEditIsPalying.set(isPlaying)
  }

  public setAudioToEdit(audio:SampleEntity | null) { 
    this.audioSelectedToEdit.set(audio)
  }
}