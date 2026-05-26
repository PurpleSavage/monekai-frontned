
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateManager } from "../../shared/auth/state-manager/auth-state.service";
import { GetProfileUseCase } from "../../shared/auth/application/use-cases/get-profile.use-case";
import { catchError, map, of } from "rxjs";
import { GetSessionFromStorageUseCase } from "../../shared/common/application/use-cases/get-session-from-storage.use-case";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateManager);
  const getSessionFromLocal = inject(GetSessionFromStorageUseCase);
  const getProfileUseCase = inject(GetProfileUseCase);
  const router = inject(Router);

  // CASO 1: La sesión ya existe en la memoria (Signal). Pasa directo.
  if (authState.session()) {
    return true;
  }

  // CASO 2: Verificar si hay rastro del usuario en LocalStorage
  const sessionFromLocal = getSessionFromLocal.execute();

  if (!sessionFromLocal) {
    // Si no hay nada en storage, ni nos molestamos en llamar al backend.
    // Redirigimos directo al login de forma limpia.
    authState.setLoading(false);
    return router.createUrlTree(['/auth/login']);
  }

  // CASO 3: Hay data en LocalStorage, pero la memoria (Signal) se borró (ej. F5 / Recarga).
  // Control de seguridad: Si ya hay una petición en vuelo, NO dispares otra.
  if (authState.isLoading()) {
    // Retornamos falso o dejamos que la petición original que está corriendo resuelva la navegación.
    return false; 
  }

  // Activamos el estado de carga global
  authState.setLoading(true);

  // Llamamos al backend para validar que la cookie siga viva y recuperar data fresca
  return getProfileUseCase.execute().pipe(
    map((sessionData) => {
      authState.setSession(sessionData);
      authState.setLoading(false); // 💡 Se ejecuta con éxito 200
      return true; 
    }),
    catchError((err) => {
      console.error('Error recuperando perfil en Guard:', err);
      
      // Si la cookie expiró o el backend dio error, limpiamos todo
      authState.setSession(null);
      authState.setLoading(false); // 💡 Se ejecuta si hay error (Equivalente al finally)
      
      // Limpiar también el storage corrupto o expirado para que no vuelva a entrar aquí
      localStorage.removeItem('user-data'); 

      return of(router.createUrlTree(['/auth/login']));
    })
  );
};