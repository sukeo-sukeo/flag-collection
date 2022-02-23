<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  subregions: Array
});

const emits = defineEmits([
  "menu-subregion-click"
])

// console.log(props.subregions);

</script>
<template>
  <div class="d-flex flex-wrap justify-center">
    <v-btn class="my-1 mx-2"
     v-for="sr in props.subregions" :key="sr"
     @click="emits('menu-subregion-click', sr)">
      {{ sr }}
    </v-btn>
  </div>
</template>

<style>

</style>