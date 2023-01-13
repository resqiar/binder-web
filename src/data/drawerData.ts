export interface IDrawerData {
	id: number;
	title: string;
	href: string;
}

export const drawerData: IDrawerData[] = [
	{
		id: 0,
		title: 'Dashboard',
		href: '/'
	},
	{
		id: 1,
		title: 'Create Extensions',
		href: '/create'
	},
	{
		id: 2,
		title: 'Edit Extensions',
		href: '/edit'
	}
];
