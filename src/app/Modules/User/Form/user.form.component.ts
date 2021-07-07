import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data?: string
  ) {}

  public saveUser() {
    const obj: UserModel = this.form.value;
    if (obj.id == null) {
      return this._userService.insertUser(obj);
    } else {
      const res = this._userService.updateUser(obj);
      res.then((r) => console.log(r)).catch((e) => console.error(e));
      return res;
    }
  }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this._fb.group(new UserModel());
    if (this.data != null) {
      this._userService
        .fetchUserById(this.data)
        .subscribe((u) => this.form.patchValue(u));
    }
  }
}
