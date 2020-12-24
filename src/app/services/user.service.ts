import { UserLoginInfo } from './../interfaces/user-login-infos';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    private user: UserLoginInfo;
    private userSubject: BehaviorSubject<UserLoginInfo>;
    user$: Observable<UserLoginInfo>;

    constructor() {
        this.userSubject = new BehaviorSubject<UserLoginInfo>(this.user);
        this.user$ = this.userSubject.asObservable();
    }

    setUser(user: UserLoginInfo){
        this.user = user;
        this.userSubject.next(this.user);
    }

    // emitUser(){
    //     this.userSubject.next(this.user);
    // }
}
