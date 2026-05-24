import { inject, Injectable } from "@angular/core";
import { AuthPort } from "../../application/ports/auth.port";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GoogleAuthDto } from "../../application/dtos/requests/google-auth.dto";
import { SessionDto } from "../../application/dtos/responses/session.dto";
import { catchError, map, Observable } from "rxjs";
import { toSessionEntity } from "../infra-mappers/to-session-entity.mapper";
import { AppBaseError } from "../../../common/infrastructure/http-errors/app-base.error";
import { SessionEntity } from "../../domain/entities/session.entity";

@Injectable()
export class AuthHttp implements AuthPort{
  private http= inject(HttpClient)
  loginWithGoogle(dto:GoogleAuthDto):Observable<SessionEntity> {
    return this.http.post<SessionDto>("/login", dto).pipe(
      map((data) => { 
        return toSessionEntity(data)
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            Title: 'Error de Red',
            Message: 'No se pudo establecer comunicación con el servidor.',
            Status: 0
          })
        }
        throw appError
      })
    )
  }
}