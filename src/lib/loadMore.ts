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
	const formula = (props.page + 1) * 9;

	try {
		const result: IExtension[] = await getBatch(formula);

		if (!result.length) {
			return props.emptyCB();
		}

		props.successCB(result);

		/**
		 * If the result is less than 9,
		 * meaning that the next batch is not exist since-
		 * the items will never overlap the default boundary (9).
		 **/
		if (result.length < 9) {
			props.emptyCB();
		}
	} catch (error) {
		props.errorCB(error as string);
	}
}
