import { Routes } from '@angular/router';
import { AuthPageComponent } from './core/shared/auth/ui/page/auth-page.component';
import { LandingLayoutComponent } from './landing/layout/landing-layout.component';
import { ProtectedLayoutComponent } from './core/shared/common/ui/layouts/protected-layout/protected-layout.component';
import { authGuard } from './core/framewrok-utilities/guards/auth.guard';

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
    canActivate: [authGuard],
    children: [
      {
        path: 'sampler',
        loadComponent: () => import('./core/sampler/ui/pages/sampler-page/sampler-page.component')
          .then(s => s.SamplerPageComponent) 
      },
      {
        path: 'for-you',
        loadComponent: () => import('./core/aggregates/community/ui/pages/for-you-page/for-you-page.component')
          .then(f => f.ForYouPageComponent),
        children: [
          {
            path: '',
            loadComponent: () => import('./core/aggregates/community/ui/pages/latest-shared-samples-page/latest-shared-samples-page.component')
              .then(l => l.LatestSharedSamplesPageComponent)
          },
          {
            path: 'community-shared-samples',
            loadComponent: () => import('./core/aggregates/community/ui/pages/community-shared-samples/community-shared-samples.component')
              .then(c => c.CommunitySharedSamplesComponent)
          },
          {
            path: 'community-shared-edit-samples',
            loadComponent: () => import('./core/aggregates/community/ui/pages/community-shared-edit-samples-page/community-shared-edit-samples-page.component')
              .then(c => c.CommunitySharedEditSamplesPageComponent)
          },
        ]
      },
      {
        path: 'billing',
        loadComponent: () => import('./core/payments/ui/pages/payments-page/payments-page.component')
          .then(p=>p.PaymentsPageComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./core/account/ui/pages/account-info/account-info.component')
          .then(a=>a.AccountInfoComponent)
      },
    ]
  }
];
