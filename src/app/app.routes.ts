import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/studios',
    pathMatch: 'full'
  },
  {
    path: 'studios',
    loadComponent: () => import('./pages/studio/studio.component').then(m => m.StudioComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking-list/booking-list.component').then(m => m.BookingListComponent)
  }
];
