import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

import { ProfileComponent } from './profile/profile.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgessComponent } from './progess/progess.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromiseComponent } from './promise/promise.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'progress', component: ProgessComponent, data: { title: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
      { path: 'settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: 'promises', component: PromiseComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      /* { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, */
    ]
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
