<script lang="ts">
	import { LANGS_SUPPORTED } from '../../types/langs';
	export let lang: string;
</script>

<select bind:value={lang} class="select-ghost select">
	<option disabled value="">Pick Language</option>
	{#each LANGS_SUPPORTED as supported}
		<option value={supported.lang} selected={lang === supported.lang}>{supported.title}</option>
	{/each}
</select>
