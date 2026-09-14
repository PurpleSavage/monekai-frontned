import { Injectable, signal } from "@angular/core";
import { SharedEditSampleEntity } from "../domain/entities/shared-edit-sample.entity";
import { SharedSampleEntity } from "../domain/entities/shared-sample.entity";

@Injectable()
export class LatestSamplesStateService { 
  private  SHARED_SAMPLES: SharedSampleEntity[] = [
    {
      id: '1',
      likes: 245,
      downloads: 89,
      createdAt: '2026-08-01T10:30:00Z',
      sharedBy: { id: 'u1', email: 'mariana.torres@lubrisur.com' },
      sample: {
        id: 's1',
        sampleName: 'Ambient Pad Loop',
        intialAudioUrl: 'https://cdn.example.com/audio/s1.mp3',
        prompt: 'Textura ambiental suave con reverb largo, tono melancólico',
        duration: 32
      }
    },
    {
      id: '2',
      likes: 132,
      downloads: 54,
      createdAt: '2026-08-03T14:15:00Z',
      sharedBy: { id: 'u2', email: 'diego.ramirez@lubrisur.com' },
      sample: {
        id: 's2',
        sampleName: 'Trap Hi-Hat Roll',
        intialAudioUrl: 'https://cdn.example.com/audio/s2.mp3',
        prompt: 'Rolls de hi-hat rápidos estilo trap moderno, 140 BPM',
        duration: 8
      }
    },
    {
      id: '3',
      likes: 578,
      downloads: 301,
      createdAt: '2026-08-05T08:00:00Z',
      sharedBy: { id: 'u3', email: 'valentina.cruz@lubrisur.com' },
      sample: {
        id: 's3',
        sampleName: 'Deep House Bassline',
        intialAudioUrl: 'https://cdn.example.com/audio/s3.mp3',
        prompt: 'Bajo profundo y cálido para deep house, 124 BPM',
        duration: 16
      }
    },
    {
      id: '4',
      likes: 76,
      downloads: 22,
      createdAt: '2026-08-08T19:45:00Z',
      sharedBy: { id: 'u4', email: 'andres.salazar@lubrisur.com' },
      sample: {
        id: 's4',
        sampleName: 'Lo-fi Vinyl Crackle',
        intialAudioUrl: 'https://cdn.example.com/audio/s4.mp3',
        prompt: 'Ruido de vinilo cálido y nostálgico para lo-fi hip hop',
        duration: 12
      }
    },
    {
      id: '5',
      likes: 412,
      downloads: 198,
      createdAt: '2026-08-10T11:20:00Z',
      sharedBy: { id: 'u5', email: 'camila.rojas@lubrisur.com' },
      sample: {
        id: 's5',
        sampleName: 'Reggaeton Perc Loop',
        intialAudioUrl: 'https://cdn.example.com/audio/s5.mp3',
        prompt: 'Percusión urbana con dembow clásico, 95 BPM',
        duration: 16
      }
    },
    {
      id: '6',
      likes: 23,
      downloads: 8,
      createdAt: '2026-08-12T16:05:00Z',
      sharedBy: { id: 'u6', email: 'jorge.espinoza@lubrisur.com' },
      sample: {
        id: 's6',
        sampleName: 'Synthwave Arp Sequence',
        intialAudioUrl: 'https://cdn.example.com/audio/s6.mp3',
        prompt: 'Arpegio retro synthwave con delay estéreo, 110 BPM',
        duration: 24
      }
    },
    {
      id: '7',
      likes: 89,
      downloads: 34,
      createdAt: '2026-08-14T09:10:00Z',
      sharedBy: { id: 'u7', email: 'lucia.mendoza@lubrisur.com' },
      sample: {
        id: 's7',
        sampleName: 'Cinematic Riser',
        intialAudioUrl: 'https://cdn.example.com/audio/s7.mp3',
        prompt: 'Subida tensa tipo trailer de cine con impacto final',
        duration: 6
      }
    },
    {
      id: '8',
      likes: 356,
      downloads: 145,
      createdAt: '2026-08-17T13:40:00Z',
      sharedBy: { id: 'u8', email: 'fernando.gutierrez@lubrisur.com' },
      sample: {
        id: 's8',
        sampleName: 'Funk Guitar Riff',
        intialAudioUrl: 'https://cdn.example.com/audio/s8.mp3',
        prompt: 'Riff de guitarra funk con wah-wah, groove bailable',
        duration: 10
      }
    },
    {
      id: '9',
      likes: 61,
      downloads: 19,
      createdAt: '2026-08-19T21:00:00Z',
      sharedBy: { id: 'u9', email: 'paula.vargas@lubrisur.com' },
      sample: {
        id: 's9',
        sampleName: 'Jazz Piano Chord Stab',
        intialAudioUrl: 'https://cdn.example.com/audio/s9.mp3',
        prompt: 'Acorde de piano jazz con séptimas, tono relajado',
        duration: 4
      }
    },
    {
      id: '10',
      likes: 490,
      downloads: 267,
      createdAt: '2026-08-22T15:30:00Z',
      sharedBy: { id: 'u10', email: 'ricardo.paredes@lubrisur.com' },
      sample: {
        id: 's10',
        sampleName: 'EDM Drop Impact',
        intialAudioUrl: 'https://cdn.example.com/audio/s10.mp3',
        prompt: 'Impacto de drop para EDM con sub bass potente',
        duration: 5
      }
    },
    {
      id: '11',
      likes: 15,
      downloads: 3,
      createdAt: '2026-08-25T07:50:00Z',
      sharedBy: { id: 'u11', email: 'sofia.medina@lubrisur.com' },
      sample: {
        id: 's11',
        sampleName: 'Acoustic Guitar Strum',
        intialAudioUrl: 'https://cdn.example.com/audio/s11.mp3',
        prompt: 'Rasgueo acústico cálido estilo folk, ritmo suave',
        duration: 14
      }
    },
    {
      id: '12',
      likes: 203,
      downloads: 77,
      createdAt: '2026-08-28T18:25:00Z',
      sharedBy: { id: 'u12', email: 'gabriel.nunez@lubrisur.com' },
      sample: {
        id: 's12',
        sampleName: 'Dubstep Wobble Bass',
        intialAudioUrl: 'https://cdn.example.com/audio/s12.mp3',
        prompt: 'Bajo wobble agresivo con modulación LFO, 140 BPM',
        duration: 20
      }
    },
    {
      id: '13',
      likes: 334,
      downloads: 156,
      createdAt: '2026-09-01T12:00:00Z',
      sharedBy: { id: 'u13', email: 'natalia.ibarra@lubrisur.com' },
      sample: {
        id: 's13',
        sampleName: 'Afrobeat Percussion Groove',
        intialAudioUrl: 'https://cdn.example.com/audio/s13.mp3',
        prompt: 'Groove percusivo afrobeat con congas y shakers',
        duration: 18
      }
    },
    {
      id: '14',
      likes: 47,
      downloads: 12,
      createdAt: '2026-09-06T20:15:00Z',
      sharedBy: { id: 'u14', email: 'mateo.silva@lubrisur.com' },
      sample: {
        id: 's14',
        sampleName: 'Vocal Chop Hook',
        intialAudioUrl: 'https://cdn.example.com/audio/s14.mp3',
        prompt: 'Chops vocales pitcheados con efecto glitch',
        duration: 7
      }
    },
    {
      id: '15',
      likes: 267,
      downloads: 103,
      createdAt: '2026-09-11T09:40:00Z',
      sharedBy: { id: 'u15', email: 'daniela.rios@lubrisur.com' },
      sample: {
        id: 's15',
        sampleName: 'Techno Kick Pattern',
        intialAudioUrl: 'https://cdn.example.com/audio/s15.mp3',
        prompt: 'Patrón de kick techno cuatro por cuatro, 128 BPM',
        duration: 16
      }
    }
  ];
  public listSharedEditSamples = signal<SharedEditSampleEntity[]>([])
  public listSharedSamples = signal<SharedSampleEntity[]>(this.SHARED_SAMPLES)

  public setListSharedEditSamples(list:SharedEditSampleEntity[]):void{ 
    this.listSharedEditSamples.set(list)
  }
  public setListSharedSamples(list:SharedSampleEntity[]):void { 
    this.listSharedSamples.set(list)
  }
}