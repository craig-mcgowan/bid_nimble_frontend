import { writable } from "svelte/store";

export const trades = writable([])


const fetchTrades = async() => {
  const url = `https://bidnimble-api.herokuapp.com/trade`;
  const res = await fetch(url, {
    method: "get",
    headers: {"Access-Control-Allow-Origin": "*"}
  })
  const data = await res.json()
  trades.set(data)
}

fetchTrades()