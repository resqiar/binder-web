<script lang="ts">
	import { onMount } from 'svelte';
	import { getBatch } from '../lib/getBatch';
	import type { IExtension } from '../types/extension';
	import BottomDrawer from '../components/drawers/BottomDrawer.svelte';
	import IndexHeader from '../components/header/IndexHeader.svelte';
	import IndexBody from '../components/body/IndexBody.svelte';
	import MainDrawer from '../components/drawers/MainDrawer.svelte';

	let data: IExtension[] = [];
	let page: number = 0;
	let full: boolean = false;

	let initialLoading: boolean = true;
	let loadLoading: boolean = false;

	let errorMessage: string | undefined;

	onMount(async () => {
		try {
			data = await getBatch(page);
		} catch (error) {
			errorMessage = error as string;
		}
		initialLoading = false;
	});

	async function handleLoadMore() {
		const tempPage = (page + 1) * 9;

		loadLoading = true;
		errorMessage = undefined;

		try {
			const result: IExtension[] = await getBatch(tempPage);

			if (result.length === 0) {
				loadLoading = false;
				return (full = true);
			}

			result.forEach((value) => {
				data = [...data, value];
			});

			loadLoading = false;
			page++;
		} catch (error) {
			loadLoading = false;
			errorMessage = error as string;
		}
	}
</script>

<svelte:head>
	<title>Binder</title>
</svelte:head>

<MainDrawer activeIndex={0}>
	<!-- HEADER -->
	<header>
		<IndexHeader />
	</header>

	<!-- BODY -->
	<main>
		<IndexBody {data} {initialLoading} {loadLoading} loadMoreEmpty={full} {handleLoadMore} />
	</main>

	<!-- DEDICATED ERROR ALERT -->
	{#if errorMessage}
		<!-- ERROR ALERT -->
		<div class="-mt-[100px] flex w-full justify-center py-4 px-8">
			<div class="alert alert-error shadow-lg lg:w-6/12">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
						/>
					</svg>
					<span>{errorMessage}</span>
				</div>
			</div>
		</div>
	{/if}
</MainDrawer>

<!-- BOTTOM DRAWER (MOBILE ONLY) -->
<BottomDrawer activeIndex={0} />
