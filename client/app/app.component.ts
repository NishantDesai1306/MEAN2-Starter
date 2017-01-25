import { Router } from '@angular/router';
import { AuthSerivce } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    username: string;
    userService: UserService;
    authService: AuthSerivce;
    router: Router;

    constructor(userService: UserService, authService: AuthSerivce, router: Router) {
        this.userService = userService;
        this.authService = authService;
        this.router = router;

        this.username = '';
    }

    ngOnInit() {
        var self = this;
        self.userService.getUser().subscribe(function(newUser) {
            self.username = newUser.getUsername();
        });
    }

    logout() {
        var self = this;
        self.authService
         .logout()
         .subscribe((data) => {
             if(data.status) {
                self.router.navigateByUrl('/login')
             }
             else {
                 console.error(data.reason);
             }
         }, (err) => {
             console.error(err);
         });  
    }
 }