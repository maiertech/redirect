import { error, redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { allowedOrigins, resolveRedirect } from '#lib/redirect-rules.js';

export const handle: Handle = async ({ event }) => {
	const location = resolveRedirect(event.url.hostname, event.url.pathname, event.url.search);

	if (location) {
		redirect(301, location, { external: [...allowedOrigins] });
	}

	error(404, 'Not found.');
};
