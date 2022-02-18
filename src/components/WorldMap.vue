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
watch(answer, () => {
  console.log("answer", answer.value);
  playing.value ? (game.value.judge(answer.value, question.value) ? next(question.value) : "" ): answer.value = ""
})
watch(playing, () => playing.value ? game.value = new Game(props.countries, map.value, markers.value, props.latlng): "")
watch(game, () => start())

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

const start = () => {
  console.log("start!");
  game.value.start()
  question.value = game.value.pushQuestion();
  emits("push-question", question.value);
}

const next = (prevQuestion) => {
  console.log("next!");
  console.log("data", game.value.data.length);
  map.value.removeLayer(prevQuestion.marker);
  if (game.value.data.length === 0) {
    clear();
  } else {
    question.value = game.value.pushQuestion();
    emits("push-question", question.value);
  }
}

const clear = () => emits("end-game", game.value.clear());

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