<template>
  <div class="cmtMots">
    <title-under class="mt-5">Compteur de mots</title-under>
    <div class="d-flex mt-9 mx-2">
      <v-textarea
          id="textAreaCmtMots"
          v-model.trim="text"
          outlined
          background-color="white"
          placeholder="Entrez votre text ..."
          style="color: #80BF9B"
          auto-grow
          height="100%"
          autofocus
        />
      <div class="d-flex flex-column justify-space-evenly ml-10" style="width:25vw">
        <v-container>
          <v-row><label for="space">Espacement</label></v-row>
          <v-row class="ml-1">
            <div style="width:120px"><v-text-field v-model="spacing" name="space" dense flat class="d-inline-block centered-input" type="number" background-color="light" suffix="mots" solo /></div>
            <v-slider max="100" min="1" v-model="spacing"/>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <label for="delimiter">Marqueur</label>
            <div class="ml-3" style="width: 40px"><v-text-field v-model="delimiter" name="delimiter" dense flat class="d-inline centered-input" type="text" background-color="light" solo width="20px"/></div>
            </v-row>
        </v-container>
        <v-container>
          <v-row><label for="nbWord">Nombre de mots</label></v-row>
          <v-row class="ml-1">
            <div style="width:120px"><v-text-field v-model="nbWord" name="nbWord" dense flat class="d-inline centered-input" type="number" suffix="mots" background-color="light" solo/></div>
            <v-slider v-model="nbWord" max="1000" min="10"/>
          </v-row>
        </v-container>
        <v-container>
          <v-row><label for="margin">Marge +/-</label></v-row>
          <v-row class="ml-1">
            <div style="width:120px"><v-text-field v-model="margin" name="margin" dense flat class="d-inline centered-input" type="number" background-color="light" suffix="%" solo width="20px"/></div>
            <v-slider min="0" max="100" v-model="margin"/>
          </v-row>
        </v-container>
        <v-container>
          <v-row><label for="exceptions">Exceptions</label></v-row>
          <v-row class="ml-1">
            <v-combobox
              v-model="exceptions"
              name="exceptions"
              hide-selected
              multiple
              small-chips

              flat
              background-color="light"
              solo
              deletable-chips
            />
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="d-flex justify-space-between mt-3">
      <v-card class="d-flex pa-3 mx-3">
        <v-icon v-if="validText" color="primary" large>check</v-icon>
        <v-icon v-else color="error" large>close</v-icon>
        <p class="text-body-1 mb-0 ml-3" style="line-height: 36px;">{{nbWordsWritten}} mot{{nbWordsWritten > 1? "s":""}} / {{nbCharsWritten}} caractère{{nbCharsWritten > 1?"s":""}} </p>
      </v-card>
      <div>
        <label for="showDelimiters">Afficher les marquers d'espacement</label>
        <v-switch cl v-model="showDelimiter" name="showDelimiters" class="d-inline-block ml-3 mr-1"/>
        <btn-icon icon="mdi-content-copy" @click="toClipboard">Copier</btn-icon>
        <btn-icon icon="mdi-content-paste" @click="past">Coller</btn-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TitleUnder from "../components/Title.vue";
import BtnIcon from "../components/BtnIcon.vue";
import { getInfos } from "../scripts/compteurDeMots";

export default Vue.extend({
  components: {TitleUnder, BtnIcon},
  data: ()=>({
    text: "",
    spacing: 10,
    delimiter: "/",
    showDelimiter: false,
    nbWord: 100,
    margin: 10,
    exceptions: [],
    nbWordsWritten: 0,
    nbCharsWritten: 0,
    textDelimited: "",
    validText: false
  }),
  mounted(){
    const infoStr = localStorage.getItem("cmtMots");
    if(!infoStr) return
    
    const info = JSON.parse(infoStr)
    this.text = info.text
    this.spacing = info.spacing
    this.delimiter = info.delimiter
    this.showDelimiter = info.showDelimiter
    this.nbWord = info.nbWord
    this.margin = info.margin
    this.exceptions = info.exceptions
  },
  methods: {
    updateInfos(value: string){
      this.updateInfosNow(value)
    },
    updateInfosNow(value: string){
      
      if(this.delimiter.length !== 1) return;
      const info = getInfos(value, this.exceptions, this.delimiter, this.spacing, this.showDelimiter)
      this.nbWordsWritten = info.words;
      this.nbCharsWritten = info.chars;
      this.textDelimited = info.str;

      const textarea = document.getElementById("textAreaCmtMots") as HTMLTextAreaElement
      let start = textarea.selectionStart
      let end = textarea.selectionEnd;
      this.text = this.textDelimited;
      this.$nextTick().then(()=>{
        if(this.text.endsWith(this.delimiter +" " + this.text[this.text.length-1])){
          start += 3;
          end += 3;
        }
        textarea.setSelectionRange(start, end)
      })
      
      this.infoShowValidText()

      localStorage.setItem("cmtMots", JSON.stringify({
        text: this.text,
        spacing: this.spacing,
        delimiter: this.delimiter,
        showDelimiter: this.showDelimiter,
        nbWord: this.nbWord,
        margin: this.margin,
        exceptions: this.exceptions
      }))
    },
    toClipboard(){
      navigator.clipboard.writeText(this.text)
    },
    past(){
      navigator.clipboard.readText().then((text)=>this.text = text)
    },
    infoShowValidText(){
      this.validText = this.nbWordsWritten <= this.nbWord + this.nbWord * this.margin/100 && this.nbWordsWritten >= this.nbWord - this.nbWord * this.margin/100
    }
  },
  watch: {
    text(value){
      this.updateInfos(value)
    },
    exceptions(){
      this.updateInfos(this.text)
    },
    showDelimiter(){
      this.updateInfos(this.text)
    },
    delimiter(value: string, oldValue: string){
      if(oldValue.length === 1)
        this.text = this.text.replaceAll(oldValue + " ", "");
      if(value.length === 1)
        this.updateInfos(this.text)
    },
    spacing(){
      this.updateInfos(this.text)
    },
    nbWord(){
      this.infoShowValidText()
    },
    margin(){
      this.infoShowValidText()
    }
  },
})
</script>

<style scoped>
.cmtMots {
  width: 95vw;
  margin: auto;
}

.container {
  padding-bottom: 0;
  padding-top: 0;
}

.centered-input >>> input {
  text-align: center
}
</style>

<style>
.cmtMots .v-textarea .v-input__control {
  height: 100%;
}

.cmtMots .row{
  margin: inherit;
}
</style>