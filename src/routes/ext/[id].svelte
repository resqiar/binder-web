<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';
	export async function load({ params, fetch }: LoadEvent) {
		const id = params.id;
		const response = await fetch(`${import.meta.env.VITE_SERVER}/ext/${id}`);
		const data = await response.json();

		return {
			props: {
				data: data,
				id: id
			}
		};
	}
</script>

<script lang="ts">
	import DetailHeader from '../../components/header/DetailHeader.svelte';
	import type { IExtDetail } from 'src/types/detail-ext';
	import DetailBody from '../../components/body/DetailBody.svelte';

	export let data: IExtDetail;
	export let id: number;
</script>

<svelte:head>
	<title>({id}) {data.title ?? '404 Not Found'} | Binder</title>
	<meta name="description" content={data.description ?? ''} />
</svelte:head>

<!-- Detail Header -->
<DetailHeader />

<!-- Detail Body -->
{#if data.statusCode !== 404}
	<DetailBody {data} />
{:else}
	<main class="flex w-full justify-center px-4 py-8">
		<div class="alert alert-error shadow-lg lg:w-6/12">
			<div class="flex w-full gap-4">
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
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<div class="flex flex-col">
					Not Found!
					<span>Check again your id and <a href="/" class="link">try again</a>.</span>
				</div>
			</div>
		</div>
	</main>
{/if}
