import { inject } from "@angular/core/primitives/di";
import { CanActivateFn, Router } from "@angular/router";
import { AuthPort } from "../../shared/auth/application/ports/auth.port";
import { AuthStateManager } from "../../shared/auth/state-manager/auth-state.service";
import { GetProfileUseCase } from "../../shared/auth/application/use-cases/get-profile.use-case";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthStateManager);
  const getProfileUseCase = inject(GetProfileUseCase);
  const router = inject(Router);

  // Caso 1: La sesión ya existe en caché (memoria), pasa directo sin llamar a la API
  if (authState.session()) {
    return true;
  }

  // Activamos el estado de carga global por si tu UI quiere mostrar un Spinner
  authState.setLoading(true);

  // Caso 2: No hay sesión en caché (ej: el usuario recargó la página)
  // Llamamos al caso de uso de perfil para intentar recuperar la sesión
  return getProfileUseCase.execute().pipe(
    map((sessionData) => {
      // Si el backend responde con la sesión válida, la guardamos en caché
      authState.setSession(sessionData);
      authState.setLoading(false);
      return true; // Permitimos el acceso a la ruta
    }),
    catchError((err) => {
      // Si la API falla (401 Unauthorized, etc.), limpiamos el estado y redirigimos
      authState.setSession(null);
      authState.setLoading(false);

      // Retornamos un UrlTree para redirigir al login de forma segura en Angular
      return of(router.createUrlTree(['/auth/login']));
    })
  );
};