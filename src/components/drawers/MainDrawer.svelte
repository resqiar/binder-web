<script lang="ts">
	import { drawerData } from '../../data/drawerData';

	// The current active index of the item,
	// this number is passed by the parent.
	export let activeIndex: number;
</script>

<div class="drawer">
	<input id="left-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>

	<div class="drawer-side">
		<!-- DRAWER OVERLAY -->
		<label for="left-drawer" class="drawer-overlay" />

		<!-- DRAWER CONTENT -->
		<ul class="menu w-80 overflow-y-auto bg-base-100 p-4 pt-6 text-base-content">
			<div class="flex flex-col gap-4">
				<!-- CLOSE DRAWER -->
				<div class="flex items-center gap-4">
					<label
						for="left-drawer"
						aria-label="Close Drawer"
						class="btn-outline drawer-button btn-sm btn-circle btn"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</label>
					<a class="text-2xl font-bold" href="/">Binder Management</a>
				</div>

				<p class="text-sm">
					Binder is a digital integration between handwriting and electronic data. An additional
					data (extension) is stored in the database that has an ID, this ID can be used in Binder
					physical products.
				</p>
			</div>

			<!-- ITEMS -->
			<div class="py-8">
				{#each drawerData as v (v.id)}
					<li class="py-1">
						<a href={v.href} class={activeIndex === v.id ? 'active' : ''}>{v.title}</a>
					</li>
				{/each}
			</div>
		</ul>
	</div>
</div>
