<template lang="pug">
  section#demand.wrapper.special.style4.container
    .content
      section
        header
          h2 {{$t("yourDemand")}}
          p {{$t("fillForm")}}
        form
          .row.gtr-50
            .col-6.col-12-mobile
              input(type='text' name='name' :placeholder='$t("name")' v-model='user.name' required)
              p.error(v-show="error.name") {{$t("error.name")}}
            .col-6.col-12-mobile
              input(type="email" name='email' :placeholder='$t("email")' v-model="user.email" required)
              p.error(v-show="error.email") {{$t("error.email")}}
            .col-12
              textarea(name="dream" :placeholder='$t("yourDream")' rows="8" v-model="user.dream" required)
              p.error(v-show="error.dream") {{$t("error.dream")}}
            .col-12
              h3 {{$t("price")}} : 5€
              p.error(v-show="error.submit") {{$t('error.submit')}}
              ul.buttons
                li(v-if="!showPayment")
                  input.special(type='button' :value='$t("next")' @click="submit()")
                li(v-if="showPayment")
                  PayPal(amount=5.00 currency="EUR" :client="paypal" env="sandbox" :button-style="btnStyle" :payment-completed="paymentCompleted")
</template>

<script>
  import PayPal from "vue-paypal-checkout"
  import axios from 'axios'
  
  export default {
    name: "Demande",
    data() {
      return {
        api: 'https://us-central1-dreams-and-numbers.cloudfunctions.net/api',
        user: {
          name: "",
          email: "",
          dream: "",
        },
        showPayment: false,
        error: {
          name: false,
          email: false,
          dream: false,
          submit: false,
          pay:false       //todo
        },
        paypal: {
          sandbox: "AZzUfcUODEvxXqZv_tqHerthqUJNWktwenyd1vK3AOqYYTk7eB5N86JBd5_Zu5Nu57zz41TmjFG_N1oB",
          prouction: "",
        },
        btnStyle: {
          label: "checkout",
          size: "medium",    // small | medium | large | responsive
          shape: "rect",         // pill | rect
          color: "gold",         // gold | blue | silver | black
          tagline: false,
        },
      }
    },
    methods: {
      submit() {
        if (this.user.name !== "" && this.user.email !== "" && this.user.dream !== "") {
          //todo save submission
          axios.post(this.api + '/submit/', {user: this.user}).then(res => {
            this.uid = res.data.uid
            this.showPayment = true
          }).catch(err => {
            console.log(err)
            this.error.submit = true
          })
        } else {
          this.error.name = this.user.name === ""
          this.error.email = this.user.email === ""
          this.error.dream = this.user.dream === ""
        }
      },
      paymentCompleted(data) {
        console.log(data)
        axios.post(this.api + "/payed/", {uid: this.uid, id: data.id}).then(res => {
          console.log(res)
          //renvoi vers page merci
          this.$router.push('thanks')
        }).catch(err => {
          console.log(err)
          this.error.pay = true
        })
      }
    },
    components: {PayPal},
  }
</script>

<style lang="stylus" scoped>
  .error
    color #db6b67
</style>
