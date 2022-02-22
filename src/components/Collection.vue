<script setup>
import { onMounted, ref, toRefs, watch, defineAsyncComponent, reactive, shallowRef, computed } from "vue";
import { getData } from "../models/database/firestore.js";

// import CollectionData from "./CollectionData.vue";

const props = defineProps({
  userData: Object,
  countryData: Object
});

const CollectionData = shallowRef({});
const {countryData} = toRefs(props)
watch(countryData, () => {
  console.log(countryData.value);
  CollectionData.value = defineAsyncComponent(() => import("./CollectionData.vue"))
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
  <CollectionData
  :countryData="countryData" />
</div>

</template>


<style>

</style>