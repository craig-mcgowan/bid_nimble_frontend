<script>
  const signOut =() =>{
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // User is now signed out
    });
    }
</script>


<a href="/" on:click={signOut}>Sign out</a>