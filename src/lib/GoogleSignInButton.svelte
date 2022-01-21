<script>

</script>

<svelte:head>
  <script src="https://apis.google.com/js/platform.js?onLoad=onLoadCallback" async defer></script>
</svelte:head>

<svelte:window on:onSignIn = {(googleUser) => {
     const profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId());
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail());
  }} />
<div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" />