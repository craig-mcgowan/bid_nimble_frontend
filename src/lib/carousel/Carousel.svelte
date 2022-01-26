<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { carouselContent } from './content';
  import CarouselCard from './CarouselCard.svelte';
  let Carousel; // for saving Carousel component class
  let carousel; // for calling methods of the carousel instance
  let loading = true
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
    loading = false
  });

  const handleNextClick = () => {
    carousel.goToNext()
  }

</script>
<div class="h-96">
  {#if loading}
    <div>
    </div>
  {:else}
    <div transition:fade>
      <svelte:component
      this={Carousel}
      bind:this={carousel}
      autoplay=true
      arrows={false}
      autoplayDuration=4000>
      {#each carouselContent as {icon, description} }
      <CarouselCard {icon} {description} />
      {/each}
      
    </svelte:component>
  </div>
  {/if}
</div>
