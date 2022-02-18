<script setup>
import { onMounted, ref } from "vue"

const props = defineProps({
  countries: Object,
  question: [Object, String]
})

onMounted(() => {
  // console.log(props.question);  
})
</script>

<template>
  <v-img :src="props.question.img" width="300">
  </v-img>
  {{ props.question.name }}
</template>

<style>

</style>