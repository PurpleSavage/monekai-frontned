import { Injectable } from "@angular/core";
import { db } from "../../../shared/common/infrastructure/indexed-db/db";
import { SamplerPersistencePort } from "../../application/ports/sampler-persistence.port";
import { PaginatedRequestDTO } from "../../../shared/common/application/dtos/requests/paginated-request.dto";
import { SampleEntity } from "../../domain/entities/sample.entity";
import { LocalPersistenceError } from "../../../shared/common/infrastructure/persisitence-error/local-persistence.error";
import { catchError, defer, from, map, Observable, throwError } from "rxjs";
import { liveQuery } from "dexie";

@Injectable()
export class SamplerPersistenceService implements SamplerPersistencePort {

  public findSampleEditedById(id: string): Observable<SampleEntity | null> {
    return from(db.samplesEdited.get(id)).pipe(
      map((sample) => sample ?? null),
      catchError((error) =>
        throwError(() =>
          LocalPersistenceError.fromDexieError(
            error,
            `Failed to retrieve edited sample with ID: ${id} from local storage`
          )
        ))
    )
  }

  public saveSample(sample: SampleEntity): Observable<void> {
    return defer(() => db.samplesEdited.put(sample)).pipe(
      map(() => undefined),
      catchError((error) => 
        throwError(() => 
          LocalPersistenceError.fromDexieError(
            error, 
            'Failed to save audio sample chunk safely into local storage'
          )
        )
      )
    )
  }

  /**
   * Saves incoming chunks incrementally and returns an Observable<void>.
   * Throws a LocalPersistenceError downstream if the operation fails.
   */
  public saveSamples(samples: SampleEntity[]): Observable<void> {
    return defer(() => db.samplesEdited.bulkPut(samples)).pipe(

      map(() => undefined),
      catchError((error) => 
        throwError(() => 
          LocalPersistenceError.fromDexieError(
            error, 
            'Failed to save audio sample chunks safely into local storage'
          )
        )
      )
    );
  }

  /**
   * Returns a real-time Observable array of samples matching the pagination limits.
   * Emits new updates automatically whenever the database slice changes.
   */
  public listSamplesEdited(dto: PaginatedRequestDTO): Observable<SampleEntity[]> {
    const { page, limit } = dto;
    const skip = (page - 1) * limit;

    // liveQuery observa los cambios reactivos de la BD y from lo adapta a RxJS
    return from(
      liveQuery(() => 
        db.samplesEdited
          .offset(skip)
          .limit(limit)
          .toArray()
      )
    ).pipe(
      catchError((error) => 
        throwError(() => 
          LocalPersistenceError.fromDexieError(
            error, 
            `Failed to retrieve paginated sample list for page ${page}`
          )
        )
      )
    );
  }

  public getLastEdition(): Observable<SampleEntity | null> {
    return from(
      db.samplesEdited.orderBy('id').last()
    ).pipe(
      map(sample => sample ?? null),
  
      catchError((error) =>
        throwError(() =>
          LocalPersistenceError.fromDexieError(
            error,
            'Failed to retrieve the last sample edition'
          )
        )
      )
    );
  }
}