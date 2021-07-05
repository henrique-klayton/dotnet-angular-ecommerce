import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../Model/user.model';

@Injectable()
export class UserService {
    constructor(private _firestore: AngularFirestore) { }

    public fetchData(): Observable<UserModel[]> {
        return this._firestore.collection("Users").snapshotChanges().pipe(
            map((u: any) => {
                return [];
            })
        );
    }

    public insertUser(obj: UserModel): Promise<void> {
        return this._firestore.collection("Users").doc().set(obj);
    }
}