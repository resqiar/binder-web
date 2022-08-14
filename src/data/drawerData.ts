import type { SvelteComponentTyped } from 'svelte';
import IndexBody from '../components/body/IndexBody.svelte';
import IndexHeader from '../components/header/IndexHeader.svelte';
import CreateExtHeader from '../components/header/CreateExtHeader.svelte';
import EditExtHeader from '../components/header/EditExtHeader.svelte';
import CreateExtensionBody from '../components/body/CreateExtensionBody.svelte';
import EditExtensionBody from '../components/body/EditExtensionBody.svelte';

import DashboardIcon from '../components/icons/DashboardIcon.svelte';
import CreateExtIcon from '../components/icons/CreateExtIcon.svelte';
import EditExtIcon from '../components/icons/EditExtIcon.svelte';

export interface IDrawerData {
	id: number;
	title: string;
	header: new (...args: any) => SvelteComponentTyped;
	component: new (...args: any) => SvelteComponentTyped;
	icon: new (...args: any) => SvelteComponentTyped;
}

export const drawerData: IDrawerData[] = [
	{
		id: 0,
		title: 'Dashboard',
		header: IndexHeader,
		component: IndexBody,
		icon: DashboardIcon
	},
	{
		id: 1,
		title: 'Create Extensions',
		header: CreateExtHeader,
		component: CreateExtensionBody,
		icon: CreateExtIcon
	},
	{
		id: 2,
		title: 'Edit Extensions',
		header: EditExtHeader,
		component: EditExtensionBody,
		icon: EditExtIcon
	}
];
