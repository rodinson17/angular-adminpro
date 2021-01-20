import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGuard } from './../guards/admin.guard';

import { ProfileComponent } from './profile/profile.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgessComponent } from './progess/progess.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromiseComponent } from './promise/promise.component';

// Mantenimiento
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';

const chilcRoutes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Busquedas' } },
      { path: 'progress', component: ProgessComponent, data: { title: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
      { path: 'settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: 'promises', component: PromiseComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      /* { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, */

      // Mantenimoentos
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctores' } },
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },

      // Rutas de Admin
      { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data: { title: 'Usuarios' } },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( chilcRoutes )
  ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
