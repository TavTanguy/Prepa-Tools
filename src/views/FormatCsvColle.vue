<template>
  <div class="formatCsvColle">
    <v-text-field v-model="input" type="number" label="Groupe de colle" />
    <v-btn small @click="remove">Retirer les colles</v-btn>
    <v-btn color="primary" :diasbled="!input" @click="add"
      >Ajouter les colles</v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { convertToDate } from "../scripts/dateFormat";
import { getCsvFormat } from "../scripts/getFormatCsvColle";
export default Vue.extend({
  data: () => ({
    input: null as null | number,
  }),
  methods: {
    remove() {
      localStorage.removeItem("colles");
    },
    add() {
      if(this.input === null) return
      const str = getCsvFormat(this.input);

      const colles = str
        .split("\n")
        .map((el) => el.split(";"))
        .map((el) => ({
          id: el[0],
          matiere: el[1],
          colleur: el[2],
          salle: el[3],
          dateStart: convertToDate(el[4]),
          dateEnd: convertToDate(el[5]),
        }));
      localStorage.setItem("colles", JSON.stringify(colles));
    },
  },
});
</script>