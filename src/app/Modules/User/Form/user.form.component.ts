import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidationService } from 'src/app/shared/service/form.service';
import { UserModel } from '../Model/user.model';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user.form.component.html',
  styleUrls: ['./user.form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public hide: boolean = true;

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public _formValidation: FormValidationService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: string
  ) {}

  public saveUser() {
    const obj: UserModel = this.form.value;
    if (!obj.id) {
      return this._userService
        .insertUser(obj)
        .then(() => {
          this.dialogRef.close();
          this._snackBar.open('Usuário cadastrado com sucesso!', "Fechar");
        })
        .catch(() => this._snackBar.open('Erro ao cadastrar o usuário!', "Fechar"));
    } else {
      return this._userService
        .updateUser(obj)
        .then(() => {
          this.dialogRef.close();
          this._snackBar.open('Usuário atualizado com sucesso!', "Fechar");
        })
        .catch(() =>
          this._snackBar.open('Erro ao atualizar os dados do usuário!', "Fechar");
        );
    }
  }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this._fb.group(new UserModel());
    if (this.data) {
      this._userService
        .fetchUserById(this.data)
        .subscribe((u) => this.form.patchValue(u));
    }
  }
}
