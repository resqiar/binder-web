import type { PageServerLoadEvent } from '.svelte-kit/types/src/routes/create/$types';

export const load = async ({ url }: PageServerLoadEvent) => {
	return {
		redirectUrl: url.searchParams.get('return')
	};
};
