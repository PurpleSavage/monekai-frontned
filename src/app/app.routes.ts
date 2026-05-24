import { Routes } from '@angular/router';
import { AuthPageComponent } from './core/shared/auth/ui/page/auth-page.component';
import { LandingLayoutComponent } from './landing/layout/landing-layout.component';
import { ProtectedLayoutComponent } from './core/shared/common/ui/layouts/protected-layout/protected-layout.component';

export const routes: Routes = [
  {
    path: '',
    component:LandingLayoutComponent
  },
  {
    path: 'auth/login',
    component: AuthPageComponent,
  },
  { 
    path: 'monekai',
    component: ProtectedLayoutComponent,
    children: [
      {
        path: 'sampler',
        loadComponent: () => import('./core/sampler/ui/pages/sampler-page/sampler-page.component')
          .then(s => s.SamplerPageComponent) 
      },
      {
        path: 'for-you',
        loadComponent: () => import('./core/aggregates/community/ui/pages/for-you-page/for-you-page.component')
          .then(f => f.ForYouPageComponent)
      }
    ]
  }
];
