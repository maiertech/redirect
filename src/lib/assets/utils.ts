export function getRedirectUrl(url: URL): string {
	const redirectUrl = new URL(url);
	redirectUrl.protocol = 'https:';
	redirectUrl.hostname = 'maier.tech';
	redirectUrl.port = '';
	return redirectUrl.toString();
}
