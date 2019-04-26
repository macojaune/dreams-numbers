<template lang="pug">
  //todo alt if home 
  header#header.alt
    h1#logo
      router-link(to="/") {{ $t('home') }}
    nav#nav
      ul
        // router-link(to="/#demand" tag="li")
          a {{$t('demand')}}
        router-link(to="/contact" tag="li")
          a {{$t('contact')}}
</template>

<script>
	export default {
		name: "Header"
	}
</script>

<style scoped>

</style>
