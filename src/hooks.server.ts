import { redirect, error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event }) => {
	// Redirect any path under maier.social to maier.tech (root).
	if (event.url.hostname === 'maier.social') {
		redirect(301, 'https://maier.tech/', { external: true });
	}

	// Redirect www.maier.tech to maier.tech and preserve path and query parameters.
	if (event.url.hostname === 'www.maier.tech') {
		redirect(301, `https://maier.tech${event.url.pathname}${event.url.search}`, { external: true });
	}

	error(404, 'Not found.');
};
