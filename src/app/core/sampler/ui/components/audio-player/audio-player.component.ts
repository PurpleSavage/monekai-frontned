import { Component, computed, effect, ElementRef, inject, signal, viewChild} from "@angular/core";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { LucideChevronFirst, LucideChevronLast, LucidePause, LucidePlay, LucideVolume1, LucideVolume2, LucideVolumeX } from "@lucide/angular";

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  standalone: true,
  imports: [
    LucidePlay,
    LucidePause,
    LucideChevronFirst,
    LucideChevronLast,
    LucideVolume1,
    LucideVolume2,
    LucideVolumeX
  ]
})
export class AudioPlayerComponent {
  audioPlayer =viewChild<ElementRef<HTMLAudioElement>>('audioPlayer')
  
  private audioStateService = inject(AudioStateService)
  protected isPlaying = computed(
     () => this.audioStateService.audioSelectedToListen().isPlaying
  )
  protected volume = signal<'muted'|'medium'|'high'>('medium')
  
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

  handleVolumeChange(event: Event) { 
    const volume = Number(
      (event.target as HTMLInputElement).value
    )
    const player = this.audioPlayer()?.nativeElement
    if (!player) {
      console.error('reference audio not found')
      return;
    }
    player.volume = volume
    if (volume >= 0.7) { 
      this.volume.set('high')
    } else if (volume > 0 && volume < 0.7) { 
      this.volume.set('medium')
    } else if(volume===0){ 
      this.volume.set('muted')
    }
  }
}
  