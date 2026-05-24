import { Component,  OnInit, signal } from "@angular/core";
import { environment } from "../../../../../../environments/environment.development";
import type { CredentialResponse } from 'google-one-tap';

declare const google: any;
@Component({
  templateUrl:'./auth-page.component.html',
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    
  ],  
})
export class AuthPageComponent implements OnInit {
  public isGoogleSdkLoaded = signal(false);

  ngOnInit(): void {
    this.loadGoogleScript();
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
    const interval = setInterval(() => {
      if (typeof window.google !== 'undefined' && window.google?.accounts) {
        clearInterval(interval);
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
    console.log('TokenID capturado:', idToken);
  }
}