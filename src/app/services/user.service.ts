import { UserLoginInfo } from './../interfaces/user-login-infos';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    private user: UserLoginInfo;
    userSubject = new Subject<UserLoginInfo>();

    constructor() {
    }

    setUser(user: UserLoginInfo){
        this.user = user;
    }

    emitUser(){
        this.userSubject.next(this.user);
    }
}
