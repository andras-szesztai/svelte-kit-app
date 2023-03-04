<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	$: user = $page.data.session && $page.data.session.user;
</script>

<div>Protected route</div>
<span class="signedInText">
	<small>Signed in as</small><br />
	<strong>{user?.name}</strong>
</span>
<button on:click={signOut} class="button">Sign out</button>
