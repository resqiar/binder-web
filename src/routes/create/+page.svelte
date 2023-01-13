<script lang="ts">
	import CreateExtensionBody from '../../components/body/CreateExtensionBody.svelte';
	import CreateExtHeader from '../../components/header/CreateExtHeader.svelte';
	import BottomDrawer from '../../components/drawers/BottomDrawer.svelte';
	import MainDrawer from '../../components/drawers/MainDrawer.svelte';
</script>

<svelte:head>
	<title>Create new extension | Binder</title>
</svelte:head>

<MainDrawer activeIndex={1}>
	<!-- HEADER -->
	<header>
		<CreateExtHeader />
	</header>

	<!-- BODY -->
	<main>
		<CreateExtensionBody />
	</main>
</MainDrawer>

<!-- BOTTOM DRAWER (MOBILE ONLY) -->
<BottomDrawer activeIndex={1} />
