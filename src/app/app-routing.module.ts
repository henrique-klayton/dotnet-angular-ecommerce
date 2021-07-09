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
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'endereco',
        loadChildren: () => import('./modules/endereco/endereco.module').then(m => m.EnderecoModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
