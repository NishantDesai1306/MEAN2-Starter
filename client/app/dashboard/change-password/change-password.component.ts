import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    user: any = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''        
    };
    error: string = '';

    constructor(private userService: UserService) {}

    changePassword() {
        var self = this;
        self.error = '';
        if(!self.user.oldPassword) {
            return self.error = 'Old Password can`t be empty';
        }
        if(!self.user.newPassword) {
            return self.error = 'New Password can`t be empty';
        }
        if(self.user.newPassword !== self.user.confirmNewPassword) {
            return self.error = 'New Password and Confirm New Password must match';
        }

        self.userService
            .changePassword(self.user.oldPassword, self.user.newPassword)
            .subscribe(res => {
                if(res.status) {

                }
                else {
                    this.error = res.reason;
                }
            });
    }

    ngOnInit() {
        var self = this;
        self.userService.getUser().subscribe(user => {
            self.user = user;
        });
     }
}