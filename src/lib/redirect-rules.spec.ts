import { describe, expect, it } from 'vitest';
import { allowedOrigins, redirectRules, resolveRedirect } from './redirect-rules.js';

describe('resolveRedirect', () => {
	it('redirects www.maier.tech to maier.tech', () => {
		expect(resolveRedirect('www.maier.tech', '/', '')).toBe('https://maier.tech/');
	});

	it('preserves the path', () => {
		expect(resolveRedirect('www.maier.tech', '/some/path', '')).toBe(
			'https://maier.tech/some/path'
		);
	});

	it('preserves the query string', () => {
		expect(resolveRedirect('www.maier.tech', '/some/path', '?a=1')).toBe(
			'https://maier.tech/some/path?a=1'
		);
	});

	it('redirects maier.social to the root of maier.tech', () => {
		expect(resolveRedirect('maier.social', '/some/path', '?a=1')).toBe('https://maier.tech/');
	});

	it('does not redirect an unknown host', () => {
		expect(resolveRedirect('unknown.example', '/some/path', '?a=1')).toBeNull();
	});

	it('does not redirect the canonical host', () => {
		expect(resolveRedirect('maier.tech', '/some/path', '?a=1')).toBeNull();
	});
});

describe('allowedOrigins', () => {
	it('only allows the canonical origin', () => {
		expect(allowedOrigins).toEqual(['https://maier.tech']);
	});

	it('covers the origin of every rule', () => {
		for (const rule of redirectRules) {
			expect(allowedOrigins).toContain(new URL(rule.target).origin);
		}
	});
});
