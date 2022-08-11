<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
	import { onMount } from 'svelte';
	import type { DropzoneFile } from 'src/types/dropzone';

	let mounted: boolean;
	export let accepted: DropzoneFile[] = [];
	export let preview: string;

	onMount(() => {
		// Wait lifecycle to fully mounted before render
		// the whole component's tree. this because
		// svelte-file-dropzone still has issue w/SSR.
		mounted = true;
	});
</script>

{#if mounted}
	<div class="py-2">
		<label class="label flex" for="drag-image-input">
			<span class="label-text">Optional Image (png, jpeg, and jpg)</span>

			{#if preview}
				<!-- DISCARD IMAGE -->
				<button on:click class="btn btn-ghost btn-sm flex items-center gap-2 normal-case">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					Discard
				</button>
			{/if}
		</label>

		{#if preview}
			<div class="py-2 pb-8">
				<!-- IMAGE PREVIEW -->
				<div class="relative">
					<img
						src={preview}
						alt="preview media"
						class="h-[500px] w-full object-cover"
						height="300"
						width="300"
					/>
					<label
						for="my-modal"
						class="modal-button absolute top-0 left-0 right-0 bottom-0 z-10 cursor-pointer"
					/>
				</div>
			</div>

			<!-- ZOOM IMAGE MODAL -->
			<input type="checkbox" id="my-modal" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box relative p-0">
					<label for="my-modal" class="btn btn-circle btn-sm absolute right-2 top-2 shadow-xl"
						>✕</label
					>
					<img src={preview} alt="fullscreen media" />
				</div>
			</div>
		{/if}

		<!-- DROP IMAGE ZONE -->
		<Dropzone
			id="drag-image-input"
			containerClasses="cursor-pointer"
			accept="image/png,image/jpg,image/jpeg"
			multiple={false}
			on:drop
		/>

		<!-- FILE NAME  -->
		{#each accepted as item}
			<p class="pt-4">{item.name}</p>
		{/each}
	</div>
{/if}
