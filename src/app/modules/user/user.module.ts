import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserService } from './service/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './form/user.form.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
	declarations: [UserComponent, UserFormComponent],
	imports: [
		CommonModule,
		UserRoutingModule,
		AngularFirestoreModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	exports: [UserComponent],
	providers: [UserService],
})
export class UserModule {}
