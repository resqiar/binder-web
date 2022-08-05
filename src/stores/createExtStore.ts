import type { DropzoneFile } from '../types/dropzone';
import { writable, type Writable } from 'svelte/store';

export const CreateExtTitle: Writable<string | undefined> = writable();
export const CreateExtDesc: Writable<string | undefined> = writable();
export const CreateExtImage: Writable<DropzoneFile[]> = writable([]);
