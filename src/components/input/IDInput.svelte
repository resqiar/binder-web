<script lang="ts">
	export let error: string;
	export let loading: boolean = false;
</script>

<div class="form-control">
	<label class="label" for="id-input">
		<span class="label-text">ID of the ext*</span>
	</label>
	<label class="input-group">
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 {loading ? 'animate-spin' : ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
				/>
			</svg>
		</span>
		<input
			on:input
			type="number"
			id="id-input"
			placeholder="ID"
			class="input input-bordered w-full {error ? 'input-error' : ''}"
		/>
	</label>
	{#if error}
		<label for="id-input" class="label">
			<span class="label-text-alt">{error}</span>
		</label>
	{/if}
</div>
