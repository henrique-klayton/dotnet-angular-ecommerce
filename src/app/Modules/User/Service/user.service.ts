import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { formatFirebaseDate } from 'src/app/util/functions';
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

    public fetchUserById(id: string): Observable<UserModel> {
        return this._firestore.collection<UserModel>("Users").doc(id).get().pipe(
            map(u => new UserModel({id, ...u.data()}))
        );
    }

    public insertUser(obj: UserModel): Promise<void> {
        obj.birthday = formatFirebaseDate(obj.birthday);
        return this._firestore.collection("Users").doc().set(obj);
    }
    
    public deleteUser(id: string): Promise<void> {
        return this._firestore.collection("Users").doc(id).delete();
    }
    
    public updateUser(id: string, obj: UserModel): Promise<void> {
        console.log("updateUser()", obj);
        obj.birthday = formatFirebaseDate(obj.birthday);
        return this._firestore.collection("Users").doc(id).set(obj);
    }
}