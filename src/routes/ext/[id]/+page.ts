import type { LoadEvent } from '@sveltejs/kit';

export async function load({ params, fetch }: LoadEvent) {
	// Get ID from URL parameter
	const id = params.id;
	// Ask the server about the data based
	// on the id that we found earlier.
	const response = await fetch(`${import.meta.env.VITE_SERVER}/ext/${id}`);
	const data = await response.json();

	return {
		data: data
	};
}
