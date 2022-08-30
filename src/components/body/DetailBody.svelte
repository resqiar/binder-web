<script lang="ts">
	import type { IExtDetail } from 'src/types/detail-ext';
	export let data: IExtDetail;
</script>

<main class="flex flex-col-reverse items-center justify-center lg:flex-row lg:gap-12">
	<div class="card mb-8 h-min w-full bg-base-100 shadow-2xl lg:mt-10 lg:w-[200px]">
		<div class="card-body flex items-center justify-center">
			<img
				src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&ecc=H&data=${data.id}`}
				alt={data.title}
				width="150"
				height="150"
			/>
			<div class="mt-4 flex flex-col items-center justify-center">
				<h2 class="card-title text-center">Scan me</h2>
				<p class="text-center text-sm">Open Binder app and scan the QR code</p>
			</div>
		</div>
	</div>

	<div class="card mx-2 my-4 w-full bg-base-100 shadow-2xl lg:mt-10 lg:w-96">
		{#if data.image_url}
			<div class="relative">
				<img
					src={data.image_url}
					alt={data.title}
					class="w-full object-cover"
					width="300"
					height="300"
				/>

				<label
					for="my-modal"
					class="modal-button absolute top-0 left-0 right-0 bottom-0 z-10 cursor-pointer"
				/>
			</div>

			<!-- ZOOM IMAGE MODAL -->
			<input type="checkbox" id="my-modal" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box relative p-0">
					<label for="my-modal" class="btn btn-circle btn-sm absolute right-2 top-2 shadow-xl"
						>✕</label
					>
					<img src={data.image_url} alt="fullscreen media" />
				</div>
			</div>
		{/if}
		<div class="card-body">
			<span class="badge font-bold">{data.id}</span>
			<h2 class="card-title">{data.title}</h2>
			<p class="whitespace-pre-wrap">{data.description ?? 'No description'}</p>
		</div>
	</div>
</main>
