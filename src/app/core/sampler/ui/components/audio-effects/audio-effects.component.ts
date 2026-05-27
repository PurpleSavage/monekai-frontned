import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-audio-effects',
  templateUrl: './audio-effects.component.html',
  standalone: true,
  imports:[FormsModule]
})
export class AudioEffectsPageComponent {
  reverb = signal<number>(64);
  slowPitch = signal<number>(-12);
  saturation = signal<number>(12);
  delay = signal<number>(30);
  lowPass = signal<number>(12500);
  highPass = signal<number>(40);
  gain = signal<number>(-3);
  reverse = signal<boolean>(true)
 
  toggleReverse(): void {
    this.reverse.update(state => !state);
  }
}