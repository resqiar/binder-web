<script lang="ts">
	import Youtube from 'svelte-youtube-embed';
	export let id: string;
</script>

<div class="yt-player-custom">
	<Youtube {id} --height="500" />
</div>
