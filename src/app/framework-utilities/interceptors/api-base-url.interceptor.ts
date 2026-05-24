import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo aplica si la URL no es absoluta (no empieza con http)
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${environment.backendUrl}${req.url}`
  });

  return next(apiReq);
};