<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<span class="notSignedInText">You are not signed in</span>
<button on:click={() => signIn('github')}>Sign In with GitHub</button>
