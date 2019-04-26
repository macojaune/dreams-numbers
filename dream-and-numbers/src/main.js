// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue     from "vue"
import App     from "./App"
import router  from "./router"
import VueI18n from "vue-i18n"
import lang    from "./lang/lang"

Vue.config.productionTip = false

Vue.use(VueI18n)

let locale = 'fr'   //a changer en fonction du site

const i18n = new VueI18n({
                           locale,
                           messages: lang,
                         })

/* eslint-disable no-new */
new Vue({
          el: "#page-wrapper",
          router,
          i18n,
          template: "<App/>",
          components: {App},
        })
