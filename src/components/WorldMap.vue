<script setup>
import { inject, onMounted, toRefs, watch, ref } from 'vue';
import { createMarker, onMapClick, onMarkerClick } from "../models/marker.js";
import { Game } from "../models/game.js";

const emits = defineEmits([
  "end-game",
  "push-question"
]);

const props = defineProps({
  playing: Boolean,
  countries: Object,
  scale: Number,
  latlng: Array,
});
 

const {playing} = toRefs(props);
const {latlng} = toRefs(props);

const map = ref({});
const markers = ref({})
const game = ref({})
const question = ref("")
const answer = ref("");

watch(latlng, () => updateView());
watch(answer, () => playing.value ? game.value.judge(answer.value, question.value.answer) : answer.value = "")
watch(playing, () => playing.value ? gameFacilitator(new Game(props.countries, map.value, markers.value, props.latlng)): "")

onMounted(() => initView());
const initView = () => {
  const L = inject("L");
  const options = {
    center: props.latlng,
    zoom: props.scale,
    scrollWheelZoom:false,
  }
  map.value = L.map("mymap", options);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
  L.control.scale().addTo(map.value);
}

const updateView = () => {
  console.log("updataView!");
  map.value.setView(props.latlng, props.scale)

  // removeMarker
  if (markers.value.length) {
    markers.value.forEach(marker => map.value.removeLayer(marker))
  }

  // addMarker
  if (props.countries) {
    markers.value = props.countries.map(c => createMarker(L, c).addTo(map.value)).map(marker => marker.on("click", (e) => answer.value = [e.latlng.lat, e.latlng.lng].toString()));
  }
}

const gameFacilitator = (gameData) => {
  game.value = gameData
  game.value.start()
  game.value.createQuestion()
  // emits question
  question.value = game.value.pushQuestion();
  emits("push-question", question.value);
  // loop
  // game.value.pushQuestion()
  // game.value.checkAnswer()
  
  // if (question.length) {
  //   nextQuesstion()
  // } else {
  //   game.clear()
  //   emits("end-game")
  // }
}

</script>

<template>
  <div class="d-flex justify-center">
    <div id="mymap"></div>
  </div>
</template>


<style scoped>
#mymap{
  width: 90%;
  height: 80vh;
}
</style>