import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './Service/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserFormComponent } from './Form/user.form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [UserComponent],
  providers: [UserService],
})
export class UserModule {}
