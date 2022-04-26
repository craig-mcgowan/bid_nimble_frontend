export async function get(req) {


	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	req.locals.user = "demo";

	return {
		status: 302,
		headers: {
			location: '/app/takeoff'
		}
	};
}

