const ghAuthURL = 'https://github.com/login/oauth/authorize';
const clientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
export async function get(req) {
	const sessionId = '1234';
	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${
				import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID
			}&state=${sessionId}`
		}
	};
}
