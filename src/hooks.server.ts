import type { Handle } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';

// Remove after Google indexing issues have been resolved.
const removedPaths: string[] = [
	'/tags/gitpod',
	'/tags/vercel',
	'/posts/$types',
	'/notes/env-vars-in-vscode',
	'/posts/how-to-add-a-basic-seo-component-to-sveltekit',
	'/notes/hosting-in-europe-beyond-big-tech',
	'/notes/am-i-still-relevant-as-a-developer',
	'/job-hunting-as-a-top-developer-in-2025',
	'/notes/perplexity-ai-caught-in-the-act',
	'/tags/ai',
	'/rss.xml',
	'/notes/rss.xml',
	'/posts/rss.xml',
	'/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces'
];

export const handle: Handle = async ({ event, resolve }) => {
	// Check for paths that should return status 410 (gone).
	if (removedPaths.includes(event.url.pathname)) {
		error(410, 'This page has been removed.');
	}

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
