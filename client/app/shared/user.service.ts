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

    constructor() {
        this.userBehaviousSubject = new BehaviorSubject<User>(new User(null, null));
    }

    setUser(username, email) {
        console.log('settings new user', username, email);
        this.userBehaviousSubject.next(new User(username, email));
    }

    getUser(): Observable<User> {
        return this
            .userBehaviousSubject
            .asObservable()
            .distinctUntilChanged();
    };
}