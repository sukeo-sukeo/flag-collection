<script setup>
const props = defineProps({
  isLogin: Boolean
});
const emits = defineEmits([
  "login-click",
  "logout-click",
  "collection-click",
]);

</script>

<template>
<v-app-bar elevation="4" class="pl-5" style="height:60px;">
  <h1 class="text-center">
    World Flag Collection
  </h1>
  <v-btn @click="emits('login-click')"
   :disabled="props.isLogin">
    login
  </v-btn>
  <v-btn @click="emits('logout-click')"
   :disabled="!props.isLogin">
    logout
  </v-btn>
  <v-btn @click="emits('collection-click')"
   :disabled="!props.isLogin">
    collection
  </v-btn>
</v-app-bar>  
</template>

<style>

</style>