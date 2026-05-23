import { Routes } from '@angular/router';
import { AuthPageComponent } from './core/shared/auth/ui/page/auth-page.component';
import { LandingLayoutComponent } from './landing/layout/landing-layout.component';

export const routes: Routes = [
    {
        path: '',
        component:LandingLayoutComponent
    },
    {
        path: 'auth',
        component: AuthPageComponent,
        
    }
];
