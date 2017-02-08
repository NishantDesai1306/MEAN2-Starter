import {AuthSerivce} from './../shared/auth.service';

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({selector: 'login', templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    error : string;
    user : any = {
        email: "nishant",
        password: "nishant"
    };
    rememberMe : boolean = false;

    constructor(
        private authService : AuthSerivce, 
        private router : Router, 
        private route : ActivatedRoute) {}

    login() {
        let self = this;

        self.error = "";
        if (!self.user.email) {
            return self.error = "Email can't be empty"
        }
        if (!self.user.password) {
            return self.error = "Password can't be empty"
        }

        self.authService
            .login(self.user.email, self.user.password, self.rememberMe)
            .subscribe((isSuccessfull) => {
                if (isSuccessfull) {
                    self.router.navigateByUrl('/dashboard')
                } else {
                    console.error('error occurred while login');
                }
            }, (err) => {
                console.log(err);
                self.error = err;
            });
    }

    ngOnInit() {
        var self = this;

        self.route
            .queryParams
            .subscribe(params => {
                self.error = params['errorMessage'] || '';
            });

        self.authService.getUserDetails().subscribe(isSuccessfull => {
            if(isSuccessfull) {
                self.router.navigateByUrl('/dashboard');
            }
        });
    }
}