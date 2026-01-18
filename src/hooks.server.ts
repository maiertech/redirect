import { redirect, error } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event }) => {
	// Redirect www.maier.tech to maier.tech with a 301 "Moved Permanently" status.
	if (event.url.hostname === 'www.maier.tech') {
		redirect(301, `https://maier.tech${event.url.pathname}${event.url.search}`);
	}

	error(404, 'Not found.');
};
