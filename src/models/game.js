export class Game {
  constructor(data, map, markers, latlng) {
    this.data = data
    this.map = map
    this.markers = markers
    this.defaultLatlng = [latlng[0], latlng[1]]
    this.ok = 0
    this.miss = 0
    // console.log("data", this.data);
    // console.log("map", this.map);
    // console.log("markers",this.markers);
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

  createQuestion() {
    const questions = []
    this.data.forEach(d => {
      const question = {}
      question.answer = d.latlng.toString();
      question.flagImg = d.flags.svg;
      question.name = d.translations.jpn.common;
      questions.push(question)
    });
    this.questions = questions
  }
  
  pushQuestion() {
    return this.questions[0]
  }

  judge(answer, question) {
    console.log(answer, question);
    if (answer === question) {
      // alert("●")
      this.correct(question)
    } else {
      // alert("✖️")
      this.mistake()
    }
  }

  correct(question) {
    console.log(question);
    this.questions.splice(this.questions.findIndex(q => q.latlng === question), 1);
    this.ok++;
    this.next(question.answer);
  }

  mistake() {
    this.miss++;
  }

  next(prevQuestion) {
    console.log(prevQuestion);

  }

}