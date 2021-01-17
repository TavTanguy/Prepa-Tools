import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue"
import { tools } from "../scripts/info";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Accueil",
    component: Home
  },
  ...tools,
  {
    path: "/voc",
    name: "Vocabulaire",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Voc" */ "../views/Voc.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
