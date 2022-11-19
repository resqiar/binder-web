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
	import { onDestroy } from 'svelte';
	import DescriptionInput from '../input/DescriptionInput.svelte';
	import DropImageInput from '../input/DropImageInput.svelte';
	import TitleInput from '../input/TitleInput.svelte';
	import YoutubeInput from '../input/YoutubeInput.svelte';
	import CodeEditor from '../code-editor/CodeEditor.svelte';
	import SelectLangInput from '../input/SelectLangInput.svelte';

	let titleInput: string;
	let descInput: string;

	let youtubeInput: string;

	let accepted: DropzoneFile[] = [];
	let preview: string;

	// user-defined code
	let code: string;
	// code language [js, ts, c++]
	let lang: string;

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

	$: ExtTitle.set(titleInput);
	$: ExtDesc.set(descInput);
	$: ExtYTUrl.set(youtubeInput);
	$: ExtCodeInput.set(code);
	$: ExtCodeLangInput.set(lang);

	onDestroy(() => ExtImage.set([]));
</script>

<main>
	<div class="flex w-full flex-col items-center py-4 px-4 lg:px-12">
		<h1 class="text-2xl font-bold">Create New Extension!</h1>

		<div class="flex w-full flex-col gap-4 py-8 pb-20 lg:w-6/12">
			<!-- Title -->
			<TitleInput bind:value={titleInput} />

			<!-- Description Textarea -->
			<DescriptionInput bind:value={descInput} />

			<!-- Drag Drop Image -->
			<DropImageInput
				on:drop={handleFilesSelect}
				on:click={handleFilesRemove}
				{accepted}
				{preview}
			/>

			<!-- Youtube URL -->
			<YoutubeInput bind:value={youtubeInput} />

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
						<CodeEditor bind:value={code} height="600px" keybindings={null} />
					</label>
				</div>
			</div>
		</div>
	</div>
</main>
