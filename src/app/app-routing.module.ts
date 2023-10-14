import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'denied',
    loadChildren: () => import('./pages/denied/denied.module').then( m => m.DeniedPageModule)
  },
  {
    path: 'granted',
    loadChildren: () => import('./pages/granted/granted.module').then( m => m.GrantedPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'recovery2',
    loadChildren: () => import('./pages/recovery2/recovery2.module').then( m => m.Recovery2PageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'qrreader',
    loadChildren: () => import('./pages/qrreader/qrreader.module').then( m => m.QrreaderPageModule)
  },
  {
    path: 'qr-info',
    loadChildren: () => import('./pages/qr-info/qr-info.module').then( m => m.QrInfoPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
