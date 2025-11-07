import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Redirect every request to www.maier.tech to maier.tech (with https).
	if (event.url.hostname === 'www.maier.tech') {
		const redirectUrl = new URL(event.url);
		redirectUrl.protocol = 'https:';
		redirectUrl.hostname = 'maier.tech';
		redirectUrl.port = '';
		redirect(301, redirectUrl.toString());
	}

	const response = await resolve(event);
	return response;
};
