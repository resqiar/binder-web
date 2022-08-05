import type { SvelteComponentTyped } from 'svelte';
import IndexBody from '../components/body/IndexBody.svelte';
import CreateExtensionBody from '../components/body/CreateExtensionBody.svelte';

export interface IDrawerData {
	id: number;
	title: string;
	component: new (...args: any) => SvelteComponentTyped;
}

export const drawerData: IDrawerData[] = [
	{
		id: 0,
		title: 'Dashboard',
		component: IndexBody
	},
	{
		id: 1,
		title: 'Create Extensions',
		component: CreateExtensionBody
	}
];
