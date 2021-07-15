import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/service/auth.service';
import { formatFirebaseDate } from 'src/app/util/functions';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    private _firestore: AngularFirestore,
    private _authService: AuthService
  ) {}

  public fetchData(): Observable<UserModel[]> {
    return this._firestore
      .collection<UserModel>('Users')
      .valueChanges({ idField: 'id' });
  }

  public fetchUserById(id: string): Observable<UserModel> {
    return this._firestore
      .collection<UserModel>('Users')
      .doc(id)
      .get()
      .pipe(map((u) => u.data()));
  }

  public insertUser(obj: UserModel): Promise<void> {
    obj.birthday = formatFirebaseDate(obj.birthday);
    return this._firestore
      .collection('Users')
      .doc()
      .set(obj)
      .then(() => {
        this._authService.register(obj.email, obj.password);
      });
  }

  public deleteUser(id: string): Promise<void> {
    return this._firestore.collection('Users').doc(id).delete();
  }

  public updateUser(id: string, obj: UserModel): Promise<void> {
    obj.birthday = formatFirebaseDate(obj.birthday);
    return this._firestore.collection('Users').doc(id).set(obj);
  }
}
