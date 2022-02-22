<script setup>
import { onMounted } from "vue";

const props = defineProps({
  countryData: Object
});

onMounted(() => {
  console.log(props.countryData);
})
</script>

<template>
  <div>
    <h1>datavue test</h1>
  </div>
</template>

<style>

</style>