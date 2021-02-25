<template>
  <div class="colle">
    <v-dialog v-model="showDialogEdit" permanent>
      <v-card>
        <v-card-title>Paramètres de colles</v-card-title>
        <v-divider class="my-4" />
        <v-form @submit.prevent="saveEdit">
          <v-card-text>
            <v-textarea
              v-model="inputCsvColle"
              name="textColle"
              label="Colles"
              placeholder="Csv des colles"
              rows="5"
            ></v-textarea>
            Ajoute une colle:
            <add-colle @add="addColle"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="light" @click="showDialogEdit = false">Annuler</v-btn>
            <v-btn type="submit" color="primary" x-large>Valider</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-btn
      elevation="2"
      color="primary"
      style="bottom: 12px"
      fab
      large
      absolute
      bottom
      right
      @click="showDialogEdit = true"
      ><v-icon large>add</v-icon></v-btn
    >
    <v-card v-if="nextColle != {} && nextColle.dateStart" class="mb-9">
      <v-card-title> Prochaine Colle </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left"
                v-for="title in ['Identifiant', 'Colleur', 'Salle', 'Date']"
                :key="title"
              >
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ nextColle.id }}</td>
              <td>{{ nextColle.colleur }}</td>
              <td>{{ nextColle.salle }}</td>
              <td>{{ formatDate(nextColle.dateStart) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-data-table
      :headers="headerTable"
      :items="dataTable"
      :items-per-page="10"
      :sort-by="['date', 'start']"
      multi-sort
    >
      <template v-slot:[`item.date`]="{ item }">
        {{ item.showDate }}
      </template>
    </v-data-table>
    <div class="table-footer-prepend d-flex pl-2 align-center">
      <label style="font-size: 12px !important" class="mx-3 text-body-2"
        >Afficher les colles passé</label
      ><v-switch v-model="showOldColle" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  formatDate,
  formatGetDate,
  formatDay,
  convertToDate,
} from "../scripts/dateFormat";
import AddColle from "../components/AddColle.vue";

interface Colle {
  id: string;
  matiere: string;
  colleur: string;
  salle: string;
  dateStart: Date;
  dateEnd: Date;
}
export default Vue.extend({
  components: { AddColle },
  data: () => ({
    showDialogEdit: false,
    inputCsvColle: "",
    colles: [] as Colle[],
    showOldColle: false,
    headerTable: [
      { text: "Identifiant", value: "id" },
      { text: "Matière", value: "matiere" },
      { text: "Colleur", value: "colleur" },
      { text: "Date", value: "date" },
      { text: "Début", value: "start" },
      { text: "Fin", value: "end" },
    ],
  }),
  methods: {
    convertCsv() {
      this.colles = this.inputCsvColle
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
      localStorage.setItem("colles", JSON.stringify(this.colles));
    },
    formatDate(date: Date) {
      return formatDate(date);
    },
    saveEdit() {
      this.showDialogEdit = false;
      this.convertCsv();
    },
    addColle(colle: Colle){
      this.colles.push(colle)
      localStorage.setItem("colles", JSON.stringify(this.colles));
    }
  },
  mounted() {
    const input = localStorage.getItem("colles");
    if (input) {
      const colles = JSON.parse(input).map((el: any) => ({
        ...el,
        dateStart: new Date(el.dateStart),
        dateEnd: new Date(el.dateEnd),
      }));
      this.colles = colles;
    }
  },
  computed: {
    dataTable() {
      const now = new Date();
      return (this.showOldColle
        ? this.colles
        : this.colles.filter((el) => el.dateEnd > now)
      ).map((el) => ({
        ...el,
        date: el.dateStart.getTime(),
        showDate: formatGetDate(el.dateStart),
        start: formatDay(el.dateStart),
        end: formatDay(el.dateEnd),
      }));
    },
    nextColle() {
      if (this.colles.length === 0) return {};
      return this.colles
        .filter((el) => el.dateStart.getTime() > Date.now())
        .reduce((acc, val) => (val.dateStart < acc.dateStart ? val : acc));
    },
  },
});
</script>

<style scoped>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>