<script setup>
import { ref } from "vue";

const emits = defineEmits([
  "close-result",
  "flag-click"
]);
const props = defineProps({
  result: Object
});

const correct = new Intl.NumberFormat("ja", {style: "percent"}).format(props.result.rate);
const max_get = Math.floor(props.result.data.length * props.result.rate);
const get = ref(0);
const flags = ref([]);
const getFlag = (e, data) => {
  const already = flags.value.findIndex(f => f.name === data.name);
  if (flags.value.length > 0 && already !== -1) {
    // already choiced
    get.value--;
    flags.value.splice(already, 1)
    return
  } else {
    get.value++
  }
  flags.value.push(data);
} 

</script>

<template>

<v-container>
  <v-card
  elevation="8" 
  class="pt-5">
     <v-list class="d-flex justify-center flex-wrap">
      <v-list-item v-for="data in flags" :key="data">
        <v-img
         width="100" :src="data.img">
        </v-img>
      </v-list-item>
    </v-list>

    <div class="d-flex align-center flex-column">
      <v-card-title class="text-h3 grey lighten-2">
        Result!
      </v-card-title>

      <v-card-title>
        正解率: {{ correct }}
      </v-card-title>
      <v-card-title>
        獲得数: {{ max_get }}
      </v-card-title>
    </div>

    <v-divider></v-divider>

    <v-list class="d-flex justify-center flex-wrap">
      <v-list-item v-for="data in props.result.data" :key="data">
        <v-img
         @click="get < max_get ? getFlag($event, data) : ''"
         width="100" :src="data.img">
        </v-img>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-list-item>
        {{ get }}/{{ max_get }}
      </v-list-item>
      <v-btn
        :disabled="get !== max_get"
        color="primary"
        text
        @click="emits('close-result', flags)"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-container>

</template>

<style>

</style>