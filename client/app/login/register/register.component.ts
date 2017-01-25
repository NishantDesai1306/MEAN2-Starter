import { Router } from '@angular/router';
import { AuthSerivce } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    user: any = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    }
    error: string = "";

    constructor(private authServie: AuthSerivce, private router: Router) { }

    register() {
        let self = this;
        self.error = "";

        if(self.user.password === self.user.confirmPassword) {
            self.authServie
            .register(self.user.email, self.user.username, self.user.password)
            .subscribe((isSuccessfull) => {
                if(isSuccessfull) {
                    self.router.navigateByUrl('/dashboard')
                }
                else {
                    console.error('error occurred while login');
                }
            }, (err) => {
                console.log(err);
                self.error = err;
            });  
        }
        else {
            self.error = "Password and Confirm Password must match";
        }
    }

    ngOnInit() { }
}