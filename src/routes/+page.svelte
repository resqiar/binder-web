<script lang="ts">
	import { onMount } from 'svelte';
	import { getBatch } from '$lib/getBatch';
	import { loadMoreExt } from '$lib/loadMore';
	import type { IExtension } from '../types/extension';
	import BottomDrawer from '../components/drawers/BottomDrawer.svelte';
	import IndexHeader from '../components/header/IndexHeader.svelte';
	import IndexBody from '../components/body/IndexBody.svelte';
	import MainDrawer from '../components/drawers/MainDrawer.svelte';

	let data: IExtension[] = [];

	let page: number = 0;

	/**
	 * State to keep track of whether the current pagination
	 * is already full or not. When the state is "true",
	 * the "Load More" button should be invisible.
	 */
	let loadMoreEmpty: boolean = false;

	/**
	 * The initialLoading is the loading when the
	 * components is first mounted, and it only run once.
	 **/
	let initialLoading: boolean = true;
	/**
	 * The subsequent loading triggered by
	 * the user who want to load more extensions.
	 **/
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
		if (loadLoading) return;

		errorMessage = undefined;
		loadLoading = true;

		/**
		 * loadMoreExt is a function with the purpose of the getting a batch of extensions
		 * with skip (pagination).
		 *
		 * It takes in an object with the following properties:
		 * page: The current page number.
		 * emptyCB: A callback function that called when the result is empty.
		 * successCB: A callback function that called when success.
		 * errorCB: A callback function that called when the function encounter error.
		 **/
		await loadMoreExt({
			page: page,
			emptyCB: () => (loadMoreEmpty = true),
			successCB: (result: IExtension[]) => {
				result.forEach((value) => {
					data = [...data, value];
				});

				page++;
			},
			errorCB: (error: string) => (errorMessage = error as string)
		});

		loadLoading = false;
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
		<IndexBody {data} {initialLoading} {loadLoading} {loadMoreEmpty} {handleLoadMore} />
	</main>

	<!-- DEDICATED ERROR ALERT -->
	{#if errorMessage}
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
