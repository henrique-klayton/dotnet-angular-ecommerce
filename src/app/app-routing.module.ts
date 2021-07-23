import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const redirectUnauthorizedUsers = () => redirectUnauthorizedTo(['login']);
const redirectLoggedUsers = () => redirectLoggedInTo(['home']);

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate: [AngularFireAuthGuard],
		data: {
			authGuardPipe: redirectUnauthorizedUsers
		},
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
			{
				path: 'vendas',
				loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule)
			},
			// {
			// 	path: 'carrinho',
			// 	loadChildren: () => import('./modules/sales/sales.module').then(m => m.CartModule)
			// }
		]
	},
	{
		path: 'login',
		component: AuthComponent,
		data: {
			authGuardPipe: redirectLoggedUsers
		},
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
