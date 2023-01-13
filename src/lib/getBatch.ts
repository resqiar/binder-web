import type { IExtension } from '../types/extension';

export async function getBatch(skip: number) {
	try {
		const url = `${import.meta.env.VITE_SERVER}/ext?skip=${skip}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Request failed with the status code ${response.status}`);
		}

		const result: IExtension[] = await response.json();
		return result;
	} catch (error) {
		throw new Error(`Failed to Get Batch: ${error}`);
	}
}
