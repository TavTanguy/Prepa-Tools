<template>
  <v-menu
    v-model="timeMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
    max-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        prepend-inner-icon="mdi-clock-outline"
        readonly
        hide-details
        :value="timeValueFormatted"
        v-on="on"
        @focus="focustime"
      ></v-text-field>
    </template>
    <v-time-picker v-model="timeValue" format="24hr" @change="change"></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      timeMenu: false,
      timeValue: null,
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    timeValueFormatted() {
      return (this.timeValue ?? "").replace(":", "h");
    },
  },
  methods: {
    focustime() {
      setTimeout(() => {
        if (!this.timeMenu) {
          this.timeMenu = true;
        }
      }, 200);
    },
    change() {
      this.timeMenu = false;
      this.$emit("input", this.timeValue);
    },
  },
};
</script>