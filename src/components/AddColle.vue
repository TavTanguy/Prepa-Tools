<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6"
        ><v-text-field v-model="id" type="text" label="Identifiant"
      /></v-col>
      <v-col cols="12" sm="6"
        ><v-text-field v-model="matiere" type="text" label="Matière"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6"
        ><v-text-field v-model="colleur" type="text" label="Colleur"
      /></v-col>
      <v-col cols="12" sm="6"
        ><date-picker v-model="date" label="Date"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6"
        ><time-picker v-model="start" label="Début"
      /></v-col>
      <v-col cols="12" sm="6"
        ><time-picker v-model="end" type="text" label="Fin"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6"
        ><v-text-field v-model="salle" type="text" label="Salle"
      /></v-col>

      <v-spacer />
      <v-btn small color="primary" @click="add">Ajouter</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";

export default Vue.extend({
  components: { DatePicker, TimePicker },
  data: () => ({
    id: "",
    matiere: "",
    colleur: "",
    salle: "",
    date: null as null | string,
    start: null as null | string,
    end: null as null | string,
  }),
  methods: {
    add() {
      if (
        !this.date ||
        !this.start ||
        !this.end ||
        !this.id ||
        !this.matiere ||
        !this.colleur ||
        !this.salle
      )
        return;
      const date = new Date(Date.parse(this.date));
      const dateStart = new Date(date);
      const dateEnd = new Date(date);
      {
        const [hour, min] = this.start.split(":").map((el) => parseInt(el, 10));
        dateStart.setUTCHours(hour, min, 0);
      }
      {
        const [hour, min] = this.end.split(":").map((el) => parseInt(el, 10));
        dateEnd.setUTCHours(hour, min, 0);
      }

      this.$emit("add", {
        id: this.id,
        matiere: this.matiere,
        colleur: this.colleur,
        dateStart,
        dateEnd,
        salle: this.salle
      });
      this.id = ""
      this.matiere = ""
      this.colleur = ""
      this.date = null
      this.start = null;
      this.end = null
      this.salle = ""
    },
  },
});
</script>