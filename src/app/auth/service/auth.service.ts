import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebaseEmail, firebasePassword } from 'src/keys/firebase.key';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _fireAuth: AngularFireAuth) {}

    public login() {
        this._fireAuth.signInWithEmailAndPassword(firebaseEmail, firebasePassword);
    }
}