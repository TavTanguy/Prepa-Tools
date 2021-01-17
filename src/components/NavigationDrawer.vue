<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" absolute width="300px" temporary>
    <v-list color="primary" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center text-h4">
            <router-link class="text-whiteLight" to="/"><span class="big">P</span>répa<img class="mx-2" src="../assets/logo.svg" style="fill: #F2F2F0"><span class="big">T</span>ools</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-img :src="'/img/'+ item.icon" contain width="50px"/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { tools } from "../scripts/info";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: ()=>({
    items: tools
  }),
})
</script>