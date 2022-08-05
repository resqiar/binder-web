<script lang="ts">
	import { drawerData } from '../data/drawerData';
	import MainDrawer from '../components/drawers/MainDrawer.svelte';

	// the id of the active drawer
	let activeDrawer = 0;

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
	<svelte:component this={drawerData[activeDrawer].header} />

	<!-- DYNAMIC COMPONENT BODY -->
	<svelte:component this={drawerData[activeDrawer].component} />
</MainDrawer>
