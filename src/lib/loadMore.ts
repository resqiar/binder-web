import type { IExtension } from 'src/types/extension';
import { getBatch } from './getBatch';

interface ILoadMoreProps {
	/**
	 * What page should the function get.
	 *
	 * Remember that the page formula is
	 * n = (page + 1) * 9.
	 *
	 * For example the page is 0, than the result will return
	 * the next batch of extensions start
	 * from items (n + 1) until items (n + 9).
	 **/
	page: number;
	/**
	 * A callback function that will called when the result
	 * is empty.
	 **/
	emptyCB: () => void;
	/**
	 * A callback function that will called when the result
	 * is have more than 0 length and does not contains error.
	 **/
	successCB: (result: IExtension[]) => void;
	/**
	 * A callback function that will called when the function
	 * encounter any error.
	 **/
	errorCB: (err: string) => void;
}

export async function loadMoreExt(props: ILoadMoreProps) {
	const tempPage = (props.page + 1) * 9;

	try {
		const result: IExtension[] = await getBatch(tempPage);

		if (result.length === 0) {
			return props.emptyCB();
		}

		props.successCB(result);
	} catch (error) {
		props.errorCB(error as string);
	}
}
