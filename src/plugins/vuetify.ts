import Vue from "vue";
import Vuetify from 'vuetify/lib';
import fr from "vuetify/src/locale/fr";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: "fr"
  },
  icons: {
    iconfont: "md"
  },
  font: {
    family: "Poppins"
  },
  theme: {
    themes: {
      light: {
        whiteLight: "#F2F2F0",
        light: "#80BF9B",
        midDark: "#025928",
        primary: "#038C4C",
        accent: "#038C5A",
        balckDark: "#003015"
      },
    },
  },
});
