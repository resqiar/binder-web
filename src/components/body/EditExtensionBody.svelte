<script lang="ts">
	import type { DropzoneFile } from '../../types/dropzone';
	import {
		ExtCodeInput,
		ExtCodeLangInput,
		ExtDesc,
		ExtID,
		ExtImage,
		ExtTitle,
		ExtYTUrl
	} from '../../stores/extStore';
	import { onDestroy } from 'svelte';
	import debounce from 'lodash.debounce';
	import DescriptionInput from '../input/DescriptionInput.svelte';
	import DropImageInput from '../input/DropImageInput.svelte';
	import IdInput from '../input/IDInput.svelte';
	import TitleInput from '../input/TitleInput.svelte';
	import YoutubeInput from '../input/YoutubeInput.svelte';
	import SelectLangInput from '../input/SelectLangInput.svelte';
	import CodeEditor from '../code-editor/CodeEditor.svelte';

	// ID OF THE EXTENSION
	let id: number;

	// VALUE OF EACH INPUT
	let title: string;
	let desc: string;
	let youtubeUrl: string;
	let accepted: DropzoneFile[] = [];
	let preview: string;

	// LOADING & ERROR
	let loading: boolean;
	let error: string;

	// user-defined code
	let code: string;
	// code language [js, ts, c++]
	let lang: string;

	async function getData() {
		if (!id) return;

		// Reset all to the default
		reset();

		try {
			// Request to the server the detail of the Extension
			const req = await fetch(`${import.meta.env.VITE_SERVER}/ext/${id}`);
			const response = await req.json();

			// If the response from the server is 404,
			// meaning there is no corresponding ext found,
			// return and show the error.
			if (response.statusCode === 404) {
				loading = false;
				return (error = response.message);
			}

			// Reset loading
			loading = false;

			// Bind response to default data
			title = response.title;
			desc = response.description;
			preview = response.image_url;
			youtubeUrl = response.youtube_url;
			code = response.code_text;

			// Bind language choosen only if available
			if (response.code_lang) {
				lang = response.code_lang;
			}
		} catch (error: any) {
			// Bind error to input
			loading = false;
			return (error = error.message);
		}
	}

	// Debounce value of id.
	// Wait for 700ms before update the actual id.
	// This method is used to prevent unnecessary
	// make a call to the server.
	const handleIDDebounce = debounce((e: Event) => {
		const target = e.target as HTMLInputElement;
		if (!target.value) return;
		id = parseInt(target.value);
	}, 700);

	// Get data from the server
	// whenever the id updated.
	$: if (id) getData();

	function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles } = e.detail;
		accepted = acceptedFiles;

		// Update the store to contain current
		// dropped image.
		ExtImage.set([accepted[0]]);
	}

	function handleFilesRemove() {
		accepted = [];
		URL.revokeObjectURL(preview);
		preview = '';

		// Clear the store from the last image
		// by setting it to empty array.
		ExtImage.set([]);
	}

	$: if (accepted[0]) {
		// Set preview url
		const objectUrl = URL.createObjectURL(accepted[0]);
		preview = objectUrl;
	}

	function reset() {
		error = '';
		loading = true;
		title = '';
		desc = '';
		preview = '';
	}

	$: ExtID.set(id);
	$: if (id) handleFilesRemove();
	$: ExtTitle.set(title);
	$: ExtDesc.set(desc);
	$: ExtYTUrl.set(youtubeUrl);
	$: ExtCodeInput.set(code);
	$: ExtCodeLangInput.set(lang);

	onDestroy(() => ExtImage.set([]));
</script>

<main>
	<div class="flex w-full flex-col items-center py-4 px-4 lg:px-12">
		<h1 class="text-2xl font-bold">Edit Extension</h1>

		<div class="flex w-full flex-col gap-4 py-8 pb-20 lg:w-6/12">
			<!-- ID of the ext -->
			<IdInput {loading} {error} on:input={handleIDDebounce} />

			<!-- Title -->
			<TitleInput disabled={error ? true : false} bind:value={title} />

			<!-- Description Textarea -->
			<DescriptionInput disabled={error ? true : false} bind:value={desc} />

			<!-- Drag Drop Image -->
			<DropImageInput
				on:drop={handleFilesSelect}
				on:click={handleFilesRemove}
				{accepted}
				{preview}
			/>

			<!-- Youtube URL -->
			<YoutubeInput bind:value={youtubeUrl} />

			<!-- CODE INPUT SECTION -->
			<div class="my-2">
				<div class="form-control">
					<label class="label" for="code-input">
						<span class="label-text">Live Code</span>
					</label>

					<!-- SELECT LANGUAGE -->
					<div class="my-2">
						<SelectLangInput bind:lang />
					</div>

					<!-- Code Input -->
					<label class="label px-2" for="code-input">
						<CodeEditor bind:value={code} height="600px" keybindings="vim" />
					</label>
				</div>
			</div>
		</div>
	</div>
</main>
