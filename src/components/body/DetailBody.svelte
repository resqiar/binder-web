<script lang="ts">
	import type { IExtDetail } from 'src/types/detail-ext';
	export let data: IExtDetail;
</script>

<main class="flex items-center justify-center">
	<div class="card mx-2 my-4 w-full bg-base-100 shadow-2xl lg:mt-10 lg:mb-8 lg:w-96">
		{#if data.image_url}
			<figure>
				<img
					src={data.image_url}
					alt={data.title}
					class="w-full object-cover"
					width="300"
					height="300"
				/>
			</figure>
		{/if}
		<div class="card-body">
			<span class="badge font-bold">{data.id}</span>
			<h2 class="card-title">{data.title}</h2>
			<p>{data.description ?? 'No description'}</p>
		</div>
	</div>
</main>
