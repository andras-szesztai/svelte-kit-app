import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { SECRET_GITHUB_SECRET, SECRET_GITHUB_ID, AUTH_SECRET } from '$env/static/private';

const authorization = (async ({ event, resolve }) => {
	const session = await event.locals.getSession();
	if (event.url.pathname === '/') {
		throw redirect(303, session ? '/dashboard' : '/signin');
	}
	if (session && event.url.pathname === '/signin') {
		throw redirect(303, '/dashboard');
	}
	if (!session && event.url.pathname.startsWith('/dashboard')) {
		throw redirect(303, '/signin');
	}
	return await resolve(event);
}) satisfies Handle;

export const handle: Handle = sequence(
	SvelteKitAuth({
		trustHost: true,
		// @ts-ignore
		providers: [GitHub({ clientId: SECRET_GITHUB_ID, clientSecret: SECRET_GITHUB_SECRET })],
		secret: AUTH_SECRET
	}),
	authorization
);
