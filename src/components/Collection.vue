<script setup>
import { onMounted, ref } from "vue";
import { getData } from "../models/database/firestore.js";
import { fetchCountryData } from "../models/countries.js";

const props = defineProps({
  userData: Object
});

const emits = defineEmits([
  "collection-flag-click"
])

const flags = ref("")
onMounted(async() => flags.value = await getData(props.userData.uid)); 

</script>

<template>
<h1>Collection</h1> 
<div class="d-flex">
  <span @click="emits('collection-flag-click', flag.api)" v-for="flag in flags" :key="flag">
    {{flag.name}}
    <v-img width="100" :src="flag.img"></v-img>
  </span>
</div>
</template>


<style>

</style>