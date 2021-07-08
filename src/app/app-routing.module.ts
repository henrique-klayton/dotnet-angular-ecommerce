import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('./Modules/User/user.module').then(m => m.UserModule)
      },
      {
        path: 'endereco',
        loadChildren: () => import('./Modules/endereco/endereco.module').then(m => m.EnderecoModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
