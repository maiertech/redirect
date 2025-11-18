import { getRedirectUrl } from '$lib/assets/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Return 410 for these paths to signal that they can be removed from search indexes.
// Also display a clickable link to the same path on the apex domain instead of 301.
// 301 won't get it removed from search indexes.
const redirectPaths: string[] = [
	'/notes/am-i-still-relevant-as-a-developer',
	'/notes/env-vars-in-vscode',
	'/notes/hosting-in-europe-beyond-big-tech',
	'/notes/job-hunting-as-a-top-developer-in-2025',
	'/notes/perplexity-ai-caught-in-the-act',
	'/posts/a-better-development-workflow-with-disposable-workspaces',
	'/posts/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety',
	'/posts/dropping-requests-in-sveltekit',
	'/posts/environment-variables-in-sveltekit',
	'/posts/five-ways-to-customize-a-gitpod-workspace',
	'/posts/handling-breaking-changes-in-sveltekit-pre-1-0',
	'/posts/how-to-add-a-basic-seo-component-to-sveltekit',
	'/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code',
	'/posts/managing-environment-variables-with-vercel',
	'/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces',
	'/posts/three-ways-to-bootstrap-a-svelte-project',
	'/tags/ai'
];

// Return 410 for these paths to signal that they can be removed from search indexes.
const removedPaths: string[] = [
	'/tags/gitpod',
	'/tags/vercel',
	'/posts/$types',
	'/rss.xml',
	'/notes/rss.xml',
	'/posts/rss.xml'
];

export const load: PageServerLoad = async ({ url }) => {
	const redirectUrl = getRedirectUrl(url);

	if (redirectPaths.includes(url.pathname)) {
		error(410, { message: 'This page has moved to the URL below.', url: redirectUrl });
	}

	if (removedPaths.includes(url.pathname)) {
		error(410, 'This page has been removed.');
	}

	// Default: redirect to apex domain.
	redirect(301, redirectUrl);
};
