import { inject, Injectable } from "@angular/core";
import { AuthPort } from "../../application/ports/auth.port";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GoogleAuthDto } from "../../application/dtos/requests/google-auth.dto";
import { SessionDto } from "../../application/dtos/responses/session.dto";
import { catchError, map, Observable } from "rxjs";
import { toSessionEntity } from "../infra-mappers/to-session-entity.mapper";
import { AppBaseError } from "../../../common/infrastructure/http-errors/app-base.error";
import { SessionEntity } from "../../domain/entities/session.entity";
import { AccessTokenDto } from "../../application/dtos/responses/access-token.dto";


@Injectable()
export class AuthHttp implements AuthPort{
  constructor(private http: HttpClient) { }
  
  loginWithGoogle(dto:GoogleAuthDto):Observable<SessionEntity> {
    return this.http.post<SessionDto>("/auth/login", dto).pipe(
      map((data) => { 
        return toSessionEntity(data)
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  getProfile(): Observable<SessionEntity> {
    return this.http.get<SessionDto>('/auth/profile').pipe(
      map((data) => {
        return toSessionEntity(data)
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  geNewtoken(): Observable<AccessTokenDto> {
    return this.http.get<AccessTokenDto>('/auth/refresh-token').pipe(
      map((data) => {
        return data
      }),
      catchError((err: unknown) => { 
        let appError: AppBaseError;
        if (err instanceof HttpErrorResponse) {
          appError = AppBaseError.fromBackend(err.error);
        } else {
          appError = AppBaseError.fromBackend({
            title: 'network error',
            message: 'Communication with the server could not be established.',
            status: 0
          })
        }
        throw appError
      })
    )
  }
  
}