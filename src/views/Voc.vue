<template>
  <div class="voc">
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>
        Ajouter des mots
        </v-card-title>
        <v-divider class="my-4"/>
        <v-card-text>
           <v-combobox
              v-model="inputWords"
              hide-selected
              multiple
              small-chips

              flat
              background-color="light"
              solo
              deletable-chips
              placeholder="ex: Français:French"
              label="Vos mots"
            />
          <label for="random">Ordre aléatoire de la liste</label>
          <v-switch v-model="randomOrder" name="random" class="d-inline-block ml-3 mr-1"/>

          <label for="randomDirection">Langue aléatoire de la liste</label>
          <v-switch v-model="randomDirection" name="randomDirection" class="d-inline-block ml-3 mr-1"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="light" @click="showDialog = false">Annuler</v-btn>
          <v-btn color="primary" x-large @click="saveWords">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn elevation="2" color="primary" style="bottom: 12px" fab large absolute bottom right @click="showDialog = true"><v-icon large>add</v-icon></v-btn>
    <title-under class="mt-5">Vocabulaire</title-under>
    <v-progress-linear class="mx-10 mt-8" color="light" :value="((showRes?currentIndex+1:currentIndex)/listWords.length) * 100" />
    <div class="mx-10 mt-8 d-flex justify-center">
      <v-btn class="mt-2 mr-10" color="light" text @click="start">Recommencer</v-btn>
      <v-badge
        class="d-inline-block"
        color="primary"
        :content="ask"
        left
      >
        <v-text-field solo v-model="input" @keydown="keyDown"/>
      </v-badge>
      <v-btn class="mt-2 ml-7" color="primary" @click="showRes=true">Valider</v-btn>
      <v-btn class="mt-2 ml-7" color="light" @click="next">Suivant</v-btn>
    </div>
    <p class="text-center" :class="colorText !== ''? colorText+'--text':''" v-show="showRes">Réponse: {{res}}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TitleUnder from "../components/Title.vue";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Vue.extend({
  components: {TitleUnder},
  data: ()=>({
    showDialog: false,
    inputWords: [] as string[],
    listWordsSelect: [] as string[][],
    input: "",
    currentIndex: 0,
    listWords: [] as string[][],
    showRes: false as boolean,
    randomOrder: false,
    randomDirection: false
  }),
  methods: {
    keyDown(ev: KeyboardEvent){
      switch (ev.code) {
        case "Enter":
          this.validWord()
          break;
        case "ArrowRight":
          this.next()
          break
      }
    },
    validWord(){
      if(!this.showRes)
        this.showRes = true;
      else
        this.next()
    },
    saveWords(){
      const words: string[][] = []
      this.inputWords.forEach(el=>{
        const l = el.split(":")
        if(l.length !== 2) return;
        words.push([...l])
      });
      localStorage.setItem("vocWords", JSON.stringify(words));
      this.listWordsSelect = words;
      this.showDialog = false;
      this.start();
    },
    start(){
      this.currentIndex = 0;
      
      let worlds = this.listWordsSelect;
      if(this.randomOrder){
        const worldRemaining = Array.from(worlds)
        worlds = []
        while(worldRemaining.length > 0){
          const i = getRandomInt(0, worldRemaining.length);
          worlds.push(worldRemaining[i])
          worldRemaining.splice(i, 1)
        }
      }
      if(this.randomDirection)
        worlds = worlds.map((el)=>Math.random()>0.5?el:[el[1], el[0]]);
      

      this.listWords = worlds;
      this.input = "";
      this.showRes = false
    },
    next(){
      this.input = "";
      this.showRes = false;
      const newIndex = this.currentIndex+1;
      if(newIndex >= this.listWords.length)
        this.start()
      else
        this.currentIndex = newIndex
    }
  },
  computed: {
    res(){
      const currentWord = this.listWords[this.currentIndex]
      return currentWord? currentWord[1] : ""
    },
    ask(){
      const currentWord = this.listWords[this.currentIndex]
      return currentWord ? currentWord[0] : ""
    },
    colorText(){
      if(this.input.toLowerCase() == this.res.toLowerCase())
        return "primary"
      if(this.input == "")
        return ""
      return "red"
    }
  },
  mounted(){
    const words = localStorage.getItem("vocWords");
    if(!words) this.showDialog = true;
    else{
      const listWords: string[][] = JSON.parse(words)
      this.inputWords = listWords.map(el=>el.join(":"));
      this.listWordsSelect = listWords;
      this.start()
    }
  }
})
</script>

<style scoped>
.voc {
  width: 95vw;
  margin: auto;
}
</style>