import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './Form/user.form.component';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private _userService: UserService, public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: "Cadastro"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  public getUser() {
    console.log("getUser()")
    return this._userService.fetchData().subscribe(res => console.log(res));
  }

  ngOnInit(): void {}
}
