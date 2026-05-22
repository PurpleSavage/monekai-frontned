import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth/ui/layouts/auth-layout.component';
import { LandingLayoutComponent } from './landing/layout/landing-layout.component';

export const routes: Routes = [
    {
        path: '',
        component:LandingLayoutComponent
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        
    }
];
