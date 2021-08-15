export type ISelectOptions<K> = Array<{ id: K | ''; name: string }>;

export const STATES: ISelectOptions<string> = [
	{ id: 'AC', name: 'ACRE' },
	{ id: 'AL', name: 'ALAGOAS' },
	{ id: 'AP', name: 'AMAPÁ' },
	{ id: 'AM', name: 'AMAZONAS' },
	{ id: 'BA', name: 'BAHIA' },
	{ id: 'CE', name: 'CEARÁ' },
	{ id: 'DF', name: 'DISTRITO FEDERAL' },
	{ id: 'ES', name: 'ESPÍRITO SANTO' },
	{ id: 'GO', name: 'GOIÁS' },
	{ id: 'MA', name: 'MARANHÃO' },
	{ id: 'MT', name: 'MATO GROSSO' },
	{ id: 'MS', name: 'MATO GROSSO DO SUL' },
	{ id: 'MG', name: 'MINAS GERAIS' },
	{ id: 'PR', name: 'PARANÁ' },
	{ id: 'PB', name: 'PARAÍBA' },
	{ id: 'PA', name: 'PARÁ' },
	{ id: 'PE', name: 'PERNAMBUCO' },
	{ id: 'PI', name: 'PIAUÍ' },
	{ id: 'RJ', name: 'RIO DE JANEIRO' },
	{ id: 'RN', name: 'RIO GRANDE DO NORTE' },
	{ id: 'RS', name: 'RIO GRANDE DO SUL' },
	{ id: 'RO', name: 'RONDÔNIA' },
	{ id: 'RR', name: 'RORAIMA' },
	{ id: 'SC', name: 'SANTA CATARINA' },
	{ id: 'SE', name: 'SERGIPE' },
	{ id: 'SP', name: 'SÃO PAULO' },
	{ id: 'TO', name: 'TOCANTINS' },
];

export const PRODUCT_CATEGORIES: ISelectOptions<number> = [
	{ id: '', name: 'Todas' },
	{ id: 0, name: 'Eletrodomésticos' },
	{ id: 1, name: 'Informática' },
	{ id: 2, name: 'Alimentos' }
];

export const STATUS: ISelectOptions<boolean> = [
	{ id: '', name: 'Todos' },
	{ id: true, name: 'Ativo' },
	{ id: false, name: 'Inativo' }
];

export const MONTHS: ISelectOptions<number> = [
	{ id: 0, name: 'Todos' },
	{ id: 1, name: 'Jan' },
	{ id: 2, name: 'Fev' },
	{ id: 3, name: 'Mar' },
	{ id: 4, name: 'Abr' },
	{ id: 5, name: 'Mai' },
	{ id: 6, name: 'Jun' },
	{ id: 7, name: 'Jul' },
	{ id: 8, name: 'Ago' },
	{ id: 9, name: 'Set' },
	{ id: 10, name: 'Out' },
	{ id: 11, name: 'Nov' },
	{ id: 12, name: 'Dez' }
];
