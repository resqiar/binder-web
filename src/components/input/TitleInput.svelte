<script lang="ts">
	export let value: string;
	export let disabled: boolean = false;
</script>

<div class="form-control">
	<label class="label" for="title-input">
		<span class="label-text">Title of Extension*</span>
	</label>
	<label class="input-group">
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
			</svg>
		</span>
		<input
			bind:value
			type="text"
			id="title-input"
			placeholder="Title"
			class="input input-bordered w-full"
			{disabled}
		/>
	</label>
</div>
