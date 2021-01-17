<template>
  <v-tooltip bottom>
    <template v-slot:activator="{on, attrs}">
      <v-btn v-bind="attrs" v-on="on" icon large class="ml-2" @click="$emit('click')"><v-icon>{{icon}}</v-icon></v-btn>
    </template>
    <span><slot></slot></span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    icon: {
      type: String,
      required: true
    }
  }
})
</script>