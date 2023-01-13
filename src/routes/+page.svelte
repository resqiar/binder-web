<script lang="ts">
	import BottomDrawer from '../components/drawers/BottomDrawer.svelte';
	import IndexHeader from '../components/header/IndexHeader.svelte';
	import IndexBody from '../components/body/IndexBody.svelte';
	import MainDrawer from '../components/drawers/MainDrawer.svelte';
</script>

<svelte:head>
	<title>Binder</title>
</svelte:head>

<MainDrawer activeIndex={0}>
	<!-- HEADER -->
	<header>
		<IndexHeader />
	</header>

	<!-- BODY -->
	<main>
		<IndexBody />
	</main>
</MainDrawer>

<!-- BOTTOM DRAWER (MOBILE ONLY) -->
<BottomDrawer activeIndex={0} />
