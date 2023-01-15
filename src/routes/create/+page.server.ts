import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from '.svelte-kit/types/src/routes/create/$types';
import { getCurrent } from '$lib/getCurrent';

export const load = async ({ cookies }: PageServerLoadEvent) => {
	const key = cookies.get('key');

	if (!key) throw redirect(307, '/auth?return=/create');

	// Get current logged user data
	const result = await getCurrent(key);

	if (!result) throw redirect(307, '/auth?return=/create');
	if (!result.is_admin) throw redirect(307, '/unauthorized');

	return {
		user: result
	};
};
