<script lang="ts">
	import type { DropzoneFile } from '../../types/dropzone';
	import { CreateExtDesc, CreateExtImage, CreateExtTitle } from '../../stores/createExtStore';

	let title: string | undefined;
	let desc: string | undefined;
	let image: DropzoneFile[];

	// ITEMS FROM OTHER COMPONENTS
	// SAVED IN SVELTE_STORE.
	CreateExtTitle.subscribe((value) => (title = value));
	CreateExtDesc.subscribe((value) => (desc = value));
	CreateExtImage.subscribe((value) => (image = value));

	// Confirmation modal state.
	// use this bool to control modal state,
	let isModalOpen: boolean = false;

	function handleCreateExt() {
		if (!title) return;
		console.log('READY TO PUBLISH ', title, desc, image);
		isModalOpen = false;
	}
</script>

<div class="navbar bg-base-100 md:px-8">
	<!-- DRAWER -->
	<div class="flex-none">
		<label
			for="left-drawer"
			aria-label="Open Drawer"
			class="btn btn-ghost btn-square drawer-button"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-5 w-5 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</label>
	</div>

	<!-- DASHBOARD -->
	<div class="flex-1 px-4 md:px-8">
		<a href="/" class="text-xl normal-case">Binder</a>
	</div>

	<div class="flex-none">
		<!-- CREATE EXTENSION BUTTON -->
		{#if title}
			<button
				on:click={() => (isModalOpen = true)}
				class="btn btn-primary btn-sm mx-4 gap-2 normal-case"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
				Create Extension
			</button>

			<!-- CONFIRMATION DIALOG -->
			<input type="checkbox" id="confirm-modal" class="modal-toggle" />
			<div class:modal-open={isModalOpen} class="modal modal-bottom sm:modal-middle">
				<div class="modal-box !rounded-b-none md:!rounded-b-xl">
					<h3 class="text-lg font-bold">Create extension?</h3>
					<p class="py-4">
						Please make sure the data is correct and don't forget to cite the ID of the extension in
						your Binder!
					</p>
					<div class="modal-action">
						<button on:click={() => (isModalOpen = false)} class="btn btn-ghost">Wait, no!</button>
						<button on:click={handleCreateExt} class="btn btn-primary">Alright!</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
