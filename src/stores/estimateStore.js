import { writable, readable } from 'svelte/store';

const URL = 'https://bidnimble-api.herokuapp.com';
export const estimates = writable([]);
export const dbURL = readable(URL);

export const fetchEstimates = async () => {
	const res = await fetch(`https://bidnimble-api.herokuapp.com/estimate`, {
		method: 'get',
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
	const data = await res.json();
	estimates.set(data);
};

fetchEstimates();

