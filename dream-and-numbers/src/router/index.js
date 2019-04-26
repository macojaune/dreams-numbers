import Vue                      from "vue"
import Router                   from "vue-router"
import {Contact, Demande, Home,Thanks} from "../components/"

Vue.use(Router)

export default new Router({
                            routes: [
                              {
                                path: "",
                                name: "home",
                                component: Home,
                              },
                              {
                                path: "/thanks",
                                name: "thanks",
                                component: Thanks,
                              },
                              {
                                path: "/contact",
                                name: "contact",
                                component: Contact,
                              },
                            ],
                          })
