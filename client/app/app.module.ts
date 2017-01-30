import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './dashboard/user/user.component';
import { MainComponent } from './dashboard/main/main.component';
import { DashboardCanActivateGuard } from './app.guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { NgModule, OpaqueToken }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';
import { AppConfig } from './app-config';

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
    SharedModule,
    FormsModule,
    DropdownModule.forRoot()
  ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    DashboardComponent,
    MainComponent,
    UserComponent,
    ChangePasswordComponent
  ],
  providers: [
    DashboardCanActivateGuard,
    AppConfig
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }