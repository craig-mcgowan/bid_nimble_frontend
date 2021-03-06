const clientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
const secret = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET;
const tokenURL = 'https://github.com/login/oauth/access_token';


export async function get(req) {
  const code = req.query.get('code');

	const accessToken = await getAccessToken(code);
  const user = await getUser(accessToken);

	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	req.locals.user = user.login;

	return {
		status: 302,
		headers: {
			location: '/app/takeoff'
    }
	};
}

function getAccessToken(code) {
	return fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: secret,
			code
		})
	})
		.then((r) => r.json())
		.then((r) => r.access_token);
}

const userURL = 'https://api.github.com/user';

function getUser(accessToken) {
	return fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	}).then((r) => r.json());
}