<script lang="ts">
	import BottomDrawer from '../../components/drawers/BottomDrawer.svelte';
	import EditExtHeader from '../../components/header/EditExtHeader.svelte';
	import EditExtensionBody from '../../components/body/EditExtensionBody.svelte';
	import MainDrawer from '../../components/drawers/MainDrawer.svelte';
</script>

<svelte:head>
	<title>Edit extension | Binder</title>
</svelte:head>

<MainDrawer activeIndex={2}>
	<!-- HEADER -->
	<header>
		<EditExtHeader />
	</header>

	<!-- BODY -->
	<main>
		<EditExtensionBody />
	</main>
</MainDrawer>

<!-- BOTTOM DRAWER (MOBILE ONLY) -->
<BottomDrawer activeIndex={2} />
