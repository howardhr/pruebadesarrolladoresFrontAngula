import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { MinComponent } from './layouts/min.component';
import { DashboardLayoutComponent } from './layouts/dashboardlayout.component';
import { HeaderComponent } from './layouts/parts/header.component';
import { SidebarComponent } from './layouts/parts/sidebar.component';
import { SidebaritemComponent, SidebaritemInnerComponent } from './layouts/parts/sidebaritem.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from '../../src/app/core/services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MinComponent,
    DashboardLayoutComponent,
    SidebaritemComponent,
	SidebaritemInnerComponent,
    BlankPageComponent,
    DashboardComponent,
   
    ErrorComponent,
   
  ],
  imports: [
   
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Tiempo de duración de las notificaciones (en milisegundos)
      positionClass: 'toast-top-right', // Posición de las notificaciones
      preventDuplicates: true, // Evita que se muestren notificaciones duplicadas
      closeButton: true // Muestra un botón de cierre en las notificaciones
    })
    
   
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
