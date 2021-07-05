import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserModel } from './Model/user.model';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public form: FormGroup;

  constructor(private _userService: UserService, private _fb: FormBuilder) { }

  public getUser() {
    return this._userService.fetchData();
  }

  public saveUser() {
    return this._userService.insertUser(this.form.value);
  }

  ngOnInit(): void {
    this.form = this._fb.group(new UserModel())
  }

}
