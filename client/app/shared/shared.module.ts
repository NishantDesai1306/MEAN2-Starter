import { UserService } from './user.service';
import { AuthSerivce } from './auth.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotificationService } from './notification.service';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [MaterialModule],
    exports: [],
    declarations: [],
    providers: [UserService, AuthSerivce, NotificationService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
