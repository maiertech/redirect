/**
 * A single redirect rule.
 *
 * Requests for `host` are permanently redirected to the canonical origin
 * `target`. When `preservePath` is set, the path and query string of the
 * request are kept; otherwise the request is redirected to the root of the
 * canonical origin.
 */
export interface RedirectRule {
	/** The source host the rule applies to. */
	host: string;
	/** The canonical origin requests are redirected to. */
	target: string;
	/** Whether the path and query string of the request are preserved. */
	preservePath: boolean;
}

/** All redirect rules, in the order they are evaluated. */
export const redirectRules: readonly RedirectRule[] = [
	{ host: 'www.maier.tech', target: 'https://maier.tech', preservePath: true }
];

/**
 * The origins the app is allowed to redirect to. Kept separate from the rules on purpose: adding a
 * rule must not silently widen what the app may redirect to.
 */
export const allowedOrigins: readonly string[] = ['https://maier.tech'];

/**
 * Resolves the redirect target for a request.
 *
 * @param hostname The host of the incoming request.
 * @param path The path of the incoming request, including its leading slash.
 * @param search The query string of the incoming request, including its leading question mark.
 * @returns The absolute URL to redirect to, or `null` if no rule matches.
 */
export function resolveRedirect(hostname: string, path: string, search: string): string | null {
	const rule = redirectRules.find((rule) => rule.host === hostname);

	if (!rule) {
		return null;
	}

	if (!rule.preservePath) {
		return `${rule.target}/`;
	}

	return `${rule.target}${path}${search}`;
}
