import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        redirectTo: ''
      },
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
  {
    path: 'login',
    component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
