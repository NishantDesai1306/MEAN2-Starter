import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './dashboard/user/user.component';
import { MainComponent } from './dashboard/main/main.component';
import { DashboardCanActivateGuard } from './app.guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { NgModule, OpaqueToken, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { DropdownModule, ProgressbarModule, ModalModule } from 'ng2-bootstrap';

import { LoginModule } from './login/login.module';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    LoginModule,
    SharedModule,
    FormsModule,
    DropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    NgUploaderModule,

    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
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
    DashboardCanActivateGuard
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }