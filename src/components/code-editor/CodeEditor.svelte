<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let AceEditor: any;

	// Lazy Loading Code Editor
	onMount(async () => {
		if (browser) {
			AceEditor = (await import('./Ace.svelte')).default;
		}
	});

	// Component props
	export let value: string = '';
	export let width: string = '100%';
	export let height: string = '100%';
	export let lang: string = 'typescript';
	export let fontSize: string = '18px';
	export let keybindings: 'vim' | null = 'vim';
</script>

<svelte:component
	this={AceEditor}
	{width}
	{height}
	{lang}
	bind:keybindings
	theme="terminal"
	options={{ fontSize }}
	bind:value
/>
