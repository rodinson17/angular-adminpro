import { PagesRoutingModule } from './pages/pages.routing';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

import { NotFoundComponent } from './not-found/not-found.component';

/* import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { ProgessComponent } from './pages/progess/progess.component'; */

const routes: Routes = [
  /* { path: '',  se pasa a pages routing ts
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgessComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }, */

  /* { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, */

  // path: '/dashboard' PagesRoutong
  // path: '/auth' AuthRoutong
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
