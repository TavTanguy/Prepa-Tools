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
  ...tools
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
