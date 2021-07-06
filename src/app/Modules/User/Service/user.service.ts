import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../Model/user.model';

@Injectable()
export class UserService {
    constructor(private _firestore: AngularFirestore) { }

    // public fetchData(): Observable<UserModel[]> {
    //     console.log("fetch");
    //     return this._firestore.collection<UserModel>("Users").snapshotChanges().pipe(
    //         map(actions => actions.map(u => {
    //             // console.log(actions);
    //             const data = u.payload.doc.data();
    //             // console.log("teste", data);
    //             const id = u.payload.doc.id;
    //             return new UserModel({id, ...data});
    //         }))
    //     );
    // }

    public fetchData(): Observable<UserModel[]> {
        console.log("test");
        return this._firestore.collection<UserModel>("Users").valueChanges({ idField: "id"});
    }

    public insertUser(obj: UserModel): Promise<void> {
        return this._firestore.collection("Users").doc().set(obj);
    }

    public deleteUser(id: string) {
        return this._firestore.collection("Users").doc(id).delete()
    }

    updateUser(id: string) {}
}