<script lang="ts">
	import { CreateExtDesc } from '../../stores/createExtStore';

	let descInput: string | undefined;
	$: CreateExtDesc.set(descInput);
</script>

<div class="form-control">
	<label class="label" for="desc-input">
		<span class="label-text">Description</span>
	</label>
	<textarea
		bind:value={descInput}
		id="desc-input"
		class="textarea textarea-bordered w-full"
		rows="10"
		placeholder="Description"
	/>
</div>
