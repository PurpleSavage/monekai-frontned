import { Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";
import { PaginatedResponseDTO } from "../../shared/common/application/dtos/responses/paginated-response.dto";

@Injectable()
export class AudioStateService {
  public audioStateLoading = signal<boolean>(false)
  public audiosGenerated =signal<PaginatedResponseDTO<SampleEntity>>({
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: true,
    });

  public audioSelected = signal<SampleEntity | null>(null);

  public selectAudio(audio: SampleEntity | null) {
    this.audioSelected.set(audio);
  }
  public deleteAudioSelected() { 
    this.audioSelected.set(null)
  }

  public appendAudios(
    data: PaginatedResponseDTO<SampleEntity>
  ) {

    this.audiosGenerated.update(prev => ({

      total: data.total,
      page: data.page,
      pageSize: data.pageSize,
      hasMore: data.hasMore,

      data: [
        ...prev.data,
        ...data.data
      ]

    }));
  }

  public resetAudios() {

    this.audiosGenerated.set({
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: true,
    });

  }

  public deleteAudio(id: string) {

    this.audiosGenerated.update(prev => ({
      ...prev,
      items: prev.data.filter(
        audio => audio.id !== id
      )
    }));

  }

  public addAudio(audio: SampleEntity) {
  
    this.audiosGenerated.update(prev => ({
  
      ...prev,
  
      items: [audio, ...prev.data]
  
    }));
  
  }

  public setLoading(loading: boolean) {
    this.audioStateLoading.set(loading);
  }
}