<script>
	import { WEB_SEMVER } from '../../data/version';

	import Logo from '../brand/Logo.svelte';
	import AuthIcon from '../icons/AuthIcon.svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
</script>

<div class="navbar bg-base-100 md:px-8">
	<!-- LEFT -->
	<div class="flex-none">
		<label
			for="left-drawer"
			aria-label="Open Drawer"
			class="btn-ghost drawer-button btn-square btn hidden md:flex"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-5 w-5 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</label>
	</div>

	<div class="flex-1 px-4 md:px-8">
		<Logo />
	</div>

	<div class="flex-none">
		<div class="dropdown-end dropdown">
			<label tabindex="-1" for="dropdown-menu" class="btn-ghost btn-circle btn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-5 w-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/></svg
				>
			</label>
			<ul
				id="dropdown-menu"
				tabindex="-1"
				class="dropdown-content menu rounded-box w-52 bg-base-100 shadow-2xl"
			>
				<!-- LOGIN / REGISTER -->
				<li>
					<a href="/auth">
						<AuthIcon />
						Login</a
					>
				</li>

				<!-- GITHUB LINK -->
				<li>
					<a href="https://github.com/resqiar/binder" target="_blank" rel="noreferrer">
						<GithubIcon />
						GitHub</a
					>
				</li>

				<!-- WEB VERSION -->
				<li><p>Web: v{WEB_SEMVER}</p></li>
			</ul>
		</div>
	</div>
</div>
