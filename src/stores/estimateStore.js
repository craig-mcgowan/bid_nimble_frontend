import { writable, readable } from 'svelte/store';

const URL = 'https://bidnimble-api.herokuapp.com';
export const estimates = writable([]);
export const currentEstimate = writable([]);
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

export  const fetchEstimate = async (id) => {
		// console.log(id);
		const URL = `https://bidnimble-api.herokuapp.com/estimate/${id}`;
		const res = await fetch(URL, {
			headers: {}
    });
  const data = await res.json()
  console.log("data: ",data)
  currentEstimate.set(data)
};



  



export const estimateData = writable({
  
})