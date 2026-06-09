import { Component, computed, effect, ElementRef, inject, signal, viewChild} from "@angular/core";
import { AudioStateService } from "../../../state-manager/audio-state.service";
import { LucideChevronFirst, LucideChevronLast, LucideChevronsDown, LucidePause, LucidePlay, LucideVolume1, LucideVolume2, LucideVolumeX } from "@lucide/angular";

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
    LucideVolumeX,

  ]
})
export class AudioPlayerComponent {
  audioPlayer =viewChild<ElementRef<HTMLAudioElement>>('audioPlayer')
  
  private audioStateService = inject(AudioStateService)

  protected volumeValue = signal(0.5)
  protected currentTime = signal(0)
  protected totalTime = signal(0)
  
  protected isPlaying = computed(
     () => this.audioStateService.audioSelectedToListen().isPlaying
  )
  protected volumeLevel = computed(() => {
    const volume = this.volumeValue();
  
    if (volume === 0) return 'muted';
    if (volume < 0.7) return 'medium';
  
    return 'high';
  });
  protected volumePercentage = computed(() => {
    return this.volumeValue() * 100
  })
  protected formattedCurrentTime = computed(() => {
    const seconds = this.currentTime()
  
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
  
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  })
  
  protected formattedTotalTime = computed(() => {
    const seconds = this.totalTime();
  
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
  
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  })
  protected progressPercentage = computed(() => {
    const total = this.totalTime()
  
    if (!total) return 0
  
    return (this.currentTime() / total) * 100
  })
  
  constructor() { 
    effect(() => { 
      const audioSelectedToListen = this.audioStateService.audioSelectedToListen()
      const player = this.audioPlayer()?.nativeElement
      if (!player || !audioSelectedToListen?.audio?.audioUrl) {
        return;
      }
      player.volume = this.volumeValue()
      const currentUrl = player.getAttribute('data-audio-url');
      if (currentUrl !== audioSelectedToListen.audio.audioUrl) {
        player.src = audioSelectedToListen.audio.audioUrl
        player.setAttribute('data-audio-url', audioSelectedToListen.audio.audioUrl)
      }
      if (audioSelectedToListen.isPlaying) {

        player.play();
      } else {
        player.pause();
      }
    })
  }
  onMetadataLoaded() {
    const player = this.audioPlayer()?.nativeElement;
  
    if (!player) return;
  
    this.totalTime.set(player.duration);
  }
  seekAudio(event: Event) {
    const value = Number(
      (event.target as HTMLInputElement).value
    );
  
    const player = this.audioPlayer()?.nativeElement;
  
    if (!player) return;
  
    player.currentTime = value;
  }
  onTimeUpdate() {
    const player = this.audioPlayer()?.nativeElement;
  
    if (!player) return;
  
    this.currentTime.set(player.currentTime);
  }
  handleVolumeChange(event: Event) { 
    const volume = Number(
      (event.target as HTMLInputElement).value
    )
     this.volumeValue.set(volume)
    const player = this.audioPlayer()?.nativeElement
    if (!player) {
      console.error('reference audio not found')
      return;
    }
    player.volume = volume
 
  }

  onEnded() {
    this.audioStateService.changeStateIsPlaying(false)
  }

  togglePlay() {
    const isPlaying = this.isPlaying()
    this.audioStateService.changeStateIsPlaying(!isPlaying)
  }
  handleForward(action: 'skip' | 'back') {
    const player = this.audioPlayer()?.nativeElement;
  
    if (!player) return;
  
    if (action === 'skip') {
      player.currentTime = Math.min(
        player.currentTime + 1,
        player.duration
      );
    } else {
      player.currentTime = Math.max(
        player.currentTime - 1,
        0
      );
    }
  }
}
  