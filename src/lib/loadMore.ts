import type { IExtension } from 'src/types/extension';
import { getBatch } from './getBatch';

interface ILoadMoreProps {
	page: number;
	emptyCB: () => void;
	successCB: (result: IExtension[]) => void;
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
