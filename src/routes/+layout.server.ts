import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => ({
	// session: await locals.getSession()
	session: null
})) satisfies LayoutServerLoad;
