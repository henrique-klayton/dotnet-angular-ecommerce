import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

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

  public register(email: string, password: string) {
    return this._fireAuth.createUserWithEmailAndPassword(email, password);
  }

  public isLogged(): boolean {
    return JSON.parse(sessionStorage.getItem('user')) as boolean;
  }
}
