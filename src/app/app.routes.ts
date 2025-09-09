// Components
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'hotel/:id',
        loadComponent: () => import('./pages/hotel-detail/hotel-detail').then(m => m.HotelDetail),
    },
    {
        path: 'hoteis',
        loadComponent: () => import('./pages/hotel/hotel').then(m => m.HotelComponent)
    },
    {
        path: 'minhas-reservas',
        loadComponent: () => import('./pages/booking/booking').then(m => m.Booking)
    },
    {
        path: 'contato',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];
