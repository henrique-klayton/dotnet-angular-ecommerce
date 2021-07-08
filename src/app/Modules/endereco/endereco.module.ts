import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoComponent } from './endereco.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    MaterialModule
  ]
})
export class EnderecoModule { }
