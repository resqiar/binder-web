<script lang="ts">
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';

	let status: 'login' | 'register' = 'login';

	// State to save the input from login card
	let usernameLogin: string = '';
	let passwordLogin: string = '';

	// State to save the input from register card
	let usernameRegister: string = '';
	let passwordRegister: string = '';

	// Error message state
	let loginErr: string = '';
	let registerErr: string = '';

	async function doLogin() {
		if (!usernameLogin || !passwordLogin) return;

		// Call the server to do the login process
		const req = await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: usernameLogin,
				password: passwordLogin
			})
		});

		// Get JSON response.
		const response = await req.json();

		if (response.error) {
			return (loginErr = response.message);
		}

		// Call function to issue the token that coming from
		// the server and save them to the cookie.
		issueTokenCookie(response.key);
		goto('/');
	}

	async function doRegister() {
		if (!usernameRegister || !passwordRegister) return;

		// Call the server to do the registration process
		// while also provide the input from register card.
		const req = await fetch(`${import.meta.env.VITE_SERVER}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: usernameRegister,
				password: passwordRegister
			})
		});

		// Get JSON response
		const response = await req.json();

		if (response.error) {
			return (registerErr = response.message);
		}

		// Issue a cookie
		issueTokenCookie(response.key);
		goto('/');
	}

	function issueTokenCookie(token: string) {
		// Issue a cookie with the value of token
		// coming from the server.
		Cookies.set('key', token, {
			expires: 7,
			secure: true
		});
	}
</script>

<svelte:head>
	<title>Authentication Page</title>
</svelte:head>

<main class="flex min-h-screen w-full items-center justify-center">
	{#if status === 'login'}
		<div class="card min-w-[400px] bg-base-300 px-4 py-8 shadow-2xl">
			<div class="flex flex-col items-center gap-4">
				<!-- USERNAME INPUT -->
				<div class="form-control w-full max-w-xs">
					<label for="username" class="label">
						<span class="label-text">Username</span>
					</label>
					<input
						bind:value={usernameLogin}
						id="username"
						type="text"
						class="input-bordered input w-full max-w-xs"
					/>
				</div>

				<!-- PASSWORD INPUT -->
				<div class="form-control w-full max-w-xs">
					<label for="password" class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						bind:value={passwordLogin}
						id="password"
						type="password"
						class="input-bordered input w-full max-w-xs"
					/>
				</div>

				{#if loginErr}
					<div class="alert alert-error mt-4 max-w-xs shadow-lg">
						<span>{loginErr}</span>
					</div>
				{/if}

				<div class="my-4 w-full max-w-xs">
					<button on:click={doLogin} class="btn-block btn">Login</button>
				</div>

				<div class="my-2 flex gap-2">
					<p>Dont have an account yet?</p>
					<button on:click={() => (status = 'register')} class="font-bold hover:underline"
						>register</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="card min-w-[400px] bg-base-300 px-4 py-8 shadow-2xl">
			<div class="flex flex-col items-center gap-4">
				<!-- USERNAME INPUT -->
				<div class="form-control w-full max-w-xs">
					<label for="username" class="label">
						<span class="label-text">Username*</span>
					</label>
					<input
						bind:value={usernameRegister}
						id="username"
						type="text"
						class="input-bordered input w-full max-w-xs"
					/>
				</div>

				<!-- PASSWORD INPUT -->
				<div class="form-control w-full max-w-xs">
					<label for="password" class="label">
						<span class="label-text">Password*</span>
					</label>
					<input
						bind:value={passwordRegister}
						id="password"
						type="password"
						class="input-bordered input w-full max-w-xs"
					/>
				</div>

				{#if registerErr}
					<div class="alert alert-error mt-4 max-w-xs shadow-lg">
						<span>{registerErr}</span>
					</div>
				{/if}

				<div class="my-4 w-full max-w-xs">
					<button on:click={doRegister} class="btn-block btn">Register</button>
				</div>

				<div class="my-2 flex gap-2">
					<p>Already have an account?</p>
					<button on:click={() => (status = 'login')} class="font-bold hover:underline"
						>login</button
					>
				</div>
			</div>
		</div>
	{/if}
</main>
