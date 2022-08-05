<script lang="ts">
	import type { DropzoneFile } from '../../types/dropzone';
	import Dropzone from 'svelte-file-dropzone';
	import { onMount } from 'svelte';

	let mounted: boolean;
	let accepted: DropzoneFile[] = [];
	let preview: string;

	function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles } = e.detail;
		accepted = acceptedFiles;
	}

	function handleFilesRemove() {
		accepted = [];
		URL.revokeObjectURL(preview);
		preview = '';
	}

	$: if (accepted[0]) {
		const objectUrl = URL.createObjectURL(accepted[0]);
		preview = objectUrl;
	}

	onMount(() => {
		mounted = true;
		return () => URL.revokeObjectURL(preview);
	});
</script>

{#if mounted}
	<div class="py-2">
		<label class="label flex" for="drag-image-input">
			<span class="label-text">Optional Image (png, jpeg, and jpg)</span>

			{#if preview}
				<button
					on:click={handleFilesRemove}
					class="btn btn-ghost btn-sm flex items-center gap-2 normal-case"
				>
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
				<img
					src={preview}
					alt="preview media"
					class="h-[500px] w-full object-cover"
					height="300"
					width="300"
				/>
			</div>
		{/if}

		<Dropzone
			id="drag-image-input"
			containerClasses="cursor-pointer"
			accept="image/png,image/jpg,image/jpeg"
			multiple={false}
			on:drop={handleFilesSelect}
		/>

		{#each accepted as item}
			<p class="pt-4">{item.name}</p>
		{/each}
	</div>
{/if}
