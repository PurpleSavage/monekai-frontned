import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

import { GetNewTokenUseCase } from "../../shared/auth/application/use-cases/get-new-token.use-case";
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthStateManager } from "../../shared/auth/state-manager/auth-state.service";
import { Router } from "@angular/router";


let isRefreshing = false
const refreshTokenSubject = new BehaviorSubject<string | null>(null);
export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  const getTokenUseCase = inject(GetNewTokenUseCase);
  const authState = inject(AuthStateManager);
  const router = inject(Router);

  let authReq = req;

  const currentToken = authState.getAccessToken();

  if (currentToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentToken}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/refresh-token')
      ) {

        // Ya hay un refresh corriendo
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => {
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                })
              );
            })
          );
        }

        isRefreshing = true;
        refreshTokenSubject.next(null);

        return getTokenUseCase.execute().pipe(

          // ESTE catchError SOLO escucha errores del refresh
          catchError((refreshErr) => {

            console.log('ERROR REFRESH', refreshErr);

            isRefreshing = false;

            authState.setSession(null);
            router.navigate(['/auth/login']);

            return throwError(() => refreshErr);
          }),

          switchMap((response) => {

            console.log('token refrescado', response.accessToken);

            isRefreshing = false;

            refreshTokenSubject.next(response.accessToken);

            authState.updateAccessToken(response.accessToken);

            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              })
            );
          })
        );
      }

      return throwError(() => error);
    })
  );
};