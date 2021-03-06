import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	public navList: Array<{ route: string, icon: string, label: string }> = [
		{
			route: 'home',
			icon: 'home',
			label: 'Home'
		},
		{
			route: 'usuarios',
			icon: 'person',
			label: 'Usuário'
		},
		{
			route: 'endereco',
			icon: 'place',
			label: 'Endereço'
		},
		{
			route: 'produtos',
			icon: 'category',
			label: 'Produtos'
		},
		{
			route: 'vendas',
			icon: 'storefront',
			label: 'Vendas'
		},
		{
			route: 'carrinho',
			icon: 'shopping_cart',
			label: 'Carrinho'
		}
	];
}
