import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { firebaseEmail, firebasePassword } from 'src/keys/firebase.key';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _fireAuth: AngularFireAuth) {}
  private user?: firebase.User;

  public async login(obj: { email: string; password: string }) {
    const uc = await this._fireAuth.signInWithEmailAndPassword(obj.email, obj.password);
    console.log(uc);
    this.user = uc.user;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    return uc;
  }

  public async logout() {
    const res = this._fireAuth.signOut();
    sessionStorage.setItem('user', null);
    return res;
  }

  // TODO Access sessionStorage and verify if user is logged
  public isLogged(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return !!user;
  }
}
