<script lang="ts">
	import { onMount } from 'svelte';
	import Player from 'youtube-player';

	export let videoId: string;
	export let extend: string = '';

	let player: any;

	onMount(() => {
		player = Player(player, {
			videoId: videoId,
			playerVars: {
				autoplay: 0
			}
		});
	});
</script>

<div id="youtube-player" class={extend} bind:this={player} />
