import { UserService } from './user.service';
import { AuthSerivce } from './auth.service';
import { NgModule } from '@angular/core';
import { CookieService } from 'angular2-cookie';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [UserService, AuthSerivce, CookieService],
})
export class SharedModule { }
