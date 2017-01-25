import { SharedModule } from './../shared/shared.module';

import {RegisterComponent} from './register/register.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login.routing';


@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        LoginRoutingModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        LoginComponent, 
        RegisterComponent
    ],
    providers: []
})
export class LoginModule {}