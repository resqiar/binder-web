import type { IExtension } from '../types/extension';

export async function getBatch(skip: number = 0) {
	try {
		const url = `${import.meta.env.VITE_SERVER}/ext?skip=${skip}`;

		const response = await fetch(url, {
			cache: 'default',
			headers: {
				'cache-control': 'public, max-age=3600' // Free to cache for max age of 1 hour
			}
		});

		if (!response.ok) {
			throw new Error(`Request failed with the status code ${response.status}`);
		}

		const result: IExtension[] = await response.json();
		return result;
	} catch (error) {
		throw new Error(error as string);
	}
}
