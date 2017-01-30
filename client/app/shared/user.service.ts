import { Http, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

class User {
    private username: string;
    private email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

    getUsername(): string {
        return this.username || null;
    };
    getEmail(): string {
        return this.email || null;
    }
}

@Injectable()
export class UserService {
    userBehaviousSubject: BehaviorSubject<User>;
    apiUrl: string = '/api/user';

    constructor(private http: Http) {
        this.userBehaviousSubject = new BehaviorSubject<User>(new User(null, null));
    }

    setUser(username, email) {
        this.userBehaviousSubject.next(new User(username, email));
    }

    getUser(): Observable<User> {
        return this
            .userBehaviousSubject
            .asObservable()
            .distinctUntilChanged();
    };

    changeDetails(username, email) {
        let self = this;
        let changeDetailsUrl: string = this.apiUrl + '/change-details';

        return self.http.post(changeDetailsUrl, {username, email})
            .map((res:Response) => res.json())
            .map((res) => {
                if(res.status) {
                    self.setUser(res.data.username, res.data.email);
                }
                return res;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    changePassword(oldPassword, newPassword) {
        let self = this;
        let changePasswordUrl: string = this.apiUrl + '/change-password';

        return self.http.post(changePasswordUrl, {oldPassword, newPassword})
            .map((res:Response) => res.json())
            .map((res) => {
                return res;
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}