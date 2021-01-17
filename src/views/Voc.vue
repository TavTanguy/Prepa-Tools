<template>
  <div class="text-center">
    <h1 class="text-h2">Entrainement vocabulaire</h1>
    <v-textarea
          v-model="words"
          name="input-7-1"
          label="Votre liste de mots séparé par / et ; entre les deux langues (ex: Hello;Bonjour / World;Monde)"
          value=""
          outlined
        ></v-textarea>
        <v-btn @click="lunch">Lancer</v-btn>
        <v-form class="d-flex">
          <p class="text-body-1">{{wordGess}}</p>
          <v-text-field outlined :error="invalidWord" v-model="write"/>
          <v-text-field outlined :value="showSolution? solution : ''" disabled/>
          <v-btn color="primary" @keydown="showTheSolution" @click="showTheSolution">Montrer</v-btn>
          <v-btn color="primary" @keydown.arrow-right="nextWord" @click="nextWord">Suivant</v-btn>
        </v-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  data: ()=>({
    words: "",
    listWordsGess: [] as Array<string>,
    indexWord: 0,
    wordGess: "",
    solution: "",
    showSolution: false,
    write: "",
    invalidWord: false
  }),
  mounted(){
    this.words = localStorage.getItem("voc") ?? ""
  },
  methods: {
    randomize(tab: Array<any>) {
      let i, j, tmp;
      for (i = tab.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          tmp = tab[i];
          tab[i] = tab[j];
          tab[j] = tmp;
      }
      return tab;
    },
    getRandomIntInclusive(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
    },
    lunch(){
      const couples = this.words.split("/")
      this.listWordsGess = this.randomize(couples)
      this.indexWord = 0
      this.nextWord();
      localStorage.setItem("voc", this.words)
    },
    nextWord(){
      this.indexWord += 1;
      this.showSolution = false
      this.invalidWord = false
      if(this.listWordsGess.length <= this.indexWord)
        this.indexWord = 0

      const couple = this.listWordsGess[this.indexWord].split(";")
      const i = this.getRandomIntInclusive(0, 1);
      this.wordGess = couple[i];
      this.solution = couple[(i + 1) % 2];
      this.write = ""
    },
    showTheSolution(){
      this.showSolution = true;
      
      if(this.write.toLowerCase().trim() != this.solution.toLowerCase().trim())
        this.invalidWord = true
    }
  }
})
</script>