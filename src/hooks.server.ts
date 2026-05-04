import { redirect, error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event }) => {
	// Redirect any path under maier.social to maier.tech (root).
	if (event.url.hostname === 'maier.social') {
		redirect(301, 'https://maier.tech/');
	}

	// Redirect www.maier.tech to maier.tech and preserve path and query parameters.
	if (event.url.hostname === 'www.maier.tech') {
		redirect(301, `https://maier.tech${event.url.pathname}${event.url.search}`);
	}

	error(404, 'Not found.');
};
