import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from './Form/user.form.component';
import { UserModel } from './Model/user.model';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = [
    "id",
    "name",
    "password",
    "email",
    "phone",
    // "complement",
    // "cep",
    // "birthday",
    "actions",
  ];
  public dataSource: MatTableDataSource<UserModel>;

  constructor(private _userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUser();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: "Cadastro"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public getUser() {
    return this._userService.fetchData().subscribe(res => this.dataSource.data = res);
  }

  public deleteUser(id: string) {
    this._userService.deleteUser(id);
  }

  public applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
