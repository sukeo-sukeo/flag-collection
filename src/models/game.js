import { getRandomInt } from "./utils.js";

export class Game {
  constructor(data, map, markers, latlng) {
    this.data = data
    this.map = map
    this.markers = markers
    this.defaultLatlng = [latlng[0], latlng[1]]
    this.clearData = []
    this.ok = 0
    this.miss = 0
    // console.log("data", this.data.map(d => d.name.common));
    // console.log("map", this.map);
    // console.log("markers",this.markers.map(m => m._tooltip._content));
  }

  start() {
    // zoomup
    this.map.setView(this.defaultLatlng, 5)
  }
  
  clear() {
    alert("clear!")
  }

  gameOver() {
    alert("over...");
  }
  
  pushQuestion() {
    const i = getRandomInt(this.data.length - 1);
    return {
      question: this.data[i].latlng.toString(),
      img: this.data[i].flags.svg,
      name: this.data[i].translations.jpn ? this.data[i].translations.jpn.common : this.data[i].name.common,
      api_name: this.data[i].name.common,
      marker: this.markers[i],
      dataIdx: i
    };
  }

  judge(answer, question) {
    // console.log(answer, question.question);
    if (answer === question.question) {
      // alert("●")
      this.data.splice(question.dataIdx, 1)
      this.markers.splice(question.dataIdx, 1)
      this.clearData.push(question)
      this.ok ++
      return true
    } else {
      // alert("✖️")
      console.log("ぶっぶー");
      this.miss ++
      return false
    }
  }

  clear() {
    return {
      type: "clear",
      ok: this.ok,
      miss: this.miss,
      rate: this.ok / (this.ok + this.miss),
      data: this.clearData
    }
  }

}