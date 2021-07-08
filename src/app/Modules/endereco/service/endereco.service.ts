import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AddressModel } from "../model/address.model";

@Injectable()
export class EnderecoService {
    constructor(private _firestore: AngularFirestore) {}

    public fetchData(): Observable<AddressModel[]> {
        return this._firestore.collection<AddressModel>("Enderecos").valueChanges();
    }
    
    public fetchAddressByCep(cep: string): Observable<AddressModel> {
        return this._firestore.collection<AddressModel>("Enderecos").doc(cep).get().pipe(
            map(u => new AddressModel(u.data()))
        );
    }

    public insertOrUpdateAddress(obj: AddressModel): Promise<void> {
        return this._firestore.collection("Endereco").doc(obj.cep).set(obj);
    }

    public deleteAddress(cep: string): Promise<void> {
        return this._firestore.collection("Endereco").doc(cep).delete();
    }
}