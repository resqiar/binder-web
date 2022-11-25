<script lang="ts">
	import type { DropzoneFile } from '../../types/dropzone';
	import {
		ExtCodeInput,
		ExtCodeLangInput,
		ExtDesc,
		ExtImage,
		ExtTitle,
		ExtYTUrl
	} from '../../stores/extStore';
	import ImageKit from 'imagekit-javascript';
	import Logo from '../brand/Logo.svelte';

	let title: string | undefined;
	let desc: string | undefined;
	let image: DropzoneFile[];
	let youtubeUrl: string | undefined;
	let code: string | null | undefined;
	let codeLang: string | undefined;

	// ITEMS FROM OTHER COMPONENTS
	// SAVED IN SVELTE_STORE.
	ExtTitle.subscribe((value) => (title = value));
	ExtDesc.subscribe((value) => (desc = value));
	ExtImage.subscribe((value) => (image = value));
	ExtYTUrl.subscribe((value) => (youtubeUrl = value));
	ExtCodeInput.subscribe((value) => (code = value));
	ExtCodeLangInput.subscribe((value) => (codeLang = value));

	// Confirmation modal state.
	// use this bool to control modal state,
	let isModalOpen: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	async function handleCreateExt() {
		if (!title || title.length < 3) return;
		// If the code is present but the codeLang is not,
		// that means the user is either forget to select
		// the language options or something wrong with the selector.
		if (code && !codeLang) return (error = 'Please choose the language for the code');

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

				// Bind result to previous reference.
				imageId = result.fileId;
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
			const createExtUrl = `${import.meta.env.VITE_SERVER}/ext/create`;
			const response = await fetch(createExtUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					description: desc,
					image_url: imageUrl,
					image_id: imageId,
					youtube_url: youtubeUrl,
					code_text: code ? code : null,
					code_lang: codeLang
				})
			});

			const result = await response.json();
			loading = false;
			if (result.statusCode) return (error = result.message);

			isModalOpen = false;

			// Redirect to the detail page
			// of the created extension.
			return (window.location.href = `/ext/${result.id}`);
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
			class="btn-ghost drawer-button btn-square btn hidden md:flex"
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
		<!-- CREATE EXTENSION BUTTON -->
		{#if title && title.length >= 3}
			<button
				on:click={() => (isModalOpen = true)}
				class="btn-primary btn-sm btn mx-4 gap-2 normal-case"
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
						<button on:click={() => (isModalOpen = false)} class="btn-ghost btn">Wait, no!</button>
						<button on:click={handleCreateExt} class="btn-primary btn {loading ? 'loading' : ''}"
							>Alright!</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
