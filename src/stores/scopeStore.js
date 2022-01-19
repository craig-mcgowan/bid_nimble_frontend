import { writable, derived } from "svelte/store";

export const trades = writable([])


export const fetchTrades = async() => {
  const url = `https://bidnimble-api.herokuapp.com/trade`;
  const res = await fetch(url, {
    method: "get",
    headers: {"Access-Control-Allow-Origin": "*"}
  })
  const data = await res.json()
  trades.set(data)
}

fetchTrades()

export const tradeNames = derived(trades, $trades=>$trades.map(trade=>trade.name))
export const visibleTrades = writable([])

export const isChecked = writable(false)

