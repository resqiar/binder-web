<script lang="ts">
	import { drawerData } from '../../data/drawerData';

	export let activeIndex: number;
	export let handleDrawerChange: (i: number) => void;
</script>

<div class="btm-nav btm-nav-md shadow-xl md:hidden">
	{#each drawerData as v (v.id)}
		<button on:click={() => handleDrawerChange(v.id)} class={activeIndex === v.id ? 'active' : ''}>
			<!-- DYNAMIC ICONs -->
			<svelte:component this={drawerData[v.id].icon} />
		</button>
	{/each}
</div>
