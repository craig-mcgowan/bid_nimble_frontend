<script>
  import { onMount } from 'svelte';

  import ConstructionMan from "$lib/construction-man.svelte"
  import OfficeMan from '$lib/office-man.svelte';
  import HomeMan from '$lib/home-man.svelte';
  import { carouselContent } from './content';
  import CarouselCard from './CarouselCard.svelte';
  import { each } from 'svelte/internal';
  let Carousel; // for saving Carousel component class
  let carousel; // for calling methods of the carousel instance
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  const handleNextClick = () => {
    carousel.goToNext()
  }

</script>

<svelte:component
  this={Carousel}
  bind:this={carousel}
  autoplay=true
  arrows={false}
  autoplayDuration=4000
>
  {#each carouselContent as {icon, description} }
    <CarouselCard {icon} {description} />
  {/each}

</svelte:component>
