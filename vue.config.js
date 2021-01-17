module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    msTileColor: "#F2F2F0",
    manifestOptions: {
      name: "Prépa-Tools",
      short_name: "Prépa",
      start_url: ".",
      display: "standalone",
      theme_color: "#038C4C"
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
};
