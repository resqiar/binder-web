<script lang="ts">
	import { ExtDesc, ExtID, ExtImage, ExtTitle } from '../../stores/extStore';
	import type { DropzoneFile } from '../../types/dropzone';
	import ImageKit from 'imagekit-javascript';
	import Logo from '../brand/Logo.svelte';

	let id: number | undefined;
	let title: string | undefined;
	let desc: string | undefined;
	let image: DropzoneFile[];

	// ITEMS FROM OTHER COMPONENTS
	// SAVED IN SVELTE_STORE.
	ExtID.subscribe((value) => (id = value));
	ExtTitle.subscribe((value) => (title = value));
	ExtDesc.subscribe((value) => (desc = value));
	ExtImage.subscribe((value) => (image = value));

	// Confirmation modal state.
	// use this bool to control modal state,
	let isModalOpen: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	async function handleEditExt() {
		if (!id || !title || title.length < 3) return;

		// reset error
		error = '';

		// start loading
		loading = true;

		// keep ref to image url if any
		let imageUrl: string | undefined = undefined;
		let imageId: string | undefined = undefined;

		if (image[0]) {
			// Initialize ImageKit libs.
			// it requires a public key of ImageKit,
			// url of account, and server endpoint for signature.
			const imagekit = new ImageKit({
				publicKey: import.meta.env.VITE_IK_PUBLIC,
				urlEndpoint: import.meta.env.VITE_IK_END,
				authenticationEndpoint: `${import.meta.env.VITE_SERVER}/auth-imagekit`
			});

			try {
				// Start uploading to imagekit
				const result = await imagekit.upload({
					file: image[0],
					fileName: image[0].name,
					folder: import.meta.env.VITE_NODE_ENV === 'production' ? 'live' : 'local'
				});

				// Bind result url to previous reference.
				imageUrl = result.url;
			} catch (err: any) {
				// Reset loading
				loading = false;

				// Set error to error message
				return (error = err.message);
			}
		}

		try {
			// Create Extension POST to server
			const updateExtUrl = `${import.meta.env.VITE_SERVER}/ext/update/${id}`;
			const response = await fetch(updateExtUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					description: desc,
					image_url: imageUrl,
					image_id: imageId
				})
			});

			const result = await response.json();
			loading = false;
			if (result.statusCode) return (error = result.message);

			// close modal
			isModalOpen = false;

			// Redirect to the detail page
			// of the created extension.
			return (window.location.href = `/ext/${id}`);
		} catch (err: any) {
			// Reset loading
			loading = false;

			// Set error to error message
			return (error = err.message);
		}
	}
</script>

<div class="navbar bg-base-100 md:px-8">
	<!-- DRAWER -->
	<div class="flex-none">
		<label
			for="left-drawer"
			aria-label="Open Drawer"
			class="btn btn-square btn-ghost drawer-button"
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
		<Logo />
	</div>

	<div class="flex-none">
		<!-- EDIT EXTENSION BUTTON -->
		{#if title && title.length >= 3}
			<button
				on:click={() => (isModalOpen = true)}
				class="btn btn-primary btn-sm mx-4 gap-2 normal-case"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
					<path
						fill-rule="evenodd"
						d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
						clip-rule="evenodd"
					/>
				</svg>
				Edit Extension
			</button>

			<!-- CONFIRMATION DIALOG -->
			<input type="checkbox" id="confirm-modal" class="modal-toggle" />
			<div class:modal-open={isModalOpen} class="modal modal-bottom sm:modal-middle">
				<div class="modal-box !rounded-b-none md:!rounded-b-xl">
					<h3 class="text-lg font-bold">Edit extension?</h3>
					<p class="py-4">
						Please make sure the data is correct and don't forget to cite the ID of the extension in
						your Binder!
					</p>
					{#if error}
						<div class="alert alert-error my-2 shadow-lg">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 flex-shrink-0 stroke-current"
									fill="none"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/></svg
								>
								<span>{error}</span>
							</div>
						</div>
					{/if}
					<div class="modal-action">
						<button on:click={() => (isModalOpen = false)} class="btn btn-ghost">Wait, no!</button>
						<button on:click={handleEditExt} class="btn btn-primary {loading ? 'loading' : ''}"
							>Alright!</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
