<script setup>
import { defineAsyncComponent, onMounted, reactive, ref } from "vue";
import { con } from "./config/config.js";
import { fetchCountryData, getRegions, getSubRegions } from "./models/countries.js"
import { median } from "./models/utils.js"

import WorldMap from './components/WorldMap.vue'
import Question from './components/Question.vue'

const resetKey = ref(0)
const data = reactive({
  // full: {},
  // regions: {},
  // subregions: {},
  // latlng: {},
  // scale: {},
  // current: {},
  // cs: {},
})
const Menu = defineAsyncComponent(() => {
  initData()
  return import('./components/Menu.vue');
});

const initData = async () => {
  console.log("initData!");
  data.full = await fetchCountryData(con.api)
  data.regions = getRegions(data.full)
  data.subregions = getSubRegions(data.full)
  data.latlng = con.initialize.latlng
  data.scale = con.initialize.scale
  data.countries = null
  data.playing = false
}

const getTargetCountries = (subregionName, data) => data.filter(d => d.subregion === subregionName);

const getCoordinateMDI = (data) => {
  let lat = [], lng = [];
  data.forEach(d => {
   lat.push(d.latlng[0]) 
   lng.push(d.latlng[1]) 
  });
  return [median(lat), median(lng)] 
}

const setData = (subregionName) => {  
  data.countries = getTargetCountries(subregionName, data.full)
  data.latlng = getCoordinateMDI(data.countries)
  data.current = subregionName
} 

const gameStart = () => data.playing = true; 
const gameEnd = () => {
  initData()
  resetKey.value ++
} 

const question = ref("")
const pushQuestion = (q) => question.value = q; 

</script>

<template>
  <v-app>
    <v-main>
      <h1 class="text-center">World Flag Collection</h1>
      <Menu v-if="!data.playing"
       :subregions="data.subregions"
       @menu-subregion-click="setData"/>
      <Question v-if="data.playing"
       :countries="data.countries"
       :question="question" />
      <template v-if="data.countries">
        <div class="d-flex justify-center">
          <h2>
            {{ data.current }}の{{ data.countries.length }}カ国を...
          </h2>
          <v-btn @click="gameStart">
            テストする
          </v-btn>
        </div>
      </template>
      <WorldMap :key="resetKey"
       :playing="data.playing"
       :countries="data.countries"
       :scale="data.scale || con.initialize.scale"
       :latlng="data.latlng || con.initialize.latlng"
       @end-game="gameEnd"
       @push-question="pushQuestion"/>
    </v-main>
  </v-app>
</template>
