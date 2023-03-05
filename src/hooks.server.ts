import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import AzureADProvider from '@auth/core/providers/azure-ad';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import {
	SECRET_GITHUB_SECRET,
	SECRET_GITHUB_ID,
	AUTH_SECRET,
	AZURE_AD_CLIENT_ID,
	AZURE_AD_CLIENT_SECRET,
	AZURE_AD_TENANT_ID
} from '$env/static/private';

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
		providers: [
			// @ts-ignore
			GitHub({ clientId: SECRET_GITHUB_ID, clientSecret: SECRET_GITHUB_SECRET }),
			// @ts-ignore
			AzureADProvider({
				clientId: AZURE_AD_CLIENT_ID,
				clientSecret: AZURE_AD_CLIENT_SECRET,
				tenantId: AZURE_AD_TENANT_ID
			})
		],
		secret: AUTH_SECRET,
		trustHost: true
	}),
	authorization
);
