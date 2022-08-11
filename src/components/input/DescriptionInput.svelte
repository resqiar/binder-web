<script lang="ts">
	export let value: string;
	export let disabled: boolean = false;
</script>

<div class="form-control">
	<label class="label" for="desc-input">
		<span class="label-text">Description</span>
	</label>
	<textarea
		bind:value
		id="desc-input"
		class="textarea textarea-bordered w-full"
		rows="10"
		placeholder="Description"
		{disabled}
	/>
</div>
