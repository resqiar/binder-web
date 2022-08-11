<script lang="ts">
	export let value: string;
</script>

<div class="form-control w-full px-8 md:px-2 lg:w-6/12">
	<div class="input-group">
		<input
			type="text"
			id="search-input"
			placeholder="Search…"
			class="input input-bordered w-full"
			bind:value
			on:keyup
		/>
		<button class="btn btn-square">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
	</div>
	<label class="label px-2" for="search-input">
		<span class="label-text-alt">Search ID</span>
	</label>
</div>
