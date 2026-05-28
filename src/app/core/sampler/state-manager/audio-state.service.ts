import { Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";

@Injectable()
export class AudioStateService {
  public audiosGenerated = signal<SampleEntity[]>([])
  
  addAudio(audio: SampleEntity) {
    this.audiosGenerated.update((audios) => [...audios, audio]);
  }
  setAudios(audios: SampleEntity[]) {
    this.audiosGenerated.set(audios);
  }
  deleteAudio(id: string) {
    this.audiosGenerated.update((audios) => audios.filter(audio => audio.id !== id));
  }
}