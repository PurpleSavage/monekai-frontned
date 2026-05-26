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
  const getTokenUseCase = inject(GetNewTokenUseCase)
  const authState = inject(AuthStateManager);
  const router = inject(Router);
  let authReq = req;
  const currentToken = authState.getAccessToken(); 
  if (currentToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${currentToken}` }
    });
  }

  //procesar la petición si es que hay un error 
  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/auth/refresh-token')) { 
        // Si ya hay un refresco en curso, pausamos esta petición en la fila
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => {
              // Reintentamos con el nuevo token obtenido por la otra petición
              return next(req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
              }));
          }))
        }

        isRefreshing = true;
        refreshTokenSubject.next(null);
        return getTokenUseCase.execute().pipe(
          switchMap((response) => { 
            isRefreshing = false;
            refreshTokenSubject.next(response.accessToken);

            authState.updateAccessToken(response.accessToken)
            return next(req.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` }
            }));
          }),
          catchError((refreshErr) => { 
            isRefreshing = false;
            authState.setSession(null);
            router.navigate(['/auth/login']);
            return throwError(() => refreshErr);
          })
        )
        
      }
      return throwError(() => error);
    })
  );
}