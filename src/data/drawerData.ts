import type { SvelteComponentTyped } from 'svelte';
import IndexBody from '../components/body/IndexBody.svelte';
import IndexHeader from '../components/header/IndexHeader.svelte';
import CreateExtHeader from '../components/header/CreateExtHeader.svelte';
import CreateExtensionBody from '../components/body/CreateExtensionBody.svelte';

export interface IDrawerData {
	id: number;
	title: string;
	header: new (...args: any) => SvelteComponentTyped;
	component: new (...args: any) => SvelteComponentTyped;
}

export const drawerData: IDrawerData[] = [
	{
		id: 0,
		title: 'Dashboard',
		header: IndexHeader,
		component: IndexBody
	},
	{
		id: 1,
		title: 'Create Extensions',
		header: CreateExtHeader,
		component: CreateExtensionBody
	}
];
