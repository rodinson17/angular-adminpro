import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

/*import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgessComponent } from './pages/progess/progess.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component'; */

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    /* LoginComponent,
    RegisterComponent, */
    /* BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent, */
    /* DashboardComponent, se lleva para pagesModule
    ProgessComponent,
    Grafica1Component,
    PagesComponent */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
