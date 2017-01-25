import { DashboardCanActivateGuard } from './app.guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { LoginModule } from './login/login.module';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    LoginModule,
    SharedModule
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  providers: [DashboardCanActivateGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }