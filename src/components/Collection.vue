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
watch(countryData, () => CollectionData.value = defineAsyncComponent(() => import("./CollectionData.vue")));


const emits = defineEmits([
  "collection-flag-click"
])

const flags = ref("")
onMounted(async() => flags.value = await getData(props.userData.uid)); 

</script>

<template>

<v-container fluid class="d-flex overflow-x-auto">
  <span 
   @click="emits('collection-flag-click', flag.api)"
   v-for="flag in flags" :key="flag"
   class="mx-1">
    <v-img width="100" :src="flag.img"></v-img>
    <p class="font-italic text-caption text-truncate" style="width: 100px;">
    {{flag.name}}
    </p>
  </span>
  <CollectionData v-if="Object.keys(props.countryData).length"
  :countryData="countryData" />
</v-container>

</template>


<style>

</style>