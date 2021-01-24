<template>
  <div class="home">
    <title-under class="mt-9">Nos outils</title-under>
    <div class="d-flex flex-wrap mt-8 mx-8">
      <v-card v-for="(tool, i) of tools" :key="i" 
        class="card mr-8 mb-8 rounded-xl d-flex flex-column justify-space-evenly align-center py-4" :to="tool.path" elevation="0" min-width="190px" width="15vw" min-height="190px" height="15vw">
          <v-img :src="'/img/'+ tool.icon" contain width="9vw" min-width="100px" />
          <p class=" px-2 text-h5 text-Oswald ">{{tool.name}}</p>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import TitleUnder from "../components/Title.vue"
import { tools } from "../scripts/info";
export default Vue.extend({
  components: {TitleUnder},
  data: ()=>({
    tools
  })
})
</script>

<style scoped>
.home {
  width: 90vw;
  margin: auto;
}

.card {
  box-shadow: inset -5px -4px 0px #80BF9B !important;
}
</style>