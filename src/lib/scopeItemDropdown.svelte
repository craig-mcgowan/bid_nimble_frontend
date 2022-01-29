<script>
  import { trades, fetchTrades } from "../stores/scopeStore";
  export let trade, section, addLineItem
  let itemsArr = []

  const getTakeOffItems = async(trade, section) =>{
    await fetchTrades()
    const thisTrade= await $trades.find(ele=>ele.name===trade.name) 
    //if (!thisTrade){return}
    const thisSection= thisTrade.scopeSections.find(ele=>ele.name===section.name)
    // console.log(thisSection)
    itemsArr=thisSection.scopeItems
    itemsArr.unshift(
      {
				item: 'New Blank Line Item',
				unit: '',
				rate: '',
				quantity: '',
				fluff: '',
				total: ''
			})
  }
  getTakeOffItems(trade, section)
</script>
<ul on:click>
  {#if Array.isArray(itemsArr) }

      {#each itemsArr as item}
        <li on:click={addLineItem(trade, section, item)} class= "first:text-gray-600 first:bg-gray-100 hover:bg-sky-800 hover:text-white rounded px-1 cursor-default">{item.item}</li>
      {/each}
  {/if}
</ul>

<style>

</style>