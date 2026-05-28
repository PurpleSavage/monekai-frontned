import { Component,  DestroyRef,  inject,  OnInit, signal } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import type { CredentialResponse } from 'google-one-tap';
import { LoginWithGoogleUseCase } from "../../application/use-cases/login-with-google.use-case";
import { Router } from "@angular/router";
import { AuthStateManager } from "../../state-manager/auth-state.service";
import { AppBaseError } from "../../../common/infrastructure/http-errors/app-base.error";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";


declare const google: any;
@Component({
  templateUrl:'./auth-page.component.html',
  selector: 'app-auth-layout',
  standalone: true,
})
export class AuthPageComponent implements OnInit {
  private loginUseCase = inject(LoginWithGoogleUseCase);
  private router = inject(Router);
  private authStatemanager = inject(AuthStateManager);
  private destroyRef = inject(DestroyRef); // <-- Inyectamos el manejador de destrucción

  public isGoogleSdkLoaded = signal(false);
  public errorAuth = signal<string>('');
  private intervalId: any; // <-- Guardamos la referencia del intervalo

  ngOnInit(): void {
    this.loadGoogleScript();

    // Nos aseguramos de limpiar Google y los intervalos cuando el componente muera
    this.destroyRef.onDestroy(() => {
      this.cleanupGoogle();
    });
  }

  private loadGoogleScript() {
    if (typeof window.google !== 'undefined' && window.google?.accounts) {
      this.initGoogleButton();
      return;
    }

    if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
      this.waitForGoogle();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => this.waitForGoogle();
    script.onerror = (err) => {
      console.error('Error al cargar el SDK de Google Auth:', err);
    };
    document.head.appendChild(script);
  }

  private waitForGoogle() {
    // Limpiamos cualquier intervalo previo por seguridad
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (typeof window.google !== 'undefined' && window.google?.accounts) {
        clearInterval(this.intervalId);
        this.initGoogleButton();
      }
    }, 50);
  }

  private initGoogleButton() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: CredentialResponse) =>
        this.handleGoogleCredential(response.credential)
    });

    const container = document.getElementById('googleBtnContainer');
    if (container) {
      google.accounts.id.renderButton(container, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        width: 320
      });
    }

    this.isGoogleSdkLoaded.set(true);
  }

  private handleGoogleCredential(idToken: string): void {
    this.loginUseCase.execute({ token: idToken })
      .pipe(
        takeUntilDestroyed(this.destroyRef) 
      )
      .subscribe({
        next: (data) => {
          this.authStatemanager.setSession(data);
          this.router.navigate(['/monekai/sampler']);
        },
        error: (err) => {
          console.error('Error to starting session with Google', err);
          if (err instanceof AppBaseError) {
            this.errorAuth.set(err.message);
          }
        }
      });
  }

  // Método dedicado a limpiar todo rastro de este componente
  private cleanupGoogle() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (typeof window.google !== 'undefined' && window.google?.accounts?.id) {
      google.accounts.id.cancel(); 
    }
  }
}