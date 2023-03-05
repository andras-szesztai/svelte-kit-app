<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="flex flex-col gap-4">
	<span class="inline">You are not signed in</span>
	<button on:click={() => signIn('github')}>Sign In with GitHub</button>
	<button on:click={() => signIn('azure-ad')}>Sign In with Azure AD</button>
</div>
