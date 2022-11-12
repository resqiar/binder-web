<script lang="ts">
	/**
	 * THIS CODE IS THE MODIFICATION OF A PACKAGE CALLED SVELTE-ACE
	 * BY nateshmbhat ON https://github.com/nateshmbhat/svelte-ace
	 * THE REASON IS ONLY TO SIMPLIFY THE CODE AND FIX THE MISSING TYPE
	 * AND VIM PLUGIN ERROR
	 **/
	import { createEventDispatcher, tick, onMount, onDestroy } from 'svelte';

	import ace from 'brace';
	import 'brace/mode/typescript';
	import 'brace/theme/terminal';
	import 'brace/keybinding/vim';

	const dispatch = createEventDispatcher<{
		init: ace.Editor;
		input: string;
		selectionChange: any;
		blur: void;
		changeMode: any;
		commandKey: { err: any; hashId: any; keyCode: any };
		copy: void;
		cursorChange: void;
		cut: void;
		documentChange: { data: any };
		focus: void;
		paste: string;
	}>();

	/**
	 * translation of vue component to svelte:
	 * @link https://github.com/chairuosen/vue2-ace-editor/blob/91051422b36482eaf94271f1a263afa4b998f099/index.js
	 **/
	export let value: string = ''; // String, required
	export let lang: string = 'typescript'; // String
	export let theme: string = 'terminal'; // String
	export let height: string = '100%'; // null for 100, else integer, used as percent
	export let width: string = '100%'; // null for 100, else integer, used as percent
	export let options: any = {}; // Object
	export let readonly: boolean = false;
	export let keybindings: string = '';
	let editorElement: HTMLElement;
	let editor: ace.Editor;
	let contentBackup: string = '';

	const requireEditorPlugins = () => {};
	requireEditorPlugins();

	onDestroy(() => {
		if (editor) {
			editor.destroy();
			editor.container.remove();
		}
	});

	$: watchValue(value);
	function watchValue(val: string) {
		if (contentBackup !== val && editor && typeof val === 'string') {
			editor.session.setValue(val);
			contentBackup = val;
		}
	}

	$: watchTheme(theme);
	function watchTheme(newTheme: string) {
		if (editor) {
			editor.setTheme('ace/theme/' + newTheme);
		}
	}

	$: watchMode(lang);
	function watchMode(newOption: any) {
		if (editor) {
			editor.getSession().setMode('ace/mode/' + newOption);
		}
	}

	$: watchOptions(options);
	function watchOptions(newOption: any) {
		if (editor) {
			editor.setOptions(newOption);
		}
	}

	$: watchReadOnlyFlag(readonly);
	function watchReadOnlyFlag(flag: any) {
		if (editor) {
			editor.setReadOnly(flag);
		}
	}

	const resizeOnNextTick = () =>
		tick().then(() => {
			if (editor) {
				editor.resize();
			}
		});

	$: if (height !== null && width !== null) {
		resizeOnNextTick();
	}

	onMount(() => {
		lang = lang || 'text';
		theme = theme || 'terminal';

		editor = ace.edit(editorElement);

		dispatch('init', editor);
		editor.$blockScrolling = Infinity;
		editor.getSession().setMode('ace/mode/' + lang);
		editor.setTheme('ace/theme/' + theme);
		editor.setValue(value, 1);
		editor.setReadOnly(readonly);
		contentBackup = value;
		setEventCallBacks();
		if (options) {
			editor.setOptions(options);
		}
	});

	const ValidPxDigitsRegEx = /^\d*$/;
	function px(n: string): string {
		if (ValidPxDigitsRegEx.test(n)) {
			return n + 'px';
		}
		return n;
	}

	function setEventCallBacks() {
		editor.onBlur = () => dispatch('blur');
		editor.onChangeMode = (obj: any) => dispatch('changeMode', obj);
		editor.onCommandKey = (err: string, hashId: number, keyCode: number) =>
			dispatch('commandKey', { err, hashId, keyCode });
		editor.onCopy = () => dispatch('copy');
		editor.onCursorChange = () => dispatch('cursorChange');
		editor.onCut = () => {
			// const copyText = editor.getCopyText();
			editor.insert('');
			dispatch('cut');
		};
		editor.onDocumentChange = (obj: { data: any }) => dispatch('documentChange', obj);
		editor.onFocus = () => dispatch('focus');
		editor.onPaste = (text: string) => {
			editor.insert(text);
			dispatch('paste', text);
		};
		editor.onSelectionChange = (obj: any) => dispatch('selectionChange', obj);
		editor.on('change', function () {
			const content = editor.getValue();
			value = content;
			dispatch('input', content);
			contentBackup = content;
		});

		if (keybindings != null) {
			editor.setKeyboardHandler('ace/keyboard/' + keybindings);
		}
	}
</script>

<div style="width:{px(width)};height:{px(height)}">
	<div bind:this={editorElement} style="width:{px(width)};height:{px(height)}" />
</div>
