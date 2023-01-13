import type { IExtension } from '../types/extension';

export async function getBatch(skip: number) {
	const response = await fetch(`${import.meta.env.VITE_SERVER}/ext?skip=${skip}`);

	if (response.ok) {
		const result: IExtension[] = await response.json();
		return result;
	} else {
		throw new Error('500 Internal Server Error');
	}
}
