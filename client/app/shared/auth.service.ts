import { CookieService } from 'angular2-cookie';
import { AppConfig } from './../app-config';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthSerivce {

    private username: string;
    private email: string;
    readonly authUrl: string = '/auth';
    private isLoggedIn: boolean = false;
    
    constructor(private http: Http, 
        private userService: UserService, 
        private cookieService: CookieService,
        private appConfig: AppConfig) {}

    isUserLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    login (email: string, password: string, rememberMe: boolean) {
        let self = this;
        let loginUrl: string = this.authUrl + '/login';

        return self.http.post(loginUrl, {email, password})
            .map((res:Response) => res.json())
            .map((res) => {
                self.isLoggedIn = res.status;
                if(self.isLoggedIn) {
                    self.userService.setUser(res.username, res.email)
                }
                if(rememberMe) {
                    self.cookieService.put(self.appConfig.COOKIE_KEY, "user-logged-in", {
                        expires: new Date(Date.now() + self.appConfig.COOKIE_TTL)
                    });
                }
                return self.isLoggedIn;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    register(email: string, username: string, password: string) {
        let self = this;
        let loginUrl: string = this.authUrl + '/register';

        return self.http.post(loginUrl, {email, username, password})
            .map((res:Response) => res.json())
            .map((res) => {
                self.isLoggedIn = res.status;
                if(self.isLoggedIn) {
                    self.userService.setUser(res.username, res.email)
                }
                return self.isLoggedIn;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout() {
        let self = this;
        let logoutUrl: string = this.authUrl + '/logout';

        return self.http.post(logoutUrl, {})
            .map((res:Response) => res.json())
            .map((res) => {
                if(res.status) {
                    self.isLoggedIn = false;
                    self.userService.setUser(res.username, res.email);
                    self.cookieService.remove(self.appConfig.COOKIE_KEY);
                }
                
                return res;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUserDetails() {
        let self = this;
        let getUserUrl: string = '/api/user/details';

        return self.http.get(getUserUrl)
            .map((res:Response) => res.json())
            .map((res) => {
                if(res.status) {
                    self.isLoggedIn = true;
                    self.userService.setUser(res.username, res.email);
                }
                
                return res.status;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}