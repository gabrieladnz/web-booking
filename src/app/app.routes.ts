import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Hotel } from './pages/hotel/hotel';
import { Booking } from './pages/booking/booking';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: Dashboard
    },
    {
        path: 'hoteis',
        component: Hotel
    },
    {
        path: 'minhas-reservas',
        component: Booking
    },
    {
        path: 'contato',
        component: Contact
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];
