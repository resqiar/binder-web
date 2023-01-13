<script lang="ts">
	import type { IExtension } from 'src/types/extension';
	import SearchInput from '../input/SearchInput.svelte';
	import CardSkeleton from '../skeleton/CardSkeleton.svelte';

	export let handleLoadMore: (e: any) => void;
	export let loadMoreEmpty: boolean = false;
	export let data: IExtension[];

	export let initialLoading: boolean = false;
	export let loadLoading: boolean = false;

	// search input value
	let searchInput: string;

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSearch();
		}
	}

	function handleSearch() {
		if (!searchInput) return;
		window.location.href = `/ext/${searchInput}`;
	}
</script>

<main class="lg:px-12">
	<div class="flex w-full justify-center py-8 lg:px-12">
		<!-- Search Box -->
		<SearchInput on:click={handleSearch} bind:value={searchInput} on:keyup={handleKeyUp} />
	</div>

	<section class="flex flex-col items-center justify-evenly gap-8 px-2 md:flex-row">
		<div class="flex-cols mb-12 flex w-full flex-wrap gap-4 px-2 pb-20 md:flex-row lg:mt-4">
			{#if initialLoading}
				<!-- LOADING SKELETON -->
				{#each [...new Array(3)] as _v}
					<CardSkeleton />
				{/each}
			{/if}

			<!-- ITEM DATA -->
			{#each data as value}
				<a
					href={`/ext/${value.id}`}
					class="image-full card w-full cursor-pointer shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl lg:w-96"
				>
					{#if value.image_url}
						<figure>
							<img
								src={value.image_url}
								alt={value.title}
								class="max-h-[200px] w-full object-cover"
								width="300"
								height="200"
							/>
						</figure>
					{/if}
					<div class="card-body">
						<span class="badge font-bold">{value.id}</span>
						<h2 class="card-title">{value.title}</h2>
						<p class="line-clamp-3">{value.description ?? 'No description'}</p>
					</div>
				</a>
			{/each}

			<!-- LOAD MORE BUTTON -->
			{#if data.length && !loadMoreEmpty}
				<div class="mt-8 flex w-full justify-center">
					<button on:click={handleLoadMore} class="btn-outline btn flex gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class={`h-6 w-6 ${loadLoading ? 'animate-spin' : ''}`}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
							/>
						</svg>
						Load More Extensions</button
					>
				</div>
			{/if}
		</div>
	</section>
</main>
