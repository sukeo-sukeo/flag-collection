<script setup>
import { defineAsyncComponent, onMounted, reactive, ref } from "vue";
import { con } from "./config/config.js";
import { fetchCountryData, getRegions, getSubRegions } from "./models/countries.js"
import { median } from "./models/utils.js"
import { getData, addData,checkUserInFireStore, addUserInFireStore } from "./models/database/firestore.js"
import {login, logout, onAuthCheck} from "./models/auth/fireauth.js";

import WorldMap from './components/WorldMap.vue'
import Question from './components/Question.vue'
import Result from './components/Result.vue'
import Collection from './components/Collection.vue'

import {result_sample2} from "./config/sampleData.js";

const resetKey = ref(0)
const data = reactive({
  // full: {},
  // regions: {},
  // subregions: {},
  // latlng: {},
  // scale: {},
  // current: {},
  // cs: {},
});
const user = ref("");
(async () => {
  user.value = await onAuthCheck();
  console.log(user.value);
})()

const loginM = async () => {
  user.value = await login()
  console.log(user.value);
} 
const logoutM = () => {
  logout();
  user.value = ""
  }

const showCollection = ref(false)
const openCollection = () => showCollection.value = !showCollection.value;

const Menu = defineAsyncComponent(() => {
  initData()
  return import('./components/Menu.vue');
});

const initData = async () => {
  console.log("initData!");
  data.full = await fetchCountryData(con.api, "all")
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
const gameEnd = (flags) => {
  commitStore(flags)
  result.value = ""
  initData()
  resetKey.value ++
} 
const commitStore = (flags) => addData(flags, user.value.uid);

const result = ref("")
const showResultModal = (res) =>  result.value = res;

const question = ref("")
const pushQuestion = (q) => question.value = q; 

const collection = ref("")
const fetchCollection = (countryName) => {
  fetchCountryData(con.api, `name/${countryName}`)
}

</script>

<template>
  <v-app>
    <v-main>
      <v-btn @click="loginM">
        login
      </v-btn>
      <v-btn @click="logoutM">
        logout
      </v-btn>
      <v-btn @click="openCollection">
        collection
      </v-btn>
      <h1 class="text-center">World Flag Collection</h1>
      <Collection v-if="showCollection"
       :userData="user"
       @collection-flag-click="fetchCollection" />
      <Menu v-if="!data.playing"
       :subregions="data.subregions"
       @menu-subregion-click="setData"/>
      <Question v-if="data.playing"
       :countries="data.countries"
       :question="question" />
      <Result v-if="result" 
       :result="result"
       @close-result="gameEnd" />
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
       @end-game="showResultModal"
       @push-question="pushQuestion"/>
    </v-main>
  </v-app>
</template>
