export const tools: {
  name: string;
  path: string;
  component: () => Promise<typeof import("*.vue")>;
  icon: string;
}[] = [
  {name: "Compteur de mots", icon: "pencil.svg", path: "/cmtMots", component: () => import(/* webpackChunkName: "cmtMots" */"../views/CmtMots.vue")},
  {name: "Vocabulaire", icon: "message-processing.svg", path: "/voc", component: () => import(/* webpackChunkName: "cmtMots" */"../views/Voc.vue")}
]