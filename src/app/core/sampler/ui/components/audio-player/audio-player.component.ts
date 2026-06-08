import { Component, effect, ElementRef, inject, viewChild} from "@angular/core";
import { AudioStateService } from "../../../state-manager/audio-state.service";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  standalone: true,
})
export class AudioPlayerComponent {
  audioPlayer =viewChild<ElementRef<HTMLAudioElement>>('audioPlayer')
  
  private audioStateService = inject(AudioStateService)
  constructor() { 
    effect(() => { 
      const audioSelectedToListen = this.audioStateService.audioSelectedToListen()
      const player = this.audioPlayer()?.nativeElement
      if (!player || !audioSelectedToListen?.audio?.audioUrl) {
        return;
      }
      const currentUrl = player.getAttribute('data-audio-url');
      if (currentUrl !== audioSelectedToListen.audio.audioUrl) {
        player.src =audioSelectedToListen.audio.audioUrl;
        player.setAttribute('data-audio-url', audioSelectedToListen.audio.audioUrl);
      }
      if (audioSelectedToListen.isPlaying) {

        player.play();
      } else {
        player.pause();
      }
    })
  }
}
  