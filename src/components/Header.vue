<template>
  <div>
    <v-app-bar color="primary" dark class="pl-4" height="78px">
      <v-app-bar-nav-icon @click="showNavigationDrawer = !showNavigationDrawer" x-large></v-app-bar-nav-icon>
      <router-link to="/"><v-toolbar-title class="titleHeader text-whiteLight text-h4 ml-7">
        <span class="big">P</span>répa<img class="mx-2" src="../assets/logo.svg" style="fill: #F2F2F0"><span class="big">T</span>ools
      </v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <!--<v-btn text class="light--text">Connexion</v-btn> -->
    </v-app-bar>

    <navigation-drawer v-model="showNavigationDrawer"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavigationDrawer from "./NavigationDrawer.vue"
export default Vue.extend({
  components: {NavigationDrawer},
  data: ()=>({
    showNavigationDrawer: false
  })
})
</script>

<style scoped>
.v-application .titleHeader {
  font-family: 'Sanchez', serif !important;
  padding: 20px 0;
}
.big {
  font-size: 1.2em;
}
img {
  height: 1em;
}
</style>