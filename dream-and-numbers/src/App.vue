<template lang="pug">
  #page-wrapper
    Header
    router-view
    Footer
</template>

<script>
  import Footer from "./components/Footer"
  import Header from "./components/Header"
  
  export default {
    name: "app",
    components: {Header, Footer}
  }
</script>

<style lang="stylus">
  @import "./assets/css/main.css"
</style>
