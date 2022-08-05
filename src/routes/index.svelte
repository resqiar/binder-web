<script lang="ts">
	import { drawerData } from '../data/drawerData';
	import MainDrawer from '../components/drawers/MainDrawer.svelte';
	import IndexHeader from '../components/header/IndexHeader.svelte';

	// the id of the active drawer
	let activeDrawer = 1;

	// handle drawer change when user click on different items.
	function handleDrawerChange(i: number) {
		activeDrawer = i;
	}
</script>

<svelte:head>
	<title>Binder</title>
</svelte:head>

<!-- DRAWER WRAPPER -->
<MainDrawer activeIndex={activeDrawer} {handleDrawerChange}>
	<!-- HEADER -->
	<IndexHeader />

	<!-- DYNAMIC COMPONENT BODY -->
	<svelte:component this={drawerData[activeDrawer].component} />
</MainDrawer>
