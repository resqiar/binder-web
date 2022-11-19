<script>
	import Logo from '../brand/Logo.svelte';
</script>

<div class="navbar bg-base-100 md:px-8">
	<!-- LEFT -->
	<div class="flex-none">
		<a href="/" class="btn-ghost btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	</div>

	<!-- CENTER -->
	<div class="flex-1 px-4 md:px-8">
		<Logo />
	</div>

	<!-- RIGHT -->
	<div class="flex-none">
		<a href="#playground" class="mr-2 text-sm font-bold hover:underline">👿 Jump to playground</a>
	</div>
</div>
