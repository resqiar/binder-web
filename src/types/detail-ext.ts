import type { LANGS_SUPPORTED_TYPE } from './langs';

export interface IExtDetail {
	description: string | null;
	id: number;
	image_id: string | null;
	image_url: string | null;
	title: string;
	youtube_url: string | null;
	code_text: string | null;
	code_lang: LANGS_SUPPORTED_TYPE | null;
	created_at: string;
	updated_at: string;
	statusCode?: number;
	message?: string;
}
