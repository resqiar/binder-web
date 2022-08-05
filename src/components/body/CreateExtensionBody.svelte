<script>
	import DescriptionInput from '../input/DescriptionInput.svelte';
	import DropImageInput from '../input/DropImageInput.svelte';
	import TitleInput from '../input/TitleInput.svelte';
</script>

<main>
	<div class="flex w-full flex-col items-center py-4 px-4 lg:px-12">
		<h1 class="text-2xl font-bold">Create New Extension!</h1>

		<div class="flex w-full flex-col gap-4 py-8 lg:w-6/12">
			<!-- Title -->
			<TitleInput />

			<!-- Description Textarea -->
			<DescriptionInput />

			<!-- Drag Drop Image -->
			<DropImageInput />
		</div>
	</div>
</main>
