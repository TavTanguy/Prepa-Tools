<template>
  <v-menu
    v-model="dateMenu"
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
        prepend-inner-icon="event"
        readonly
        hide-details
        :value="dateValueFormatted"
        v-on="on"
        @focus="focusDate"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      no-title
      locale-first-day-of-year="4"
      @input="input"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import { formatGetDate } from "../scripts/dateFormat";
export default {
  data() {
    return {
      dateMenu: false,
      dateValue: null,
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateValueFormatted() {
      return this.dateValue
        ? formatGetDate(new Date(Date.parse(this.dateValue)))
        : "";
    },
  },
  methods: {
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
    input() {
      this.dateMenu = false
      this.$emit("input", this.dateValue)
    }
  },
};
</script>