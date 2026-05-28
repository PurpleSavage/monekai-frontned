import { Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";

@Injectable()
export class AudioEditStateService { 
  public audioSelectedToEdit = signal<SampleEntity | null>(null)
  public setAudioToEdit(audio:SampleEntity) { 
    this.audioSelectedToEdit.set(audio)
  }
}