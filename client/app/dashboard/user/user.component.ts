import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    user: any;
    error: string = '';

    constructor(private userService: UserService) {}

    saveChanges() {
        var self = this;
        self.error = '';
        if(!self.user.username) {
            return self.error = 'Username can`t be empty';
        }
        if(!self.user.email) {
            return self.error = 'Email can`t be empty';
        }

        self.userService
            .changeDetails(self.user.username, self.user.email)
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