import { writable } from "svelte/store";

export const scopeItems = writable([])


const fetchScopeItems = async() => {
  const url = `https://bidnimble-api.herokuapp.com/si`;
  const res = await fetch(url, {
    method: "get",
    headers: {"Access-Control-Allow-Origin": "*"}
  })
  const data = await res.json()
  scopeItems.set(data)
}

fetchScopeItems()