export const tools = [
  {name: "Compteur de mots", icon: "pencil.svg", path: "/cmtMots", component: () => import(/* webpackChunkName: "cmtMots" */"../views/CmtMots.vue")},
  {name: "Vocabulaire", icon: "pencil.svg", path: "/voc", component: () => import(/* webpackChunkName: "cmtMots" */"../views/Voc.vue")}
]