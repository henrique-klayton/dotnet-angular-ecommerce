import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  
  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string | {result: true, data: string}
  ) {}

  public saveUser() {
    this.dialogRef.close("Usuário cadastrado no banco!");
    return this._userService.insertUser(this.form.value);
  }

  ngOnInit(): void {
    this.form = this._fb.group(new UserModel());
  }
}
