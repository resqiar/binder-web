<script lang="ts">
	import CreateExtIcon from '../icons/CreateExtIcon.svelte';
	import DashboardIcon from '../icons/DashboardIcon.svelte';
	import EditExtIcon from '../icons/EditExtIcon.svelte';

  // The current active index of the item,
  // this number is passed by the parent.
	export let activeIndex: number;
</script>

<div class="btm-nav btm-nav-md z-50 shadow-xl md:hidden">
	<!-- DASHBOARD -->
	<a href="/" class={activeIndex === 0 ? 'active' : ''}>
		<button>
			<DashboardIcon />
		</button>
	</a>

	<!-- CREATE -->
	<a href="/create" class={activeIndex === 1 ? 'active' : ''}>
		<button>
			<CreateExtIcon />
		</button>
	</a>

	<!-- EDIT -->
	<a href="/edit" class={activeIndex === 2 ? 'active' : ''}>
		<button>
			<EditExtIcon />
		</button>
	</a>
</div>
