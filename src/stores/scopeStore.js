import { writable, derived, readable } from "svelte/store";

const URL = 'https://bidnimble-api.herokuapp.com';
export const trades = writable([])
export const dbURL = readable(URL);

export const fetchTrades = async() => {
  const res = await fetch(`https://bidnimble-api.herokuapp.com/trade`, {
		method: 'get',
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
  const data = await res.json()
  trades.set(data)
}

fetchTrades()

export const newTrades = writable([]);


export const tradeNames = derived(trades, $trades=>$trades.map(trade=>trade.name))
export const visibleTrades = writable([])

export const isChecked = writable(false)

export const newTradeKey = writable(0); 
