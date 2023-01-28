<script lang="ts">
	import { browser } from '$app/environment';
	import type { IExtDetail } from 'src/types/detail-ext';
	import sanitizeHtml from 'sanitize-html';
	import getYouTubeID from 'get-youtube-id';
	import YtPlayer from '../misc/YTPlayer.svelte';
	import CodeEditor from '../code-editor/CodeEditor.svelte';
	import SelectLangInput from '../input/SelectLangInput.svelte';

	export let data: IExtDetail;

	// Get youtube id from the given URL
	let ytId: string | null = null;
	// If URL valid, it will return string, otherwise null
	$: if (browser) {
		ytId = getYouTubeID(data.youtube_url ?? '');
	}

	/**
	 * Code editor related states.
	 * These are reactive state that will react whenever
	 * the user makes any change.
	 **/
	let code: string | undefined = data.code_text ? data.code_text : undefined;
	let lang: string = data.code_lang ?? '';
	let enableVim: boolean = true;
	let loading: boolean = false;
	let result: string = ''; // result from server

	/**
	 * This line of code is using the sanitizeHtml function to
	 * sanitize the value of the 'description'.
	 * This helps in preventing XSS attacks by removing any potentially
	 * harmful HTML code before it is rendered on the page.
	 **/
	let purifiedDesc = sanitizeHtml(data.description ?? '');

	/**
	 * Regular Expression for matching URLs inside description
	 *
	 * (https?:\/\/) : Matches the string "http://" or "https://"
	 * (www\.)? : Matches the string "www." if it exists, making the URL match www and non-www urls
	 * [-a-zA-Z0-9@:%._\+~#=]{1,256} : Matches 1 to 256 characters that are valid in a URL.
	 * \.[a-zA-Z0-9()]{1,6} : Matches a period followed by 1 to 6 characters that are valid in a domain name.
	 * \b : Asserts position at a word boundary (^\w|\w$|\W\w|\w\W)
	 * ([-a-zA-Z0-9()@:%_\+.~#?&//=]*) : Matches zero or more characters that are valid in a URL.
	 * gi : Global and case-insensitive matching
	 *
	 **/
	let urlRegex =
		/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;

	//Replace all matches URLs with anchor tags
	purifiedDesc = purifiedDesc.replace(
		urlRegex,
		'<a href="$1" class="link link-hover link-warning font-bold" target="_blank" rel="noreferrer noopener">$1</a>'
	);

	async function requestResult() {
		if (!code || !lang) return;

		loading = true;

		const response = await fetch(`${import.meta.env.VITE_SERVER}/code/run`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: code,
				lang: lang
			})
		});

		// result from server
		const res = await response.json();

		if (!res.error) {
			result = res.output;
		} else {
			result = res.message;
		}

		loading = false;
	}
</script>

<main
	class="flex flex-col-reverse items-center justify-center lg:flex-row-reverse lg:gap-12 lg:px-8"
>
	<div class="flex flex-col items-center">
		<div class="card mb-8 h-min w-full bg-base-100 shadow-2xl md:mr-8 lg:mt-10 lg:w-[200px]">
			<div class="card-body flex items-center justify-center">
				<img
					src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&ecc=H&data=${data.id}`}
					alt={data.title}
					width="150"
					height="150"
				/>
				<div class="mt-4 flex flex-col items-center justify-center">
					<h2 class="card-title text-center">Scan me</h2>
					<p class="text-center text-sm">Open Binder app and scan the QR code</p>
				</div>
			</div>
		</div>

		{#if ytId}
			<div>
				<a
					href={data.youtube_url}
					target="_blank"
					class="btn mb-8 gap-2 px-2 text-sm normal-case"
					rel="noreferrer"
				>
					Open video in YouTube
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-4 w-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
						/>
					</svg>
				</a>
			</div>
		{/if}
	</div>

	<div
		class="card mb-4 w-full rounded-t-none bg-base-100 pb-6 shadow-2xl md:my-4 md:rounded-xl lg:ml-8 lg:mt-10"
	>
		{#if data.image_url}
			<div class="relative">
				<img
					src={data.image_url}
					alt={data.title}
					class="max-h-[300px] w-full object-cover md:rounded-t-xl"
				/>

				<label
					for="my-modal"
					class="modal-button absolute top-0 left-0 right-0 bottom-0 z-10 cursor-pointer"
				/>
			</div>

			<!-- ZOOM IMAGE MODAL -->
			<input type="checkbox" id="my-modal" class="modal-toggle" />
			<label for="my-modal" class="modal h-full w-full backdrop-blur-md">
				<div class="modal-box relative max-h-full max-w-full p-0 shadow-2xl lg:h-[90%] lg:w-[95%]">
					<label for="my-modal" class="btn-sm btn-circle btn absolute right-2 top-2 shadow-2xl"
						>✕</label
					>
					<div class="flex h-full w-full justify-center bg-black">
						<img src={data.image_url} class="object-cover" alt="fullscreen media" />
					</div>
				</div>
			</label>
		{/if}

		<!-- YOUTUBE PLAYER -->
		<!-- SHOW ONLY WHEN URL VALID -->
		{#if ytId}
			<div class="pb-2">
				<YtPlayer id={ytId} />
			</div>
		{/if}

		<div class="card-body">
			<span class="badge font-bold">{data.id}</span>
			<h2 class="card-title">{data.title}</h2>

			<div class="whitespace-pre-wrap">
				<!-- SET INNER HTML FOR DESCRIPTION -->
				<!-- THE VALUE ALREADY SANITIZED BEFORE SO IT IS SAFE FROM XSS -->
				{@html purifiedDesc ?? 'No description'}
			</div>
		</div>
	</div>
</main>

<!-- CODE EDITOR SECTION -->
<div class="mt-4 mb-8 md:mx-8">
	<div class="flex flex-col md:flex-row">
		<div class="mx-6 mt-2 mb-8 md:mx-2 lg:w-7/12">
			<!-- TITLE -->
			<h1 class="my-2 text-2xl font-bold" id="playground">Playground</h1>
			<!-- DESC -->
			<p class="text-justify">
				The code playground is provided to make it simple to test and run previously created code.
				The default language will be chosen based on the parameters you have already saved. You
				don't need to worry if you use Vim because this playground by default uses keybindings for
				Vim.
			</p>
		</div>

		<div class="flex-center mb-8 flex flex-row items-center gap-2 self-center lg:ml-8 lg:self-end">
			<!-- ENABLE VIM -->
			<div class="form-control">
				<label class="label flex cursor-pointer flex-row gap-2">
					<span class="label-text text-xs md:text-base">Vim</span>
					<input
						type="checkbox"
						bind:checked={enableVim}
						class="checkbox-accent checkbox checkbox-sm md:checkbox-md"
					/>
				</label>
			</div>

			<!-- SELECT LANGUAGE -->
			<SelectLangInput bind:lang />

			<!-- RUN CODE BUTTON -->
			<button
				on:click={requestResult}
				class="md:text-md btn-secondary btn-sm btn text-xs md:ml-2 md:btn-md {loading
					? 'loading'
					: ''}">{loading ? 'Compiling...' : 'Compile Code'}</button
			>
		</div>
	</div>

	<!-- ACTUAL CODE EDITOR -->
	<div class="mx-2 flex flex-col gap-6 lg:flex-row">
		<!-- LEFT SECTION -->
		<div class="h-[600px] max-h-[800px] min-h-[600px] w-full shadow-2xl lg:w-7/12">
			<CodeEditor bind:value={code} keybindings={enableVim ? 'vim' : null} />
		</div>

		<!-- RIGHT SECTION -->
		<div class="min-h-[500px] break-all rounded-xl bg-[#000] px-8 py-5 shadow-2xl lg:w-5/12">
			<div class="whitespace-pre-wrap bg-transparent font-['Courier'] font-bold">
				{result}
			</div>
		</div>
	</div>
</div>
