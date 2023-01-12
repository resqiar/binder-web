<script lang="ts">
	import type { IExtDetail } from 'src/types/detail-ext';
	import type { PageData } from './$types';
	import DetailHeader from '../../../components/header/DetailHeader.svelte';
	import DetailBody from '../../../components/body/DetailBody.svelte';

	/**
	 * This data is coming from the SSR process (server),
	 * As of 1.0, the data coming from the server is in single the type
	 * of PageData so we need to get the actual EXT data inside.
	 * @see https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707
	 **/
	export let data: PageData;
	let ext: IExtDetail = data.data;
</script>

<svelte:head>
	<title>{ext.id ? `(${ext.id})` : ''} {ext.title ?? '404 Not Found'} | Binder</title>
	<meta name="description" content={ext.description ?? ''} />
</svelte:head>

<!-- Detail Header -->
<DetailHeader />

<!-- Detail Body -->
{#if ext.statusCode !== 404}
	<DetailBody data={ext} />
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
