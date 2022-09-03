import type { DropzoneFile } from '../types/dropzone';
import { writable, type Writable } from 'svelte/store';

export const ExtID: Writable<number | undefined> = writable();
export const ExtTitle: Writable<string | undefined> = writable();
export const ExtDesc: Writable<string | undefined> = writable();
export const ExtImage: Writable<DropzoneFile[]> = writable([]);
export const ExtYTUrl: Writable<string | undefined> = writable();
