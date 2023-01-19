import Cookies from 'js-cookie';

export function issueKeyCookie(token: string) {
	// Issue a cookie with the value of token
	// coming from the server.
	Cookies.set('key', token, {
		expires: 7,
		secure: true
	});
}
