<script lang="ts">
	import { browser } from '$app/env';
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
</script>

<svelte:component
	this={AceEditor}
	{width}
	{height}
	{lang}
	keybindings="vim"
	theme="terminal"
	options={{ fontSize }}
	{value}
/>
