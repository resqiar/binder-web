import { getBatch } from '$lib/getBatch';

export const load = async () => {
	try {
		/**
		 * Get initial batch of the Extensions.
		 * This will return an array of items,
		 * otherwise the error will be returned.
		 **/
		const data = await getBatch();

		return {
			exts: data,
			error: undefined
		};
	} catch (err) {
		return {
			exts: [],
			error: err as string
		};
	}
};
