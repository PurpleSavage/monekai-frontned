import { Injectable } from "@angular/core";
import { SamplerPersistenceService } from "../../infrastructure/persistence/sampler-persistence.service";
import { SamplerPort } from "../ports/sampler.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { from, map, Observable, of, switchMap, take } from "rxjs";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { PaginatedSampleResponseDTO } from "../dtos/responses/paginated-samples-response.dto";
import { MetadataPersistencePort } from "../../../shared/common/application/ports/metadata-persistence.port";
import { PaginatedResponseDTO } from "../../../shared/common/application/dtos/responses/paginated-response.dto";
import { MetadataPagedVO } from "../../../shared/common/domain/value-objects/metadata-paged.vo";

@Injectable()
export class ListSamplesUseCase {
  constructor(
    private samplerPersistenceService: SamplerPersistenceService,
    private samplerHttpService: SamplerPort,
    private metadataPersistenceService: MetadataPersistencePort
  ) { }

  public execute(dto: PaginatedRequestDTO): Observable<PaginatedSampleResponseDTO> { 
    return this.samplerPersistenceService.listSamples(dto).pipe(
      take(1),
      switchMap((localSamples: SampleEntity[]) => { 

        // CASO 1: SÍ HAY DATOS LOCALES PARA ESTA PÁGINA
        if (localSamples && localSamples.length > 0) {
          return from(this.metadataPersistenceService.getMetadataFromOrigin('samples')).pipe(
            map((metadata) => {
              return {
                items: localSamples,
                total: metadata ? metadata.total : localSamples.length, 
                page: dto.page,
                pageSize: dto.limit,
              };
            })
          );
        }

        //CASO 2: NO HAY LOCAL (O ES UNA PÁGINA NUEVA), VAMOS A LA API
        return this.samplerHttpService.listSamples(dto).pipe(
          switchMap((apiResponse: PaginatedResponseDTO<SampleEntity>) => {
            
            const updatedMetadata: MetadataPagedVO = {
              origin: 'samples',
              total: apiResponse.total, 
           
            };

            // Guardamos los samples de la página actual en caché
            this.samplerPersistenceService.saveSamples(apiResponse.items).subscribe({
              error: err => console.error('Background samples cache save failed', err)
            });

  
            this.metadataPersistenceService.saveMetadata(updatedMetadata).catch(
              err => console.error('Background metadata cache update failed', err)
            );

            return of(apiResponse);
          })
        );
      })
    );
  }
}
