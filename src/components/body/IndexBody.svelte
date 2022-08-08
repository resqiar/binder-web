<script lang="ts">
	import type { IExtension } from 'src/types/extension';
	import SearchInput from '../input/SearchInput.svelte';
	import CardSkeleton from '../skeleton/CardSkeleton.svelte';

	async function getData() {
		const response = await fetch('http://localhost:5000/ext');

		if (response.ok) {
			const data: IExtension[] = await response.json();
			return data;
		} else {
			throw new Error('500 Internal Server Error');
		}
	}

	let promise: Promise<IExtension[]> = getData();
</script>

<main class="lg:px-12">
	<div class="flex w-full justify-center py-8 lg:px-12">
		<!-- Search Box -->
		<SearchInput />
	</div>

	<section class="flex flex-col items-center justify-evenly gap-8 px-2 md:flex-row">
		{#await promise}
			<!-- LOADING SKELETON -->
			{#each [...new Array(3)] as _v}
				<CardSkeleton />
			{/each}
		{:then data}
			<div class="px-4 w-full">
				<!-- ITEM DATA -->
				{#each data as value}
					<div
						class="card w-full lg:w-96 bg-base-100 shadow-2xl border-slate-400 border border-solid"
					>
						{#if value.image_url}
							<figure>
								<img src={value.image_url} alt="a" />
							</figure>
						{/if}
						<div class="card-body">
							<div class="flex items-center gap-2">
								<div class="badge badge-secondary">{value.id}</div>
								<h2 class="card-title">{value.title}</h2>
							</div>
							<p>{value.description ?? 'No description'}</p>
						</div>
					</div>
				{/each}
			</div>
		{:catch error}
			<!-- ERROR ALERT -->
			<div class="flex w-full justify-center py-4 px-8">
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
						<span>{error.message}</span>
					</div>
				</div>
			</div>
		{/await}
	</section>
</main>
