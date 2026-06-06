import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
    title: 'Ochi Jewelry — Fine Jewelry & Expert Repair',
  },
  {
    path: 'collections',
    loadComponent: () => import('./pages/collections/collections').then(m => m.CollectionsComponent),
    title: 'Collections | Ochi Jewelry',
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent),
    title: 'Services | Ochi Jewelry',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'About Us | Ochi Jewelry',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent),
    title: 'Contact Us | Ochi Jewelry',
  },
  {
    path: 'brand',
    loadComponent: () => import('./pages/brand/brand').then(m => m.BrandComponent),
    title: 'Brand Guidelines | Ochi Jewelry',
  },
  { path: '**', redirectTo: '' },
];
