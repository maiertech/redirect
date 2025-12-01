import { getRedirectUrl } from '$lib/assets/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Return 410 for these paths to signal that they can be removed from search indexes.
// Also display a clickable link to the same path on the apex domain instead of 301.
// 301 won't get it removed from search indexes.
const redirectPaths: string[] = [
	'/notes/am-i-still-relevant-as-a-developer',
	'/notes/disallowing-ai-bots-in-robots-txt',
	'/notes/env-vars-in-vscode',
	'/notes/hosting-in-europe-beyond-big-tech',
	'/notes/how-to-write-exceptional-docs',
	'/notes/job-hunting-as-a-top-developer-in-2025',
	'/notes/perplexity-ai-caught-in-the-act',
	'/notes/prerendering-server-routes-in-sveltekit',
	'/notes/using-github-copilot-in-the-terminal',
	'/notes/vercel-deployment-protection-bypass',
	'/posts',
	'/posts/a-better-development-workflow-with-disposable-workspaces',
	'/posts/complement-zero-effort-type-safety-in-sveltekit-with-zod-for-even-more-type-safety',
	'/posts/configuring-turborepo-for-a-sveltekit-monorepo',
	'/posts/do-i-need-a-sitemap-for-my-sveltekit-app-and-how-do-i-create-it',
	'/posts/dropping-requests-in-sveltekit',
	'/posts/environment-variables-in-sveltekit',
	'/posts/five-ways-to-customize-a-gitpod-workspace',
	'/posts/handling-breaking-changes-in-sveltekit-pre-1-0',
	'/posts/how-to-add-a-basic-seo-component-to-sveltekit',
	'/posts/how-to-make-sveltekit-hmr-work-with-gitpod',
	'/posts/how-to-use-github-cli-to-configure-ssh-authentication-to-github',
	'/posts/how-to-wire-up-fathom-analytics-in-a-sveltekit-app',
	'/posts/is-stackblitz-codeflow-beta-ready-to-replace-your-local-vs-code',
	'/posts/managing-environment-variables-with-vercel',
	'/posts/move-your-ide-to-the-cloud-introduction-to-github-codespaces',
	'/posts/recording-screencasts-on-a-hidpi-display',
	'/posts/route-matching-in-sveltekit',
	'/posts/three-ways-to-bootstrap-a-svelte-project',
	'/tags/ai',
	'/tags/content-creation',
	'/tags/github',
	'/tags/svelte',
	'/tags/typescript'
];

// Return 410 for these paths to signal that they can be removed from search indexes.
const removedPaths: string[] = [
	'/notes/rss.xml',
	'/posts/$types',
	'/posts/rss.xml',
	'/rss.xml',
	'/sitemap.xml',
	'/tags/codesandbox',
	'/tags/dx',
	'/tags/gitpod',
	'/tags/stackblitz',
	'/tags/vercel',
	'/tags/vscode'
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
