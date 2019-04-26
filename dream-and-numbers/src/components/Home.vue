<template lang="pug">
  .home
    section#banner
      .inner
        header
          h2 {{ $t('intro.titre') }}
        p(v-html="$t('intro.textshort')")
        footer
          ul.buttons.stacked
            li
              a.button.fit.scrolly(href="#main") {{$t('plus')}}
    article#main
      header.special.container
        span.icon.fa.fa-quote-right
        h2 "{{ $t('citation.cite') }}"
          small  - {{$t('citation.source')}}
        p(v-html="$t('intro.text')")
    Demande
</template>

<script>
  import Demande from "./Demande"

  export default {
    name: "home",
    components: {Demande},
    data() {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  h2
    small
      text-transform none
      font-size medium
  
</style>
