import { UserService } from './user.service';
import { AuthSerivce } from './auth.service';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [UserService, AuthSerivce],
})
export class SharedModule { }
