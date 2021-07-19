import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _fireAuth: AngularFireAuth) {}

  public login = (obj: { email: string; password: string }) => this._fireAuth.setPersistence('session')
    .then(() => this._fireAuth.signInWithEmailAndPassword(obj.email, obj.password));

  public logout = () => this._fireAuth.signOut();

  public register = (email: string, password: string) => this._fireAuth.createUserWithEmailAndPassword(email, password);

	public isLogged = () => false;
}
