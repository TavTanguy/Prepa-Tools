<template>
  <v-app>
    <header-bar />
    <v-main>
      <v-container fluid>
      <router-view></router-view>
    </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderBar from "./components/Header.vue"
export default Vue.extend({
  components: {HeaderBar}
})
</script>

<style>
a {
    text-decoration: none;
}
.text-whiteLight {
  color: #F2F2F0 !important;
}

.v-application, .v-application .text-body-1{
  font-family: "Poppins", sans-serif !important;
}

.v-application .text-Oswald {
  font-family: "Oswald", sans-serif !important;
}

.v-application {
  background-color: #E5E5E5 !important;
}
</style>