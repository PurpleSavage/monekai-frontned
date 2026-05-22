import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SoundItem {
  id: string;
  title: string;
  image: string;
  soundUrl: string;
}

@Component({
  selector: 'app-sound-showcase-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sound-showcase-grid.component.html'
})
export class SoundShowcaseGridComponent {
  
  public soundItems = signal<SoundItem[]>([
    {
      id: '1',
      title: 'Slow tempo',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-1.jpg', 
      soundUrl: 'assets/audio/sicko-mode.mp3'
    },
    {
      id: '2',
      title: 'Formation - Beyoncé',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-2.jpg',
      soundUrl: 'assets/audio/formation.mp3'
    },
    {
      id: '3',
      title: 'Avicii - Levels',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-3.jpg',
      soundUrl: 'assets/audio/levels.mp3'
    },
    {
      id: '4',
      title: 'Drake - Scorpion',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-4.webp',
      soundUrl: 'assets/audio/scorpion.mp3'
    },
    {
      id: '5',
      title: 'Kendrick Lamar - DAMN.',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-5.webp',
      soundUrl: 'assets/audio/damn.mp3'
    },
    {
      id: '6',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-6.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '7',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-7.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '8',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-8.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '9',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-9.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '10',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-10.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '11',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-11.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '12',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-12.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '13',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-13.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '14',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-14.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '15',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-15.webp',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '16',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-16.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '17',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-17.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    },
    {
      id: '18',
      title: 'Martin Garrix - Animals',
      image: 'https://pub-e363d040c7374db58199f114f321d3a1.r2.dev/show-cases/case-18.jpg',
      soundUrl: 'assets/audio/animals.mp3'
    }
    
  ]);

  
  public playSound(url: string): void {
    console.log('Reproduciendo track desde:', url);
    // Aquí puedes meter tu lógica con un AudioContext o un "new Audio(url).play()"
  }
}