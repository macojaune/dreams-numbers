<template lang="pug">
  .thanks
    section#banner
      .inner
        header
          h2 {{$t("thanks.title")}}
        p {{$t('thanks.msg')}}
</template>

<script>
  export default {
    name: "thanks",
  }
</script>
