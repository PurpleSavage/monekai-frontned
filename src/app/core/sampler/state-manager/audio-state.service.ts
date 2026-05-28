import { Injectable, signal } from "@angular/core";
import { SampleEntity } from "../domain/entities/sample.entity";
import { PaginatedResponseDTO } from "../../shared/common/application/dtos/responses/paginated-response.dto";

@Injectable()
export class AudioStateService {

  public audiosGenerated =signal<PaginatedResponseDTO<SampleEntity>>({
      items: [],
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: true,
    });

  public audioSelected = signal<SampleEntity | null>(null);

  selectAudio(audio: SampleEntity | null) {
    this.audioSelected.set(audio);
  }

  appendAudios(
    data: PaginatedResponseDTO<SampleEntity>
  ) {

    this.audiosGenerated.update(prev => ({

      total: data.total,
      page: data.page,
      pageSize: data.pageSize,
      hasMore: data.hasMore,

      items: [
        ...prev.items,
        ...data.items
      ]

    }));
  }

  resetAudios() {

    this.audiosGenerated.set({
      items: [],
      total: 0,
      page: 1,
      pageSize: 10,
      hasMore: true,
    });

  }

  deleteAudio(id: string) {

    this.audiosGenerated.update(prev => ({
      ...prev,
      items: prev.items.filter(
        audio => audio.id !== id
      )
    }));

  }
}