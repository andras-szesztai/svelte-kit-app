<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="flex flex-col gap-4">
	<span class="inline">You are not signed in</span>
	<button class="inline" on:click={() => signIn('azure-ad')}>Sign In</button>
</div>
