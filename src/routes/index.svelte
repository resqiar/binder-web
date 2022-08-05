<script lang="ts">
	import MainDrawer from '../components/drawers/MainDrawer.svelte';
	import { drawerData } from '../data/drawerData';

	import IndexBody from '../components/body/IndexBody.svelte';
	import IndexHeader from '../components/header/IndexHeader.svelte';

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
	<IndexHeader />

	<!-- DYNAMIC COMPONENT BODY -->
	<svelte:component this={drawerData[activeDrawer].component} />
</MainDrawer>

<IndexBody />
