import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue"
import { tools } from "../scripts/info";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Accueil",
    component: Home,
  },
  ...tools,
  {
    path: "/formatCsvColle",
    name: "Format Csv Colle",
    component: () =>
      import(/* webpackChunkName: "cmtMots" */ "../views/FormatCsvColle.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
