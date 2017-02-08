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
    NgUploaderModule
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
  bootstrap:    [ AppComponent ]
})
export class AppModule { }