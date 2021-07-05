export class UserModel {
    name: string = undefined;
    password: string = undefined;
    email: string = undefined;
    phone: string = undefined;
    complement: string = undefined;
    cep: string = undefined;
    birthday: Date = undefined;
    
    constructor(init?: Partial<UserModel>) {
        // Mapeia os atributos em comum de init na classe
        Object.assign(this, init);
    }
}