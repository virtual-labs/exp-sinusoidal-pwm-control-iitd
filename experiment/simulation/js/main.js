// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.hideAll()
  }
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    
box_img : new Dom("box_img"),
component_battery : new Dom("component_battery"),
component_capacitor : new Dom("component_capacitor"),
component_diode : new Dom("component_diode"),
component_inductor : new Dom("component_inductor"),
component_mosfet : new Dom("component_mosfet"),
component_register : new Dom("component_register"),
full_circuit : new Dom("full_circuit"),
full_circuit2 : new Dom("full_circuit2"),
circuit_full_2 : new Dom("circuit_full_2"),
circuit_full_3 : new Dom("circuit_full_3"),
graph_arrow : new Dom("part_3_graph_arrow"),
part_3_option_1 : new Dom("part_3_option_1"),
part_3_option_2 : new Dom("part_3_option_2"),
part_3_option_3 : new Dom("part_3_option_3"),
part_3_option_4 : new Dom("part_3_option_4"),
record_btn : new Dom("record_btn"),
part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_C : new Dom(".slider_C"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".slider-box"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3: new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),
graph1_arrow : new Dom("graph1_arrow"),
graph2_arrow : new Dom("graph2_arrow"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_3_option_4_graph : new Dom("part_3_option_4_graph"),
btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),
btn_record : new Dom(".btn-record"),
btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

btn_transparent: new Dom(".btn-transparent"),
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),
part_3_option_select : new Dom("part_3_option_select"),
part_1_text_for_crrct: new Dom("part_1_text_for_crrct"),
part_1_text_for_wrong: new Dom("part_1_text_for_wrong"),

// EE7 images added


    btn_check : new Dom("btn_check"),
    btn_delete : new Dom("btn_delete"),
    btn_record : new Dom("btn_record"),
    btn_reset : new Dom("btn_reset"),
    component_capacitor : new Dom("component_capacitor"),
    component_inductance : new Dom("component_inductance"),
    component_switch_1 : new Dom("component_switch_1"),
    component_switch_2 : new Dom("component_switch_2"),
    component_switch_3 : new Dom("component_switch_3"),
    component_switch_4 : new Dom("component_switch_4"),
    part_1_circuit : new Dom("part_1_circuit"),
    part_1_correct_text : new Dom("part_1_correct_text"),
    part_2_1_heading : new Dom("part_2_1_heading"),
    part_2_2_heading : new Dom("part_2_2_heading"),
    part_2_3_circuit : new Dom("part_2_3_circuit"),
    part_2_select_option : new Dom("part_2_select_option"),
    part_2_select_option_1 : new Dom("part_2_select_option_1"),
    part_2_select_option_2 : new Dom("part_2_select_option_2"),
    part_2_select_option_3 : new Dom("part_2_select_option_3"),



//EE3 img added
box1 : new Dom("box1"),
box2 : new Dom("box2"),
box3 : new Dom("box3"),
box4 : new Dom("box4"),
box5 : new Dom("box5"),
box6 : new Dom("box6"),
part1_circuit : new Dom("part1_circuit"),
part1_component_capacitor : new Dom("part1_component_capacitor"),
part1_component_diode : new Dom("part1_component_diode"),
part1_component_inductor : new Dom("part1_component_inductor"),
part1_component_mosfet : new Dom("part1_component_mosfet"),
part1_component_resistance : new Dom("part1_component_resistance"),
part1_component_voltage : new Dom("part1_component_voltage"),
part_3_option_5 : new Dom("part_3_option_5"),

part1_crrct_text : new Dom("part1_crrct_text"),
part1_incrrct_text : new Dom("part1_incrrct_text"),
part1_crrct_circuit : new Dom("part1_crrct_circuit"),
ee3_btn_check : new Dom(".ee3-btn-check"),
ee3_btn_reset : new Dom(".ee3-btn-reset"),
ee3_btn_hint : new Dom(".ee3-btn-hint"),
part4_table_graph : new Dom("part4_table_graph"),

//ee3 symbol imgs added

symbol_vIn : new Dom("symbol_vIn"),
symbol_L : new Dom("symbol_L"),
symbol_C : new Dom("symbol_C"),
symbol_S : new Dom("symbol_S"),
symbol_D : new Dom("symbol_D"),
symbol_R : new Dom("symbol_R"),

part_2_graph_data_upper: new Dom("part_2_graph_data_upper"),

concept_development : new Dom(".concept_development"),

// EE3 dom items added

part1_box1 : new Dom(".part1_box1"),




     
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


 //! to change header
 experiment_heading: new Dom(".experiment_heading"),

 chart: [
  graph1=null,
  graph2=null,
  graph3=null,
  graph4=null,
  graph5=null,
  graph6=null,
  graph7=null,
  graph8=null,
  graph9=null,
  graph10=null,
 ],

 chart: {
  label1:{
    x: "Label 2",
    y: "Label 1",
  },
  label2:{
    x: "Label 2",
    y: "Label 1",
  },
  label3:{
    x: "Label 2",
    y: "Label 1",
  },
  label4:{
    x: "Label 2",
    y: "Label 1",
  },
  label5:{
    x: "Label 2",
    y: "Label 1",
  },
  label6:{
    x: "Label 2",
    y: "Label 1",
  },
  label7:{
    x: "Label 2",
    y: "Label 1",
  },
  label8:{
    x: "Label 2",
    y: "Label 1",
  },
  label9:{
    x: "Label 2",
    y: "Label 1",
  },
  label10:{
    x: "Label 2",
    y: "Label 1",
  },
 } 



  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },

  changeHeader(step){
    return
    let heading = Scenes.items.experiment_heading
    switch(step){
      case 1: heading.setContent("Ideal-Characteristics")
      break;
      case 2: heading.setContent("Non-Ideal-Characteristics")
      break;
      case 3: heading.setContent("Losses And Efficiency")
      break;
      case 4: heading.setContent("Component Stress")
      break;
    }
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().zIndex(6000).item;

      Scenes.items.concept_development.set().styles({
        zIndex: "5000",
        scale: "0.98 0.914",
        top: "-144px",
        position: "absolute",
      })

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),  
    
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()
      // Scenes.items.btn_reset_connections.styles({
      //   position: "absolute",
      //   right: 0,
      //   top: "195px",
      //   backgroundColor: "blue",
      //   color: "white",
      // })

      // Scenes.setStepHeading("Step-1", "Circuit Formulation");
      Scenes.changeHeader("1")
      // Scenes.showPopup(1)

      // Scenes.items.btn_popup_box.styles({
        // display : "none"
      // })

      // Scenes.items.changeHeader.setContent("sneha")
      setCC("Connect all the terminals correctly to form the circuit")

      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_circuit.set(175, 116, 328)
      Scenes.items.component_switch_1.set(40+40,-45, 112)
      Scenes.items.component_switch_2.set(40+40 + 110,-45, 112)
      Scenes.items.component_switch_3.set(40+40 + 110 + 110,-45, 112)
      Scenes.items.component_switch_4.set(40+40 + 110 + 110 + 110,-45, 112)
      Scenes.items.component_inductance.set(40+40+110+110+110+110, -5,  61)
      Scenes.items.component_capacitor.set(40+40+110+110+110+110+110, -15,  65, 58)

      Scenes.items.btn_check.set(865-80, -40, 45).zIndex(1)
      Scenes.items.btn_reset.set(865, -40, 45).zIndex(1)
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){
          setCC("Well Done, This is 'single-phase bridge inverter'")

          // * destroy all the connection
          Scenes.items.btn_reset.item.click()
          getAll(".jtk-endpoint").forEach(ele=>{
            ele.style.display = "none"
          })
          let switches = [
            Scenes.items.component_switch_1.zIndex(1),
            Scenes.items.component_switch_2.zIndex(1),
            Scenes.items.component_switch_3.zIndex(1),
            Scenes.items.component_switch_4.zIndex(1).set(null,null,null,78),
          ]
          // ! swtich for different places
          function setSwitchOnDifferentPlaces(){
            let edges = allConnectedVertexSrcDest
            let tempSwitches = new Array(...switches)
            let defaultIdxSrc = {
              1: 0,
              3: 1,
              5: 2,
              7: 3,
            }
            let defaultIdxDest = {
              13: 0,
              15: 1,
              17: 2,
              19: 3,
            }
            // ! suffling the array index according to connection
            switches[defaultIdxDest[edges[1]]] = tempSwitches[defaultIdxSrc[1]]
            switches[defaultIdxDest[edges[3]]] = tempSwitches[defaultIdxSrc[3]]
            switches[defaultIdxDest[edges[5]]] = tempSwitches[defaultIdxSrc[5]]
            switches[defaultIdxDest[edges[7]]] = tempSwitches[defaultIdxSrc[7]]
          }
          setSwitchOnDifferentPlaces()
          let components = [
            ...switches,
            Scenes.items.component_inductance.zIndex(1),
            Scenes.items.component_capacitor.zIndex(1),
          ]
          let left_pxs = [341, 532, 341, 532, 646, 704]
          let top_pxs = [124, 124, 324, 324, 227, 267]

          // send to final position of compos
          let anim = anime.timeline({
            duration: 1200,
            easing: "easeInOutQuad",
          })
          for(let i in left_pxs){
            let complete = ()=>{}
            if(i == left_pxs.length-1){
              complete = ()=>{
                anime({
                  targets: Scenes.items.part_1_correct_text.set(null).item,
                  top: 0,
                  height: 100,
                  duration: 1200,
                  easing: "easeInOutQuad",
                  complete(){
                    setCC("Click 'Next' to go to next step");
                    Dom.setBlinkArrow(true, 790, 415).play();
                    setIsProcessRunning(false);
                  }
                })
              }
            }
            anim.add({
              targets: components[i].item,
              left: left_pxs[i],
              top: top_pxs[i],
              complete: complete,
            })
          }
        }
        else{
          setCC("Incorrect connections, try again")
          let st = {
            color:"red",
            backgroundColor: "white",
            display: "block",
            width: "153px",
            height: "fit-content",
            padding: "10px",
            fontSize: "23px",
          }
          let msg = Scenes.items.tempTitle30.set(23,313).setContent("Incorrect Connections, try again!").styles(st)
          anime({
            targets: msg.item,
            duration: 1000,
            opacity: [0,1],
            loop: 2,
            easing: "linear",
            complete(){
              setTimeout(() => {
                $(msg.item).hide("fast")
                Dom.setBlinkArrowRed(-1)
              }, 4000);
            }
          })
          Dom.setBlinkArrowRed(true,885,10,30,null,90).play()

        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 25
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* for multiple connection switches point
          let xSwitchAxis = [1,3,5,7]
          let ySwitchAxis = [2,4,6,8]
          let xSwitchPosAxis = [13,15,17,19]          
          let ySwitchPosAxis = [14,16,18,20] 
          
          let xEdge = [xSwitchAxis, ySwitchAxis]
          let yEdge = [xSwitchPosAxis, ySwitchPosAxis]
          for(let edge_idx in xEdge){  
            for(let x_edge of xEdge[edge_idx]){
              for(let y_edge of yEdge[edge_idx]){
                matricesForCheckGraph[x_edge][y_edge] = 1
                matricesForCheckGraph[y_edge][x_edge] = 1
              }
            }
          }
          //* fixed connection is filled
          let xAxisFixed = [9,10,11,12]
          let yAxisFixed = [21,22,23,24]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          let minimumConnectionsLength = 12
          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              // saving value as object key:value src:dest
              var minVertexSrcIdx = Math.min(vertexSrcIdx,vertexDestIdx)
              var maxVertexDestIdx = Math.max(vertexSrcIdx,vertexDestIdx)
                  
              allConnectedVertexSrcDest[minVertexSrcIdx] = maxVertexDestIdx
            }

            // ! Matched Graph 
            let isGraphMatched = false
            // ! check graph condition is matched or not
            function forCheckGraphIsMatched(){
              var destFor = allConnectedVertexSrcDest
              for(let src in destFor){
                src = Number(src)
                let dest = destFor[src]
                console.log("src:",src,"dest:",dest)
                // * match with graph
                if(!matricesForCheckGraph[src][dest]){
                  isGraphMatched = false
                  return
                }
                let src_1 = Number()
                let src_2 = Number()
                // ODD
                if(src & 1){ 
                  src_1 = src
                  src_2 = src+1
                  if(destFor[src_2] == destFor[src_1] + 1){
                    isGraphMatched = true
                  }else{
                    isGraphMatched = false
                    return
                  }
                }
                // EVEN 
                else{
                  src_1 = src
                  src_2 = src-1
                  if(destFor[src_2] == destFor[src_1] - 1){
                    isGraphMatched = true
                  }else{
                    isGraphMatched = false
                    return
                  }
                }
                // delete destFor[src_1]
                // delete destFor[src_2]
              }
            }
            console.log(allConnectedVertexSrcDest,isGraphMatched)
            forCheckGraphIsMatched()

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == 12){
              Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1){
              let radius = 8
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: "#c00000" },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: "#c00000", strokeWidth: 6 },
                connector: ["Bezier", { curviness: -60 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            var exampleEndpoint1 = setEndPoint()
            var exampleEndpoint2 = setEndPoint()
            var exampleEndpoint3 = setEndPoint()
            var exampleEndpoint4 = setEndPoint()
            var exampleEndpoint5 = setEndPoint()
            var exampleEndpoint6 = setEndPoint()
            var exampleEndpoint7 = setEndPoint()
            var exampleEndpoint8 = setEndPoint()
            var exampleEndpoint9 = setEndPoint()
            var exampleEndpoint10 = setEndPoint()
            var exampleEndpoint11 = setEndPoint()
            var exampleEndpoint12 = setEndPoint()

            function addEndPoints(){
              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              // conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );

              // conn 3
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              // conn 4
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              // conn 5
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );

              // conn 6
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );

              // conn 7
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex13",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex17",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex15",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );

              // conn 8
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );
              instance.addEndpoint(
                "vertex16",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

              instance.addEndpoint(
                "vertex18",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );
              instance.addEndpoint(
                "vertex20",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );

              // conn 9
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );

              //* conn 10
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint12
              );
              instance.addEndpoint(
                "vertex22",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint12
              );

              //*conn 11
              instance.addEndpoint(
                "vertex11",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex23",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );

              //*conn 12
              instance.addEndpoint(
                "vertex12",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );
              instance.addEndpoint(
                "vertex24",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint6
              );

              //! till this mention correct connection numbering except switch 2, 3, 4 
              //*conn 7
              instance.addEndpoint(
                "vertex23",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );
              instance.addEndpoint(
                "vertex22",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint7
              );

              //*conn 8
              instance.addEndpoint(
                "vertex14",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint8
              );

              //*conn 9
              instance.addEndpoint(
                "vertex19",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint9
              );

              //*conn 10
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint10
              );

              //*conn 11
              instance.addEndpoint(
                "vertex21",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint11
              );
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),
  //   (step2 = function () {
  //     setIsProcessRunning(true);
  //     // * destroy all the connection
  //     Scenes.items.btn_reset.item.click()
  //     getAll(".jtk-endpoint").forEach(ele=>{
  //       ele.style.display = "none"
  //     })
  //     Scenes.setStepHeading(
  //       "Step-2",
  //       "Voltage and current waveforms."
  //     )
      
  //     Scenes.items.btn_next.show();
  //     function stepTutorial2(){

  //       setCC("Select V<sub>in</sub>")
  //         Dom.setBlinkArrowRed(true,110,89,30,30,90).play()
          
  //         sliders.selectOp1.oninput = ()=>{
  //           Dom.setBlinkArrowRed(true,270,89,30,30,90).play()
  //           setCC("Select R")

  //           sliders.selectOp2.oninput = ()=>{
  //             Dom.setBlinkArrowRed(true,440,89,30,30,90).play()
  //             setCC("Select Turns ratio")
      
  //             sliders.selectOp3.oninput = ()=>{
  //               Dom.setBlinkArrowRed(true,98,144,30,30,90).play()
  //               setCC("Select D")
        

  //             sliders.slider.onclick = ()=>{
  //               Dom.setBlinkArrowRed(true,400,8,30,30,90).play()
  //               setCC("Press Record")   

  //             }
  //           }
  //         }
  //       }
  //     }
  //     stepTutorial2()
      
   

  // //! Required Items
  // Scenes.items.btn_record.set(355, -40)
  // Scenes.items.slider_box.set(40,25)
  // sliders.generateOptionsFor(-1)


  // Scenes.items.new_part_2_circuit_full.set(10,155, 220)
  // Scenes.items.slider_box.item.style.scale = "0.9";
  // // sliders.hideSliderAndOption(0)


  
  // // * for bigger screen
  // /*
  // let l = 465
  // let t = -75
  // let h = 474
  // let w = 470
  // Scenes.items.part_2_graph_data_upper.set(l,t,h,w).zIndex(2).hide()
  // */
  // let l = 530
  // let t = -79
  // let h = 480
  // let w = 405
  // // Scenes.items.part_2_graph_data_upper.set(l-50,t,h,w+58).zIndex(2).hide()
  // Scenes.items.part_2_graph_empty.set(l, t, h, w).hide();
  // Scenes.items.new_part_2_graph_1.set(l, t, h, w).hide();
  // Scenes.items.new_part_2_graph_2.set(l, t, h, w).hide();
  // Scenes.items.new_part_2_graph_3.set(l, t, h, w).hide();
       
  // // ! temp values and text
  // let st = {
  //   backgroundColor: "white",
  //   border: "2px solid black",
  //   color: "black",
  //   borderRadius: "0",
  //   width: "fit-content",
  //   textAlign: "center",
  //   padding: "0",
  //   fontSize: "0.7rem",
  //   lineHeight: "13px"
  // }
  // let textLabels = [
  //   // ! iL
  //   iL = Scenes.items.tempTitle24.set(891,21).setContent("0 A").styles(st).hide(),
    
  //   // ! iIn

  //   iInOn = Scenes.items.tempTitle25.set(613,-7).setContent("0 V").styles(st).hide(),
  //   iInOff = Scenes.items.tempTitle26.set(813,-7).setContent("0 V").styles(st).hide(),

  //   // ! vL

  //   vLon = Scenes.items.tempTitle27.set(614,69).setContent("0 us").styles(st).hide(),
  //   vLoff = Scenes.items.tempTitle28.set(893,125).setContent("0 us").styles(st).hide(),

  //   // ! vSw

  //   vSwon = Scenes.items.tempTitle29.set(618,157).setContent("0 V").styles(st).hide(),
  //   vSwoff = Scenes.items.tempTitle30.set(814,155).setContent("0 V").styles(st).hide(),

  //   // ! vDf
    
  //   vDfon = Scenes.items.tempTitle32.set(621,212).setContent("0 V").styles(st).hide(),
  //   vsDfoff = Scenes.items.tempTitle33.set(812,213).setContent("0 V").styles(st).hide(),

  //   // ! iC

  //   iCon = Scenes.items.tempTitle34.set(620,293).setContent("0 A").styles(st).hide(),
  //   iCoff = Scenes.items.tempTitle35.set(814,252).setContent("0 A").styles(st).hide(),

  //   // ! vC
    
  //   vC = Scenes.items.tempTitle36.set(844,318).setContent("0 V").styles(st).hide(),
  // ]    
 
  //     let currentGraph = Scenes.items.part_2_graph_empty

       
  //     // *  chage the step size of the sliders
  //     // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
  //     let dutyRatioSlider = Scenes.items.slider_D.item;
  //     dutyRatioSlider.min = "0.25";
  //     dutyRatioSlider.max = "0.75";
  //     dutyRatioSlider.step = "0.25";
  //     get(".slider_D_input").value = "0.25";
      
  //     let isOneTimeOver = false
  //     // ! onclick for record
  //     Scenes.items.btn_record.item.onclick = function () {
  //       Dom.setBlinkArrowRed(-1)
  //       // ! Activate the next btn right after the click
        
        
  //       let vInValue = Number(sliders.selectOp1.value)
  //       let dutyRatioValue = Number(sliders.slider.value)
  //       let resistanceValue = Number(sliders.selectOp2.value)
  //       let nValue = Number(sliders.selectOp3.value)

  //       updateValues(vInValue,dutyRatioValue,resistanceValue)

  //       // setting values from formulas
  //       function setTempTitleAndValues(showValues=false,vInValue=0){  
    
  //         let v0 = Number(parseFloat(Formulas.step2.v0(values)).toFixed(1))
  //         let iIn  = Number(parseFloat(Formulas.step2.iIn(values)).toFixed(1))
  //         let iL = Number(parseFloat( iIn / dutyRatioValue).toFixed(1))

  //         let textValues = [
  //           iLArr = `${ iIn / dutyRatioValue}A`,

  //           iInOn = `${iIn}A`,
  //           iInOff = `${ 0 }A`,

  //           vLon = `${ vInValue }V`,
  //           vLoff = `${ -v0 / nValue}V`,

  //           vSwon = `${ 0}V`,
  //           vSwoff = `${ vInValue + (v0/nValue)}V`,

  //           vDfon = `${ ((nValue * vInValue) + v0)}V`,
  //           vDfoff = `${ 0}V`,

  //           iCon = `${ parseFloat(-v0 / resistanceValue).toFixed(1)}A`,
  //           iCoff = `${ parseFloat((iL / nValue) - (v0 /resistanceValue)).toFixed(1)}A`,

  //           vC = `${v0}V`,
  //         ]  

  //         console.log("values",iL,nValue,v0,resistanceValue)
      
  //         // also show the all values and graph uppper image
  //         // Scenes.items.part_2_graph_data_upper.show()
  //         if(showValues){
  //           textLabels.forEach((ele,idx)=>{
  //             ele.setContent(textValues[idx]).show()
  //           })
  //         }


  //       }
  //       setTempTitleAndValues(true,vInValue)


  //       if (dutyRatioValue == 0.25){
  //         currentGraph.hide();
  //         Scenes.items.new_part_2_graph_1.show();
  //         currentGraph = Scenes.items.new_part_2_graph_1;
  //       }
  //       if (dutyRatioValue == 0.5){
  //         currentGraph.hide();
  //         Scenes.items.new_part_2_graph_2.show();
  //         currentGraph = Scenes.items.new_part_2_graph_2;
  //       }
  //       if (dutyRatioValue == 0.75){
  //         currentGraph.hide();
  //         Scenes.items.new_part_2_graph_3.show();
  //         currentGraph = Scenes.items.new_part_2_graph_3;
  //       }
  //       // setIsProcessRunning(false);
  //       // Dom.setBlinkArrow(true, 630, 315)

  //       // speak test
  //       if(isOneTimeOver==false){
  //         setCC("For the these set input voltage and duty ratio, various component voltage and current waveforms are displayed here.",6)
  //         isOneTimeOver = true
  //       }

  //       // after complete
  //       setTimeout(()=>{
  //         Dom.setBlinkArrow(true, 790, 408).play()
  //         // setCC("Click 'Next' to go to next step")
  //         setIsProcessRunning(false)
  //       },5000)
  //     };
      


      
  //     return true
  //   }),
    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "Performance Analysis.");
      setCC("Click on the 'ICON' to plot the performance characteristics.")
      
      // * remove all previous restrictions
      
      // ! Required Elements

      Scenes.items.part_2_select_option.set(78, -73, 485)
      Scenes.items.part_2_select_option_1.set(513-165, -46, 99).zIndex(2)
      Scenes.items.part_2_select_option_2.set(513-350, 289, 99).zIndex(2)
      Scenes.items.part_2_select_option_3.set(513, 289, 99).zIndex(2)

      // Scenes.items.circuit_full_2.set(6,40,230)
      // Scenes.items.new_part_3_select_option_full.set(-11, -59, 463, 800)
      // Scenes.items.new_part_3_select_option_1.set(203, -19, 190, 267).zIndex(2)
      // Scenes.items.new_part_3_select_option_2.set(474, -18, 189, 262).zIndex(2)
      // Scenes.items.new_part_3_select_option_3.set(204, 175, 190, 265).zIndex(2)
      // Scenes.items.new_part_3_select_option_4.set(474, 176, 189, 270).zIndex(2)
      // // hide the slider
      Scenes.items.slider_box.hide()

      let rightTicks = [
        Scenes.items.right_tick_1.set(20,280).hide(),
        Scenes.items.right_tick_2.set(208,280).hide().zIndex(2001),
        Scenes.items.right_tick_3.set(435,280).hide(),
        Scenes.items.right_tick_4.set(630,280).hide()
      ]

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }

      // resetSliderValue()
      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_2_select_option_1,
        Scenes.items.part_2_select_option_2,
        Scenes.items.part_2_select_option_3,
      ]

      // ! Destroy Graphs
      function destroyGraphs(){
        for(let i=0;i<7;i++){
          if(Scenes.items.chart[i]!=null){
            Scenes.items.chart[i].destroy()
          }
        }
      }
      // destroyGraphs()

      
      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[4]()
      }
      const opTwo = ()=>{
       

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[5]()
      }
      const opThree = ()=>{
        

        Scenes.optionsDone[2]=1;
        Scenes.forMathematicalExpressionBtn = 3
        Scenes.steps[6]()
      }
  
      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      // rightTicks[2].item.onclick = opThree

      // ! if all options done then exit
      let exit = true
      for(let i of Scenes.optionsDone){
        if(i==0){
          exit = false
          break
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
      }

      return true;

    }),
    (step4 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.changeHeader(1)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
        // sliders.changeHeader(2, "Turns Ratio")
      // Scenes.items.slider_box.set(-27,-93).scale(0.76) 
      Scenes.items.slider_box.set(10,-69).scale(1) 
      Scenes.items.btn_next.show()
      sliders.generateOptionsFor(0)


    //* for checking the conclusion text  
      // conclusionFront = "Here, the fundamental component of load voltage increases and total harmonic distortion decreases with increasing modulation index."
      // Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
      
      //! Required Items
      Scenes.items.part_2_1_heading.set(235,-83, 60)
      // Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_one.set(25,196, null).scale(0.8)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640+20,-78, 45)
      Scenes.items.btn_delete.set(740+20,-78, 45)
       Scenes.items.btn_reset.set(840+20,-78, 45)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_one.item
       let tableColumnMax = table.tBodies[0].rows[0].cells.length
       let tableRowMax = table.tBodies[0].rows.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[5].cells[4].innerHTML==""?0:6)


      // ! graph
      // let graph_height = 200
      // let graph_width = 355
      
      let graph_height = 220
      let graph_width = 310
      
      Scenes.items.graph_box_1.set(null, -25, 235, 333)
      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph1.item

      // Scenes.items.graph_box_2.set(null, 190, 220)
      // Scenes.items.graph2.set(null,null,graph_height,graph_width)
      Scenes.items.graph_box_2.set(260, -25, 235, 333)
      Scenes.items.graph2.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph2.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label1.x
      let yLabel = Scenes.items.chart.label1.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label2.x
      let yLabel2 = Scenes.items.chart.label2.y
      let dataLabel2 = "Data2"

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)

        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        Scenes.items.yLabel.set(533,84).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel.set(732, 185).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })
        // for label2
        Scenes.items.yLabel2.set(190,84).setContent(yLabel2).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel2.set(380,185).setContent(xLabel2).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx]
        let graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          graphRef2.destroy()
        }
        
        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 65
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,62-topMinus,30,30,90).play()
        setCC("Select V<sub>in</sub>")
        
        // sliders.selectOp1.oninput = ()=>{
        //   Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
        //   setCC("Select R")
        // }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,69,95-topMinus,30,30,90).play()
          setCC("Select M")
        }
        // sliders.selectOp3.oninput = ()=>{
        //       Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
        //       setCC("Select M")
        //     }
              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,695, -37,30,30,90).play()
                setCC("Press Record")                
              }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      //slider aaraha he yaha se 
      // generate option
      // sliders.generateOptionsFor(0)
      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

          
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          ,xLabel = "Modulation Index (M)"
          ,yLabel = "V<sub>01</sub>"
          ,xLabel2 = "Modulation Index (M)"
          ,yLabel2 = "THD(%)",
          tableModulationIdx = 2,
          tableV01Idx = 5,
          tableThdIdx = 9
          for(let i=0;i<n;i++){
            let x = rows[i].cells[tableModulationIdx].innerHTML
            let y = rows[i].cells[tableV01Idx].innerHTML

            let x2 = rows[i].cells[tableModulationIdx].innerHTML
            let y2 = rows[i].cells[tableThdIdx].innerHTML

            graphData.push({x: x,y: y})
            graphData2.push({x: x2,y: y2})
          }
          // ! setDefault two values in it
          function setDefaultLowHighInGraph(graphNumber){
            // D value
            let low = 0, high = 0.95,x = 0,y = 0
            updateValues(sliders.selectOp1.value,low,sliders.selectOp2.value)
            x = low
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.unshift({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.unshift({x: x, y: y})
            }

            updateValues(sliders.selectOp1.value,high,sliders.selectOp2.value)
            x = high
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.push({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.push({x: x, y: y})
            }
          }
          // setDefaultLowHighInGraph(1)
          // setDefaultLowHighInGraph(2)

          //for labeling
          let conclusionFront = ""

          conclusionFront = "Here, the fundamental component of load voltage increases and total harmonic distortion decreases with increasing modulation index."



          // switch(characteristicsValue){

          //   case  'D-vs-M': 
          //     yLabel = "Voltage Gain (M)"
          //     conclusionFront = "The voltage gain linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observations is that the voltage gain linearly increases with increasing duty ratio in ideal case.")
          //     break

          //   case  'D-vs-I': 
          //     yLabel = "I (A)"
          //     conclusionFront = "The load current linearly increases with increasing duty ratio."
          //     setCC("The conclusion of these observation is that the load current linearly increases with increasing duty ratio.")
          //     break

          //   case  'D-vs-V': 
          //     yLabel = "V (V)"
          //     conclusionFront = "The Load voltage linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observation is that the load voltage linearly increases with increasing duty ratio for ideal case.")
          //     break
          // }

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle1.set(null,100).setContent(conclusionFront).addClass("conclusion").item
          // )

            Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

            setCC("Here, the fundamental component of load voltage increases and total harmonic distortion decreases with increasing modulation index.")


          
          Scenes.items.chart.label1.x = xLabel
          Scenes.items.chart.label1.y = yLabel

          Scenes.items.chart.label2.x = xLabel2
          Scenes.items.chart.label2.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
          Scenes.items.graph1.set(null,null,graph_height,graph_width)
          Scenes.items.graph2.set(null,null,graph_height,graph_width)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[5].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 3

        // ! change the table column index who's changing
        let changeableColumnIndx = 3

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i<tableColumnMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph1.set(null,null,graph_height,graph_width)
        Scenes.items.graph2.set(null,null,graph_height,graph_width)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
          sliders.generateOptionsFor(0)
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[4]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp2.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" ){
          setCC("Select V<sub>in</sub> value first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        if(recordBtnClickIdx < tableRowMax-1){
          Dom.setBlinkArrowRed(true,69,95-topMinus,30,30,90).play()
          // Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
          setCC("Select M.")
        }
        else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < 6 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=6){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let sortAccording = 2
            let n=6
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                    let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 3
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }

        let ansArr = Formulas.multipulse.valueSet(vInValue, dutyRatioValue)

        console.log(ansArr)

        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = Number(ansArr[0]).toFixed(2)
        tableRow.cells[4].innerHTML = Number(ansArr[1]).toFixed(2)
        tableRow.cells[5].innerHTML = Number(ansArr[2]).toFixed(2)
        tableRow.cells[6].innerHTML = Number(ansArr[3]).toFixed(2)
        tableRow.cells[7].innerHTML = Number(ansArr[4]).toFixed(2)
        tableRow.cells[8].innerHTML = Number(ansArr[5]).toFixed(2)
        tableRow.cells[9].innerHTML = Number(ansArr[6]).toFixed(2)
        // tableRow.cells[4].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.nonIdeal.iIn(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.ideal.i0(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.ideal.p0(values)).toFixed(2)

        //!previous values 
        // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==6){
          setCC("Press Record")
          Dom.setBlinkArrowRed(true,750-leftMinus,30-topMinus,30,30,90).play()
        }
      }    
       
      

      
      return true
    }),
    (step5 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.changeHeader(2)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
        // sliders.changeHeader(2, "Turns Ratio")
      // Scenes.items.slider_box.set(-27,-93).scale(0.76)

      Scenes.items.slider_box.set(10,-69).scale(1) 
      Scenes.items.btn_next.show()
      sliders.generateOptionsFor(0)


      //! Required Items
      // Scenes.items.part_2_2_heading.set(165,-83, 65)
      // Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.part_3_option_3.set(-30, 155)

      Scenes.items.part_2_2_heading.set(235,-83, 60)
       Scenes.items.part3_table_two.set(25,196, null).scale(0.8)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640+20,-78, 45)
      Scenes.items.btn_delete.set(740+20,-78, 45)
       Scenes.items.btn_reset.set(840+20,-78, 45)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_two.item
       let tableColumnMax = table.tBodies[0].rows[0].cells.length
       let tableRowMax = table.tBodies[0].rows.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[5].cells[4].innerHTML==""?0:6)


      // ! graph
      // let graph_height = 200
      // let graph_width = 355
      
      let graph_height = 220
      let graph_width = 310
      
      // Scenes.items.graph_box_1.set(null, 0, 210)

      Scenes.items.graph_box_1.set(null, -25, 235, 333)
      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph1.item

      // Scenes.items.graph_box_2.set(null, 190, 220)
      // Scenes.items.graph2.set(null,null,graph_height,graph_width)

      // Scenes.items.graph_box_2.set(180, 0, 210)

      Scenes.items.graph_box_2.set(260, -25, 235, 333)

      Scenes.items.graph2.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph2.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label1.x
      let yLabel = Scenes.items.chart.label1.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label2.x
      let yLabel2 = Scenes.items.chart.label2.y
      let dataLabel2 = "Data2"

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)

        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        Scenes.items.yLabel.set(533,84).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel.set(732, 185).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })
        // for label2
        Scenes.items.yLabel2.set(190,84).setContent(yLabel2).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel2.set(380,185).setContent(xLabel2).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx]
        let graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          graphRef2.destroy()
        }
        
        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 65
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,62-topMinus,30,30,90).play()
        setCC("Select V<sub>in</sub>")
        
        // sliders.selectOp1.oninput = ()=>{
        //   Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
        //   setCC("Select R")
        // }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,69,95-topMinus,30,30,90).play()
          setCC("Select M")
        }
        // sliders.selectOp3.oninput = ()=>{
        //       Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
        //       setCC("Select M")
        //     }
              sliders.slider.onclick = ()=>{
                Dom.setBlinkArrowRed(true,695, -37,30,30,90).play()
                setCC("Press Record")                
              }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      //slider aaraha he yaha se 
      // generate option
      // sliders.generateOptionsFor(0)
      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

          
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          ,xLabel = "Modulation Index (M)"
          ,yLabel = "V<sub>01</sub>"
          ,xLabel2 = "Modulation Index (M)"
          ,yLabel2 = "THD(%)",
          tableModulationIdx = 2,
          tableV01Idx = 5,
          tableThdIdx = 9
          for(let i=0;i<n;i++){
            let x = rows[i].cells[tableModulationIdx].innerHTML
            let y = rows[i].cells[tableV01Idx].innerHTML

            let x2 = rows[i].cells[tableModulationIdx].innerHTML
            let y2 = rows[i].cells[tableThdIdx].innerHTML

            graphData.push({x: x,y: y})
            graphData2.push({x: x2,y: y2})
          }
          // ! setDefault two values in it
          function setDefaultLowHighInGraph(graphNumber){
            // D value
            let low = 0, high = 0.95,x = 0,y = 0
            updateValues(sliders.selectOp1.value,low,sliders.selectOp2.value)
            x = low
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.unshift({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.unshift({x: x, y: y})
            }

            updateValues(sliders.selectOp1.value,high,sliders.selectOp2.value)
            x = high
            if(graphNumber == 1){
              y = Number(Formulas.ideal.M(values)).toFixed(2)
              graphData.push({x: x, y: y})
            }else{
              y = Number(Formulas.ideal.v0(values)).toFixed(2)
              graphData2.push({x: x, y: y})
            }
          }
          // setDefaultLowHighInGraph(1)
          // setDefaultLowHighInGraph(2)

          //for labeling
          let conclusionFront = ""

          conclusionFront = 'Fundamental voltage and “Total Harmonic Distortion” increases with increasing “Modulation Index”'



          // switch(characteristicsValue){

          //   case  'D-vs-M': 
          //     yLabel = "Voltage Gain (M)"
          //     conclusionFront = "The voltage gain linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observations is that the voltage gain linearly increases with increasing duty ratio in ideal case.")
          //     break

          //   case  'D-vs-I': 
          //     yLabel = "I (A)"
          //     conclusionFront = "The load current linearly increases with increasing duty ratio."
          //     setCC("The conclusion of these observation is that the load current linearly increases with increasing duty ratio.")
          //     break

          //   case  'D-vs-V': 
          //     yLabel = "V (V)"
          //     conclusionFront = "The Load voltage linearly increases with increasing duty ratio for ideal case."
          //     setCC("The conclusion of these observation is that the load voltage linearly increases with increasing duty ratio for ideal case.")
          //     break
          // }

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle1.set(null,100).setContent(conclusionFront).addClass("conclusion").item
          // )

            Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
            setCC("Here, the Fundamental voltage and “Total Harmonic Distortion” increases with increasing “Modulation Index”")
          
          Scenes.items.chart.label1.x = xLabel
          Scenes.items.chart.label1.y = yLabel

          Scenes.items.chart.label2.x = xLabel2
          Scenes.items.chart.label2.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
          Scenes.items.graph1.set(null,null,graph_height,graph_width)
          Scenes.items.graph2.set(null,null,graph_height,graph_width)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[5].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 3

        // ! change the table column index who's changing
        let changeableColumnIndx = 3

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i<tableColumnMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph1.set(null,null,graph_height,graph_width)
        Scenes.items.graph2.set(null,null,graph_height,graph_width)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
          sliders.generateOptionsFor(0)
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[5]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp2.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" ){
          setCC("Select V<sub>in</sub> value first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        if(recordBtnClickIdx < tableRowMax-1){
          Dom.setBlinkArrowRed(true,69,95-topMinus,30,30,90).play()
          // Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
          setCC("Select M.")
        }
        else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < 6 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=6){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let sortAccording = 2
            let n=6
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                    let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 3
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }

        let ansArr = Formulas.sinusoidal.valueSet(vInValue, dutyRatioValue)

        console.log(ansArr)

        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = Number(ansArr[0]).toFixed(2)
        tableRow.cells[4].innerHTML = Number(ansArr[1]).toFixed(2)
        tableRow.cells[5].innerHTML = Number(ansArr[2]).toFixed(2)
        tableRow.cells[6].innerHTML = Number(ansArr[3]).toFixed(2)
        tableRow.cells[7].innerHTML = Number(ansArr[4]).toFixed(2)
        tableRow.cells[8].innerHTML = Number(ansArr[5]).toFixed(2)
        tableRow.cells[9].innerHTML = Number(ansArr[6]).toFixed(2)
        // tableRow.cells[4].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.nonIdeal.iIn(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.ideal.i0(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.ideal.p0(values)).toFixed(2)

        //!previous values 
        // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false); 
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if(recordBtnClickIdx==6){
          setCC("Press Record")
          Dom.setBlinkArrowRed(true,740-leftMinus,30-topMinus,30,30,90).play()
        }
      }    
       
      

      
      return true
    }),
    (step6 = function () {
      setIsProcessRunning(true);
      
      Scenes.setStepHeading(
        "",
        ""
      )
      // componenet stress

      Scenes.changeHeader(4)
        // ! show the slider
      Scenes.items.slider_box.set(7,-55).scale(0.95)
      Scenes.items.btn_next.show()

      //! Required Items
      Scenes.items.btn_record.set(388,-75, 40)
      // Scenes.items.btn_delete.set(340,-40)
       Scenes.items.btn_reset.set(480,-75, 40)
       // ! graph
      
       sliders.generateOptionsFor(2)
       Scenes.items.part_2_3_circuit.set(0,180, 210)
      //  Scenes.items.part4_table_graph.set(0,160,250,555)
      //  Scenes.items.new_part_3_4_circuit.set(0,220,190,290)
      //  Scenes.items.new_part_3_4_ratings.set(290,210,250,280)
       //graph labels
      //  let st_label = {
      //   backgroundColor: "white",
      //   color: "black",
      //   fontSize: "20px",
      //   width: "300px",
      //   textAlign: "center",
      //   margin: "0",
        
      //  }
       
      //  let l2 = "<span>i<sub>s</sub></span> <span>i<sub>d</sub></span> <span>i<sub>c</sub></span>"
      //  let l1 = "<span>v<sub>s</sub></span> <span>v<sub>d</sub></span> <span>v<sub>c</sub></span>"
      //  Scenes.items.tempTitle51.set(620,118).setContent(l1).styles(st_label).addClass("graph_labels")
      //  Scenes.items.tempTitle52.set(620,364).setContent(l2).styles(st_label).addClass("graph_labels")

       // temp label for the table
      //  let st = {
      //   width: "fit-content"
      //  }
      //  let st3 = {
      //   ...st,
      //   fontSize: "15px"
      //  }
      //  let leftMinus = 44, topMinus = 25
      //  let format_1 = "(V<sub>in</sub>+V<sub>o</sub>/n) V/I<sub>in</sub> A"
      //  let format_2 = "(nV<sub>in</sub>+V<sub>o</sub>) V/I<sub>L,p</sub>/n A"
      //  let format_3 = "V<sub>o</sub> V/ (∆I<sub>Lm</sub>/2)/n A"
      //  Scenes.items.tempTitle53.set(443-leftMinus,253-topMinus+50).setContent(format_1).styles(st)
      //  Scenes.items.tempTitle54.set(443-leftMinus,300-topMinus+50).setContent(format_2).styles(st)
      //  Scenes.items.tempTitle55.set(443-leftMinus,355-topMinus+50).setContent(format_3).styles(st3)
       let graphIdx = 6
       
      let graph_box7 = new Dom(".graph_box7")
      let graph_box8 = new Dom(".graph_box8")
      Scenes.items.graph7.set(null,null,250,100)
      Scenes.items.graph8.set(null,200,250,100)
      graph_box7.set()
      graph_box8.set(null,171)
      let ctx1 = Scenes.items.graph7.item
      let ctx2 = Scenes.items.graph8.item
      let chart1 = Scenes.items.chart[graphIdx]
      let chart2 = Scenes.items.chart[graphIdx+1]
      
      let xLabel = ""
      let yLabel = ""

      function plotGraph(){
        if(chart1!=null){
          chart1.destroy()
          chart2.destroy()
        }
        
        chart1 = new Chart(ctx1,
          {
            type: "bar",
            data: {
              labels: ["Multi-pulse PWM", "Sinusoidal PWM"],
              datasets: [
                {
                  backgroundColor: ['#385623','#7030a0'],
                  label: ["Vo1","rms"],
                  data: [],
                },
              ]
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                display: false
              },
              title:{
                display: false,
                text: "Voltage Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 13,
                    },
                    barThickness: 30
                  },
                ],
              },  
            },
          }
        )
        chart2 = new Chart(ctx2,
          {
            type: "bar",
            data: {
              labels: ["Multi-pulse PWM", "Sinusoidal PWM"],
              datasets: [
                {
                  label: "Vo3",
                  backgroundColor: "#002060",
                  data: [],
                },
                {
                  label: "Vo5",
                  backgroundColor: "#c00000",
                  data: [],
                },
                {
                  label: "Vo7",
                  backgroundColor: "#385723",
                  data: [],
                },
                {
                  label: "THD",
                  backgroundColor: "#c55a11",
                  data: [],
                },
              ]
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              legend: {
                // display: false
              },
              title:{
                display: false,
                text: "Current Stress",
                fontColor: 'black',
                fontSize: 15,
              },
              scales: {
                yAxes: [
                  {
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 15,
                    }
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                    },
                    ticks: { 
                      beginAtZero:true,
                      fontColor: 'black',
                      fontSize: 13,
                    },
                  },
                ],
              },
              barPercentage: 1, // Controls the width of the bars relative to the available space
              categoryPercentage: 0.5,
            },
          }  
        )
        Scenes.items.chart[graphIdx] = chart1
        Scenes.items.chart[graphIdx+1] = chart2
        
      }

      function stepTutorial2(){

        let leftMinus = 30

        Dom.setBlinkArrowRed(true,100-leftMinus,12,30,30,90).play() 
        setCC("Select V<sub>in</sub>")
        
        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,260-leftMinus,12,30,30,90).play()
          setCC("Select M")
        }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,430-10,-35,30,30,90).play()
          setCC("Press Record")
        }
            
      }
      if(chart1 == null){
        stepTutorial2()
      }

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

       // ! ------------> If data already present plot the graph
        if(chart1 != null){
          setIsProcessRunning(false)
          Scenes.currentStep = 3
        }else{
          plotGraph()
          // Scenes.items.graph2.set(null,null,190,355)
          Scenes.items.graph7.set(null,null,250,355)
          Scenes.items.graph8.set(null,200,250,355)
        }   


      // ! onclick for reset
      Scenes.items.btn_reset.item.onclick = function(){
        // reset all the parameters
        // so just simply call this step again
        Scenes.items.chart[graphIdx] = chart1
        Scenes.items.chart[graphIdx+1] = chart2
        Scenes.steps[6]()        
      }
       
       // ! onclick for record
       Scenes.items.btn_record.item.onclick = function(){

         // taking values from all sliders 
        let vInValue = Number(sliders.selectOp1.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)
        let nValue = Number(sliders.selectOp3.value)

        // * if all values not selected
        if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
          setCC("Select all values first.")
          return
        }

        Dom.setBlinkArrowRed(-1)
        updateValues(vInValue,dutyRatioValue,resistanceValue)
 
        // for table data (temp title data)
        let v0 = parseFloat(Number(Formulas.stress.v0(values)).toFixed(2))
        let v0byN = parseFloat(Number(Formulas.stress.v0(values) / nValue).toFixed(2))
        let iIn = parseFloat(Number(Formulas.stress.iIn(values)).toFixed(2))
        // ! iLMPbyN !/ nValue
        let iLMPbyN = parseFloat(Number(Formulas.stress.iLMP(values) / nValue).toFixed(2))
        let delILMby2byN = parseFloat(Number((Formulas.stress.delILM(values) / 2) / nValue).toFixed(2))

        console.log(vInValue,dutyRatioValue,resistanceValue)

        let vS = Number(parseFloat(vInValue) + parseFloat(v0byN)).toFixed(2)
        let vD = Number((parseFloat(nValue) * parseFloat(vInValue)) + v0).toFixed(2)
        let vC = Number(v0).toFixed(2)

        let iS = Number(iIn).toFixed(2)
        let iD = Number(iLMPbyN).toFixed(2)
        let iC = Number(delILMby2byN).toFixed(2)

        // Scenes.items.tempTitle53.setContent(`${vS} V/${iS} A`)
        // Scenes.items.tempTitle54.setContent(`${vD} V/${iD} A`)
        // Scenes.items.tempTitle55.setContent(`${vC} V/${iC} A`)

        let data1Arr = Formulas.multipulse.valueSet(vInValue, dutyRatioValue)
        let data2Arr = Formulas.sinusoidal.valueSet(vInValue, dutyRatioValue)

        // console.log(data1Arr)
        // console.log(data2Arr)
        let data_1 = data1Arr[3]
        let data_2 = data1Arr[4]
        let data_3 = data1Arr[5]
        let data_4 = data1Arr[6]
        
        let data_5 = data2Arr[3]
        let data_6 = data2Arr[4]
        let data_7 = data2Arr[5]
        let data_8 = data2Arr[6]

        let val1 = data1Arr[2]
        let val2 = data1Arr[0]
        // ! add values to graph
        // let graph1_data = [vS,vD,vC]
        console.log(val1)
        console.log(val2)
        let graph1_data = [val1, val2]

        // let graph2_data = [iS,iD,iC]
        let v03_data = [data_1,data_5]
        let v05_data = [data_2,data_6]
        let v07_data = [data_3,data_7]
        let THD_data = [data_4,data_8]
        
        plotGraph()
        graph.addData(chart1,0,graph1_data)
        graph.addData(chart2,0,v03_data)
        graph.addData(chart2,1,v05_data)
        graph.addData(chart2,2,v07_data)
        graph.addData(chart2,3,THD_data)

        Scenes.items.graph7.set(null,null,250,355)
        Scenes.items.graph8.set(null,200,250,355)
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
          // setCC("Bar chart shows the switch, diode and capacitor voltage stresses.")

          setCC("Here, inverter load voltages are generated using Multi-pulse and Sinusoidal PWM schemes.")

          setCC("Sine PWM  based waveforms results in reduced lower order harmonics and thus reduces the filtering requirements.")

          let conclusionFront = "The fundamental component of load voltage increases with increase in modulation index. In comparison to multi-pulse PWM, the amplitude of lower order harmonics is less for Sine PWM. The higher order harmonics can be easily filtered out by using suitable filter."

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle20.set().setContent(conclusionFront).addClass("conclusion").zIndex(3).item
          // )
          Scenes.items.tempTitle20.set(25,43,null,426).setContent(conclusionFront).addClass("conclusion").zIndex(3).item
          
          setIsProcessRunning(false); 
          Scenes.currentStep = 3

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
    }),
    // (step5 = function () {
    //   setIsProcessRunning(true);
    //   Dom.hideAll()
    //   Scenes.setStepHeading(
    //     "",
    //     ""
    //   );
    //   Scenes.changeHeader(2)
    //   // setCC("Record 7 reading for 3 different load resistances.")
    //   // ! show the slider
    //   Scenes.items.slider_box.set(-50,-80).scale(0.79)
    //   Scenes.items.btn_next.show()

    //   //! Required Items
    //   Scenes.items.new_part_3_circuit.set(220,-20,190)
    //   // Scenes.items.circuit_full_3.set(230,-50,150)
    //   // Scenes.items.part_3_option_3.set(-30, 155)
    //   //  Scenes.items.right_tick_1.set(-5,175)
    //   Scenes.items.btn_record.set(640,-78)
    //   Scenes.items.btn_delete.set(740,-78)
    //    Scenes.items.btn_reset.set(840,-78)
    //   // Scenes.items.part3_table_three.set(20)
    //   Scenes.items.part3_table_two.set(-43,160, null).scale(0.9)

    //    let table = Scenes.items.part3_table_two.item
    //    let tableColumnMax = table.tBodies[0].rows[0].cells.length
    //    let tableRowMax = table.tBodies[0].rows.length

    //    let valuesToMatch = []
    //     // * index to handle records
    //   let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      
    //   // ! graph
    //   let graph_height = 200
    //   let graph_width = 355
      
    //   Scenes.items.graph_box_3.set(null, -28, 210)
    //   Scenes.items.graph3.set(null,null,graph_height,graph_width)
    //   let ctx = Scenes.items.graph3.item

    //   Scenes.items.graph_box_4.set(null, 190, 220)
    //   Scenes.items.graph4.set(null,null,graph_height,graph_width)
    //   let ctx2 = Scenes.items.graph4.item

    //   // ! Label for graph
    //   let xLabel = Scenes.items.chart.label3.x
    //   let yLabel = Scenes.items.chart.label3.y
    //   let dataLabel = "Data"

    //   let xLabel2 = Scenes.items.chart.label4.x
    //   let yLabel2 = Scenes.items.chart.label4.y
    //   let dataLabel2 = "Data2"

    //   // ! Forshowing graph labels
    //   // graph idx is for  showing which graph is being shown
    //   let graphIdx = 2
    //   if(Scenes.items.chart[graphIdx] != null){
    //     Scenes.items.xLabel.set().setContent(xLabel)
    //     Scenes.items.yLabel.set().setContent(yLabel)

    //     Scenes.items.xLabel2.set().setContent(xLabel2)
    //     Scenes.items.yLabel2.set().setContent(yLabel2)
    //   }
      
    //   // ! To Plot graph
    //   function plotGraph(
    //     ctx,
    //     ctx2,
    //     graphIdx,
    //     data,
    //     data2,
    //     dataLabel,
    //     dataLabel2,
    //     xLabel=null,
    //     yLabel=null,
    //     xLabel2=null,
    //     yLabel2=null,
    //     beginAtZero=false
    //   ){
    //     // for label
    //     let yStyle = {
    //       backgroundColor: "transperant",
    //       textAlign: "center",
    //       color: "black",
    //       width: "170px", 
    //       rotate: "-90deg",
    //     }
    //     let xStyle = {
    //       backgroundColor: "transperant",
    //       color: "black",          
    //       width: "fit-content",
    //     }
    //     Scenes.items.yLabel.set(487,80).setContent(yLabel).styles(yStyle)
    //     Scenes.items.xLabel.set(700,160).setContent(xLabel).styles(xStyle)        // for label2
    //     Scenes.items.yLabel2.set(487,80+225).setContent(yLabel2).styles(yStyle)
    //     Scenes.items.xLabel2.set(700,160+225).setContent(xLabel2).styles(xStyle)

    //     // ! Destroy old graph
    //     let graphRef = Scenes.items.chart[graphIdx]
    //     let graphRef2 = Scenes.items.chart[graphIdx+1]
    //     if(graphRef!=null){
    //       graphRef.destroy()
    //       graphRef2.destroy()
    //     }
        
    //     graphRef = new Chart(ctx, {
    //       type: "scatter",
    //       plugins: [{
    //         // afterDraw: chart => {
    //         //   var ctx = chart.chart.ctx;
    //         //   ctx.save();
    //         //   ctx.textAlign = 'center';
    //         //   ctx.font = '18px Arial';
    //         //   ctx.fillStyle = 'black';
    //         //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
    //         //   ctx.textAlign = 'left';
    //         //   ctx.font = '10px Arial';
    //         //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
    //         //   ctx.restore();
    //         // },
            
    //       }],
    //       data: {
    //         datasets: [
    //             {
    //               label: dataLabel,
    //               fill: false,
    //               borderColor: "red",
    //               backgroundColor: "red",
    //               data: data,
    //               display: false,
    //             },
    //         ],
    //       },
    //       options: {
    //         scales: {
    //           yAxes: [
    //             {
    //               scaleLabel: {
    //                 display: false,
    //                 labelString: yLabel,
    //                 fontColor: 'black',
    //                 fontSize: 17,
  
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //           xAxes: [
    //             {
    //               scaleLabel: {
    //                 display: false,
    //                 labelString: xLabel,
    //                 fontColor: 'black',
    //                 fontSize: 17,
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //         },
    //       },
    //     })
    //     graphRef2 = new Chart(ctx2, {
    //       type: "scatter",
    //       plugins: [{
    //         // afterDraw: chart => {
    //         //   var ctx = chart.chart.ctx;
    //         //   ctx.save();
    //         //   ctx.textAlign = 'center';
    //         //   ctx.font = '18px Arial';
    //         //   ctx.fillStyle = 'black';
    //         //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
    //         //   ctx.textAlign = 'left';
    //         //   ctx.font = '10px Arial';
    //         //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
    //         //   ctx.restore();
    //         // },
            
    //       }],
    //       data: {
    //         datasets: [
    //             {
    //               label: dataLabel2,
    //               fill: false,
    //               borderColor: "red",
    //               backgroundColor: "red",
    //               data: data2,
    //               display: false,
    //             },
    //         ],
    //       },
    //       options: {
    //         scales: {
    //           yAxes: [
    //             {
    //               scaleLabel: {
    //                 display: false,
    //                 labelString: yLabel2,
    //                 fontColor: 'black',
    //                 fontSize: 17,
  
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //           xAxes: [
    //             {
    //               scaleLabel: {
    //                 display: false,
    //                 labelString: xLabel2,
    //                 fontColor: 'black',
    //                 fontSize: 17,
    //               },
    //               ticks: { 
    //                 beginAtZero:beginAtZero,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //         },
    //       },
    //     })
     
    //     Scenes.items.chart[graphIdx] = graphRef
    //     Scenes.items.chart[graphIdx+1] = graphRef2
    //   }

    //   // for adding new datasets to graph
    //   const graph = {
    //     addDataset(chart,label,bgColor,data){
    //       chart.data.datasets.push(
    //         {
    //           label: label,
    //           fill: false,
    //           borderColor: bgColor,
    //           backgroundColor: bgColor,
    //           data: data,
    //         }
    //       )
    //       chart.update()
    //     },
    //     addData(chart,index,data){
    //       console.log(data)
    //       if(data.length > 0){
    //         chart.data.datasets[index].data = data
    //       }else{
    //         chart.data.datasets[index].data.push(data)
    //       }
    //       chart.update()
    //     }
    //   }


    //   // let slidersBox = document.querySelectorAll(".slider")
    //   // let slidersBox = document.querySelectorAll(".range-slider__range")
    //   let topMinus = 85
    //   let leftMinus = 50
    //   function stepTutorial2(){

    //     Dom.setBlinkArrowRed(true,100-leftMinus,78-topMinus,30,30,90).play()
    //     setCC("Select V<sub>in</sub>")
        
    //     sliders.selectOp1.oninput = ()=>{
    //       Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
    //       setCC("Select R")
    //     }
    //     sliders.selectOp2.oninput = ()=>{
    //       Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
    //       setCC("Select Turns ratio")
    //       }
    //         sliders.selectOp3.oninput = ()=>{
    //           Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
    //           setCC("Select D")
    //         }
    //           sliders.slider.onclick = ()=>{
    //             Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
    //             setCC("Press Record")                
    //           }
    //   }
    //   if(recordBtnClickIdx == 0){
    //     stepTutorial2()
    //   }
    //   // generate option
    //   sliders.generateOptionsFor(1)
      
    //   function setDataToGraph(){

    //     let characteristicsValue = Scenes.items.slider_C.item.value;
       
    //     let graphData = []
    //     let graphData2 = []
    //     var rows = table.tBodies[0].rows
    //     let n = rows.length
    //     ,xLabel = "Duty Ratio (D)"
    //     ,yLabel = "Voltage Gain (M)"
    //     ,xLabel2 = "Duty Ratio (D)"
    //     ,yLabel2 = "Output voltage (V<sub>0</sub>)",
    //     tableModulationIdx = 3,
    //     tableV0Idx = 4,
    //     table = 7
    //     for(let i=0;i<n;i++){
    //       let x = rows[i].cells[tableModulationIdx].innerHTML
    //       let y = rows[i].cells[tableV0Idx].innerHTML

    //       let x2 = rows[i].cells[tableModulationIdx].innerHTML
    //       let y2 = rows[i].cells[tableV0Idx].innerHTML

    //       graphData.push({x: x,y: y})
    //       graphData2.push({x: x2,y: y2})
    //     }
    //     // ! setDefault two values in it
    //     function setDefaultLowHighInGraph(graphNumber){
    //       // D value
    //       let low = 0, high = 0.95,x = 0,y = 0
    //       updateValues(sliders.selectOp1.value,low,sliders.selectOp2.value)
    //       x = low
    //       if(graphNumber == 1){
    //         y = Number(Formulas.nonIdeal.M(values)).toFixed(2)
    //         graphData.unshift({x: x, y: y})
    //       }else{
    //         y = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
    //         graphData2.unshift({x: x, y: y})
    //       }

    //       updateValues(sliders.selectOp1.value,high,sliders.selectOp2.value)
    //       x = high
    //       if(graphNumber == 1){
    //         y = Number(Formulas.nonIdeal.M(values)).toFixed(2)
    //         graphData.push({x: x, y: y})
    //       }else{
    //         y = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
    //         graphData2.push({x: x, y: y})
    //       }
    //     }
    //     setDefaultLowHighInGraph(1)
    //     setDefaultLowHighInGraph(2)

    //       // for loop fix
    //       let conclusionFront = ""

    //       conclusionFront = "Voltage gain and output voltage increases with increasing duty ratio upto certain duty ratio and then starts decreasing. Depending on turns ratio and duty cycle, output voltage is either lower or higher than input voltage."

    //       setCC("Voltage gain and output voltage increases with increasing duty ratio upto certain duty ratio and then starts decreasing. Depending on turns ratio and duty cycle, output voltage is either less or greater than input voltage.",3)
          

    //       // switch(characteristicsValue){

    //       //   case  'D-vs-M': 
    //       //     yLabel = "M (D)"
    //       //     dataLabel1 = "M(D) non-ideal"
    //       //     dataLabel2 = "M(D) ideal"
    //       //     conclusionFront = "Voltage gain depends on the load resistance and  non-ideal voltage gain is lesser than ideal voltage gain due to voltage drops in various components."
    //       //     setCC("The conclusion of these observation is that Voltage gain depends on the load resistance and  non-ideal voltage gain is lesser than ideal voltage gain due to voltage drops in various components.",3)
    //       //     break

    //       //   case  'D-vs-I': 
    //       //     yLabel = "I<sub>0</sub> (A)"
    //       //     dataLabel1 = "I₀ (A) non-ideal"
    //       //     dataLabel2 = "I₀ (A) ideal"
    //       //     conclusionFront = "The load current linearly increases with increasing duty ratio."
    //       //     setCC("The conclusion of these observation is that the load current linearly increases with increasing duty ratio.",3)
    //       //     break

    //       //   case  'D-vs-V': 
    //       //     yLabel = "V<sub>0</sub> (V)"
    //       //     dataLabel1 = "V₀ (V) non-ideal"
    //       //     dataLabel2 = "V₀ (V) ideal"
    //       //     conclusionFront = "Load voltage depends on the load resistance and  non-ideal load voltage is lesser than ideal load voltage due to voltage drops in various components."
    //       //     setCC("The conclusion of these observation is that load voltage depends on the load resistance and  non-ideal load voltage is lesser than ideal load voltage due to voltage drops in various components.",3)
    //       //     break
    //       // }

    //       // ! For front conclusion
    //       // Anime.fade(
    //         //   Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item,1,13
    //         //   )
            
    //       Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item

    //       Scenes.items.chart.label3.x = xLabel
    //       Scenes.items.chart.label3.y = yLabel

    //       Scenes.items.chart.label4.x = xLabel2
    //       Scenes.items.chart.label4.y = yLabel2

    //       plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
    //       Scenes.items.graph3.set(null,null,graph_height,graph_width)
    //       Scenes.items.graph4.set(null,null,graph_height,graph_width)

    //   }
    //   // ! ------------> If data already present plot the graph
    //   if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
    //     setIsProcessRunning(false)
    //     Scenes.currentStep = 4

    //     // ! change the table column index who's changing
    //     let changeableColumnIndx = 3

    //     recordBtnClickIdx = 8
    //     let rows = table.tBodies[0].rows
      
    //     // * to get old values from table for matching
    //     for(let i=0;i<tableColumnMax;i++){
    //       let val = rows[i].cells[changeableColumnIndx].innerHTML
    //       valuesToMatch.push(Number(val))
    //     }
    //   }else{
    //     // ! Please note this when plot the graph then show the graph ... 
    //     plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
    //     Scenes.items.graph3.set(null,null,graph_height,graph_width)
    //     Scenes.items.graph4.set(null,null,graph_height,graph_width)
    //     // disableSlider("reset")
    //   }

    //   // // ! adding data set
    //   // graph.addDataset(
    //   //   "Efficiency",
    //   //   "red",
    //   //   []
    //   // )
       

    //    //!onclick for delete btn
    //    Scenes.items.btn_delete.item.onclick =  function(){
    //     if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
    //       return
    //     }
    //     let row = table.tBodies[0].rows
        
    //     for(let i=1;i<tableColumnMax;i++){
    //       row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
    //     }
    //     recordBtnClickIdx = recordBtnClickIdx-1
    //     if(recordBtnClickIdx==0){
    //       sliders.enableAll()
    //       stepTutorial2()
    //     }
    //     valuesToMatch.pop()
    //   }

    //   //! onclick for reset 
    //   Scenes.items.btn_reset.item.onclick = function(){
    //     var rows = table.tBodies[0].rows
  
    //     for(let i=0;i<tableRowMax;i++){
    //       for(let j=1;j<tableColumnMax;j++){
    //         rows[i].cells[j].innerHTML = "";
    //       }
    //     }

    //     for(let i=0;i<tableRowMax;i++){
    //       rows[i].cells[0].innerHTML = i+1;
    //     }

    //     // reset all the parameters
    //     // so just simply call this step again
    //     Scenes.steps[6]()        
        
    //   }

    //   // ! onclick for record
    //   Scenes.items.btn_record.item.onclick = function(){ 

    //     // taking values from all sliders 
    //     let vInValue = Number(sliders.selectOp1.value)
    //     let dutyRatioValue = Number(sliders.slider.value)
    //     let resistanceValue = Number(sliders.selectOp2.value)



    //     // * if all values not selected
    //     if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
    //       setCC("Select all values first.")
    //       return
    //     }

    //     updateValues(vInValue,dutyRatioValue,resistanceValue)
    //     console.log(vInValue,dutyRatioValue,resistanceValue)
        
    //     // ! for arrow system
    //     if(recordBtnClickIdx < tableRowMax-1){
    //       Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
    //       setCC("Select D")
    //     }
    //     else{
    //       Dom.setBlinkArrowRed(-1)
    //     }

    //     // ! Can't select same values
    //     if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
    //       setCC("Please select different value.")
    //       return
    //     }else{
    //       valuesToMatch.push(dutyRatioValue)
    //     }

    //     // ! sort the data
    //     if(recordBtnClickIdx>=8){

    //       function sortTable(){
    //         var rows = table.tBodies[0].rows

    //         let n=8
    //         let sortIndex = 3
    //         for(let i=0;i<n;i++){
    //             for(let j=0;j<n-i-1;j++){
    //                 let val1 = Number(rows[j].cells[sortIndex].innerHTML)
    //                 let val2 = Number(rows[j+1].cells[sortIndex].innerHTML)
    //                 if(val1 > val2){
    //                     let temp = rows[j].innerHTML
    //                     rows[j].innerHTML = rows[j+1].innerHTML
    //                     rows[j+1].innerHTML = temp
    //                 }
    //             }
    //         }
    //         for(let i=0;i<n;i++){
    //             rows[i].cells[0].innerHTML = i+1
    //         }
    //       }
    //       sortTable()

    //       // * plot the graph
    //       // adding parameter to x,y graph
    //       // var rows = table.tBodies[0].rows
    //       // let n = 7
    //       // for(let i=0;i<n;i++){
    //       //   graph.addData(0,
    //       //     {
    //       //       x: rows[i].cells[9].innerHTML,
    //       //       y: rows[i].cells[10].innerHTML
    //       //     }
    //       //   )
    //       // }
    //       setDataToGraph()

    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play()
    //       setCC("Click 'Next' to go to next step")
    //       setIsProcessRunning(false)
    //       Scenes.currentStep = 4
    //     }


      
    //     // deactivate the sliders after first value  done
    //     // todo
    //     if(recordBtnClickIdx == 0){
    //       sliders.disable(0,1,2)
    //     }
    //     let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
    //     tableRow.cells[1].innerHTML = vInValue
    //     tableRow.cells[2].innerHTML = resistanceValue
    //     tableRow.cells[3].innerHTML = dutyRatioValue
    //     tableRow.cells[4].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)
    //     tableRow.cells[5].innerHTML = Number(Formulas.nonIdeal.iIn(values)).toFixed(2)
    //     tableRow.cells[6].innerHTML = Number(Formulas.nonIdeal.i0(values)).toFixed(2)
    //     tableRow.cells[7].innerHTML = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
    //     tableRow.cells[8].innerHTML = Number(Formulas.nonIdeal.p0(values)).toFixed(2)

    //     //!previous values 
    //     // tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
    //     // tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
    //     // tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
    //     // tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
    //     // tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
    //     // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
    //     // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

    //     // let x = tableRow.cells[9].innerHTML
    //     // let y = tableRow.cells[10].innerHTML
    //     // // ! addData to graph
    //     // graph.addData(0,{x:x,y:y})

    //     // if(recordBtnClickIdx>6){
    //     //   // after complete
    //     //   Dom.setBlinkArrow(true, 790, 408).play();
    //     //   setCC("Click 'Next' to go to next step");
    //     //   setIsProcessRunning(false); 
    //     //   Scenes.currentStep = 4
    //     // }
    //     // warning for sorting the data
    //     if(recordBtnClickIdx==8){
    //       setCC("Press Record")
    //       Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
    //     }
    //   }      
      
      
    //   return true;
    // }),
    // (step6 = function () {
    //   setIsProcessRunning(true);
 
    //   Scenes.setStepHeading(
    //     "",
    //     ""
    //   )

    //   Scenes.changeHeader(3)
    //   // setCC("Record 7 reading for different Load Resistances (R0)")
    //     // ! show the slider
    //   Scenes.items.slider_box.set(-50,-80).scale(0.79)
    //     Scenes.items.btn_next.show()
  
    //     //! Required Items
    //     Scenes.items.new_part_3_circuit.set(220,-20,190)
    //     Scenes.items.btn_record.set(640,-78)
    //   Scenes.items.btn_delete.set(740,-78)
    //    Scenes.items.btn_reset.set(840,-78)
    //     let table = Scenes.items.part3_table_three.set(-25,165, null).scale(0.9).item
    //     let tableColumnMax = table.tBodies[0].rows[0].cells.length
    //     let tableRowMax = table.tBodies[0].rows.length
  
    //     let valuesToMatch = []
    //     // * index to handle records
    //     let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
        
    //     // ! graph
    //     let graph_height = 200
    //     let graph_width = 355
        
    //     Scenes.items.graph_box_5.set(null, -28, 210)
    //     Scenes.items.graph5.set(null,null,graph_height,graph_width)
    //     let ctx = Scenes.items.graph5.item

    //     Scenes.items.graph_box_6.set(null, 190, 220)
    //     Scenes.items.graph6.set(null,null,graph_height,graph_width)
    //     let ctx2 = Scenes.items.graph6.item

    //     // ! Label for graph
    //     let xLabel = Scenes.items.chart.label5.x
    //     let yLabel = Scenes.items.chart.label5.y
    //     let dataLabel = "Data"

    //     let xLabel2 = Scenes.items.chart.label6.x
    //     let yLabel2 = Scenes.items.chart.label6.y
    //     let dataLabel2 = "Data2"

    //     // ! Forshowing graph labels
    //     // graph idx is for  showing which graph is being shown
    //     let graphIdx = 0
    //     if(Scenes.items.chart[graphIdx] != null){
    //       Scenes.items.xLabel.set().setContent(xLabel)
    //       Scenes.items.yLabel.set().setContent(yLabel)

    //       Scenes.items.xLabel2.set().setContent(xLabel2)
    //       Scenes.items.yLabel2.set().setContent(yLabel2)
    //     }
        
    //     // ! To Plot graph
    //     function plotGraph(
    //       ctx,
    //       ctx2,
    //       graphIdx,
    //       data,
    //       data2,
    //       dataLabel,
    //       dataLabel2,
    //       xLabel=null,
    //       yLabel=null,
    //       xLabel2=null,
    //       yLabel2=null,
    //       beginAtZero=false
    //     ){
    //       // for label
    //       Scenes.items.yLabel.set(487,60).setContent(yLabel).styles({
    //         backgroundColor: "transperant",
    //         textAlign: "center",
    //         color: "black",
    //         width: "170px", 
    //         rotate: "-90deg",
    //       })
    //       Scenes.items.xLabel.set(720,160).setContent(xLabel).styles({
    //         backgroundColor: "transperant",
    //         color: "black",
    //         width: "fit-content", 
    //       })
    //       // for label2
    //       Scenes.items.yLabel2.set(487,60+225).setContent(yLabel2).styles({
    //         backgroundColor: "transperant",
    //         textAlign: "center",
    //         color: "black",
    //         width: "170px", 
    //         rotate: "-90deg",
    //       })
    //       Scenes.items.xLabel2.set(720,160+225).setContent(xLabel2).styles({
    //         backgroundColor: "transperant",
    //         color: "black",
    //         width: "fit-content", 
    //       })

    //       // ! Destroy old graph
    //       let graphRef = Scenes.items.chart[graphIdx]
    //       let graphRef2 = Scenes.items.chart[graphIdx+1]
    //       if(graphRef!=null){
    //         graphRef.destroy()
    //         graphRef2.destroy()
    //       }
          
    //       graphRef = new Chart(ctx, {
    //         type: "scatter",
    //         plugins: [{
    //           // afterDraw: chart => {
    //           //   var ctx = chart.chart.ctx;
    //           //   ctx.save();
    //           //   ctx.textAlign = 'center';
    //           //   ctx.font = '18px Arial';
    //           //   ctx.fillStyle = 'black';
    //           //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
    //           //   ctx.textAlign = 'left';
    //           //   ctx.font = '10px Arial';
    //           //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
    //           //   ctx.restore();
    //           // },
              
    //         }],
    //         data: {
    //           datasets: [
    //               {
    //                 label: dataLabel,
    //                 fill: false,
    //                 borderColor: "red",
    //                 backgroundColor: "red",
    //                 data: data,
    //                 display: false,
    //               },
    //           ],
    //         },
    //         options: {
    //           scales: {
    //             yAxes: [
    //               {
    //                 scaleLabel: {
    //                   display: false,
    //                   labelString: yLabel,
    //                   fontColor: 'black',
    //                   fontSize: 17,

    //                 },
    //                 ticks: { 
    //                   beginAtZero:beginAtZero,
    //                   fontColor: 'black',
    //                   fontSize: 14,
    //                 }
    //               },
    //             ],
    //             xAxes: [
    //               {
    //                 scaleLabel: {
    //                   display: false,
    //                   labelString: xLabel,
    //                   fontColor: 'black',
    //                   fontSize: 17,
    //                 },
    //                 ticks: { 
    //                   beginAtZero:beginAtZero,
    //                   fontColor: 'black',
    //                   fontSize: 14,
    //                 }
    //               },
    //             ],
    //           },
    //         },
    //       })
    //       graphRef2 = new Chart(ctx2, {
    //         type: "scatter",
    //         plugins: [{
    //           // afterDraw: chart => {
    //           //   var ctx = chart.chart.ctx;
    //           //   ctx.save();
    //           //   ctx.textAlign = 'center';
    //           //   ctx.font = '18px Arial';
    //           //   ctx.fillStyle = 'black';
    //           //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
    //           //   ctx.textAlign = 'left';
    //           //   ctx.font = '10px Arial';
    //           //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
    //           //   ctx.restore();
    //           // },
              
    //         }],
    //         data: {
    //           datasets: [
    //               {
    //                 label: dataLabel2,
    //                 fill: false,
    //                 borderColor: "red",
    //                 backgroundColor: "red",
    //                 data: data2,
    //                 display: false,
    //               },
    //           ],
    //         },
    //         options: {
    //           scales: {
    //             yAxes: [
    //               {
    //                 scaleLabel: {
    //                   display: false,
    //                   labelString: yLabel2,
    //                   fontColor: 'black',
    //                   fontSize: 17,

    //                 },
    //                 ticks: { 
    //                   beginAtZero:beginAtZero,
    //                   fontColor: 'black',
    //                   fontSize: 14,
    //                 }
    //               },
    //             ],
    //             xAxes: [
    //               {
    //                 scaleLabel: {
    //                   display: false,
    //                   labelString: xLabel2,
    //                   fontColor: 'black',
    //                   fontSize: 17,
    //                 },
    //                 ticks: { 
    //                   beginAtZero:beginAtZero,
    //                   fontColor: 'black',
    //                   fontSize: 14,
    //                 }
    //               },
    //             ],
    //           },
    //         },
    //       })
        
    //       Scenes.items.chart[graphIdx] = graphRef
    //       Scenes.items.chart[graphIdx+1] = graphRef2
    //     }

    //     // let slidersBox = document.querySelectorAll(".slider")
    //     // let slidersBox = document.querySelectorAll(".range-slider__range")
    //     let topMinus = 85
    //     let leftMinus = 50
    //     function stepTutorial2(){

    //       Dom.setBlinkArrowRed(true,100-leftMinus,78-topMinus,30,30,90).play()
    //       setCC("Select V<sub>in</sub>")
          
    //       sliders.selectOp1.oninput = ()=>{
    //         Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
    //         setCC("Select D")
    //       }
    //       sliders.selectOp2.oninput = ()=>{
    //         Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
    //         setCC("Select Turns ratio")
    //         }
    //           sliders.selectOp3.oninput = ()=>{
    //             Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
    //             setCC("Select R")
    //           }
    //             sliders.slider.onclick = ()=>{
    //               Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
    //               setCC("Press Record")                
    //             }
    //     }
    //     if(recordBtnClickIdx == 0){
    //       stepTutorial2()
    //     }
    //     // generate option
    //     sliders.generateOptionsFor(2)
  
        
    //     function setDataToGraph(){
  
    //       let characteristicsValue = Scenes.items.slider_C.item.value;
  
         
    //       let graphData = []
    //       let graphData2 = []
    //       var rows = table.tBodies[0].rows
    //       let n = rows.length
    //       ,xLabel = "Output Power P<sub>0</sub>"
    //       ,yLabel = "Losses (W)"
    //       ,xLabel2 = "Output Power P<sub>0</sub>"
    //       ,yLabel2 = "Efficiency (%)",
    //       tableP0Idx = 8,
    //       tableEfficiency = 11,
    //       tableLosses = 10
    //       for(let i=0;i<n;i++){
    //         let x = rows[i].cells[tableP0Idx].innerHTML
    //         let y = rows[i].cells[tableLosses].innerHTML

    //         let x2 = rows[i].cells[tableP0Idx].innerHTML
    //         let y2 = rows[i].cells[tableEfficiency].innerHTML

    //         graphData.push({x: x,y: y})
    //         graphData2.push({x: x2,y: y2})
    //       }

    //         // setting labels
    //       let conclusionFront = ""

    //       conclusionFront = "Losses increase with loading effect and hence efficiency decreases."

    //       setCC("Losses increase with loading effect and hence efficiency decreases.")


    //       // if(p0vsLosses){
    //       //   yLabel = "Losses (W)"
    //       //   conclusionFront = "Losses increase with loading effect."
    //       //   setCC("The conclusion of these observation is that the losses increase with loading effect.")
    //       // }else{
    //       //   yLabel = "Efficiencty (%)"
    //       //   conclusionFront = "Loading effect the efficiency decreases."
    //       //   setCC("The conclusion of these observation is that due to loading effect the efficiency decreases.")
    //       // }

    //       // ! For front conclusion
    //       // Anime.fade(
    //       //   Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
    //       // )
          
    //       Scenes.items.tempTitle1.addClass("conclusion").set(null,60).setContent(conclusionFront)
    //       Scenes.items.chart.label5.x = xLabel
    //       Scenes.items.chart.label5.y = yLabel

    //       Scenes.items.chart.label6.x = xLabel2
    //       Scenes.items.chart.label6.y = yLabel2

    //       plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,false)
    //       Scenes.items.graph5.set(null,null,graph_height,graph_width)
    //       Scenes.items.graph6.set(null,null,graph_height,graph_width)
    //     }

    //         // ! ------------> If data already present plot the graph
    //     if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
    //       setIsProcessRunning(false)
    //       Scenes.currentStep = 4
  
    //       // ! change the table column index who's changing
    //       let changeableColumnIndx = 3
  
    //       recordBtnClickIdx = 8
    //       let rows = table.tBodies[0].rows
        
    //       // * to get old values from table for matching
    //       for(let i=0;i<tableColumnMax;i++){
    //         let val = rows[i].cells[changeableColumnIndx].innerHTML
    //         valuesToMatch.push(Number(val))
    //       }
    //     }else{
    //       // ! Please note this when plot the graph then show the graph ... 
    //       plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
    //       Scenes.items.graph5.set(null,null,graph_height,graph_width)
    //       Scenes.items.graph6.set(null,null,graph_height,graph_width)
    //       // disableSlider("reset")
    //     }
  
    //     // // ! adding data set
    //     // graph.addDataset(
    //     //   "Efficiency",
    //     //   "red",
    //     //   []
    //     // )
         
  
    //      //!onclick for delete btn
    //      Scenes.items.btn_delete.item.onclick =  function(){
    //       if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
    //         return
    //       }
    //       let row = table.tBodies[0].rows
          
    //       for(let i=1;i<tableColumnMax;i++){
    //         row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
    //       }
    //       recordBtnClickIdx = recordBtnClickIdx-1
    //       if(recordBtnClickIdx==0){
    //         sliders.enableAll()
    //       }
    //       valuesToMatch.pop()
    //     }
  
    //     //! onclick for reset 
    //     Scenes.items.btn_reset.item.onclick = function(){
    //       var rows = table.tBodies[0].rows
    
    //       for(let i=0;i<tableRowMax;i++){
    //         for(let j=1;j<tableColumnMax;j++){
    //           rows[i].cells[j].innerHTML = "";
    //         }
    //       }
  
    //       for(let i=0;i<tableRowMax;i++){
    //         rows[i].cells[0].innerHTML = i+1;
    //       }
  
    //       // reset all the parameters
    //       // so just simply call this step again
    //       Scenes.steps[7]()        
          
    //     }
  
    //     // ! onclick for record
    //     Scenes.items.btn_record.item.onclick = function(){ 
  
    //       // taking values from all sliders 
    //       // ! note dutyratio slider is now Resistance Slider and resistance is duty
    //       let vInValue = Number(sliders.selectOp1.value)
    //       let dutyRatioValue = Number(sliders.selectOp2.value)
    //       let resistanceValue = Number(sliders.slider.value)
  
    //       // * if all values not selected
    //       if(vInValue=="" || dutyRatioValue=="" || resistanceValue==""){
    //         setCC("Select all values first.")
    //         return
    //       }
  
    //       updateValues(vInValue,dutyRatioValue,resistanceValue)
    //       console.log(vInValue,dutyRatioValue,resistanceValue)

          
    //       // ! for arrow system
    //       if(recordBtnClickIdx < tableRowMax-1){
    //         setCC("Select R")
    //         Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
    //       }
    //       else{
    //         Dom.setBlinkArrowRed(-1)
    //       }
  
    //       // ! Can't select same values
    //       if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(resistanceValue)!=-1){
    //         setCC("Please select different value.")
    //         return
    //       }else{
    //         valuesToMatch.push(resistanceValue)
    //       }
  
    //       // ! sort the data
    //       if(recordBtnClickIdx>=8){
  
    //         function sortTable(){
    //           var rows = table.tBodies[0].rows
    //           let sortAccording = 3
  
    //           let n=8
    //           for(let i=0;i<n;i++){
    //               for(let j=0;j<n-i-1;j++){
    //                   let val1 = Number(rows[j].cells[sortAccording].innerHTML)
    //                   let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
    //                   if(val1 > val2){
    //                       let temp = rows[j].innerHTML
    //                       rows[j].innerHTML = rows[j+1].innerHTML
    //                       rows[j+1].innerHTML = temp
    //                   }
    //               }
    //           }
    //           for(let i=0;i<n;i++){
    //               rows[i].cells[0].innerHTML = i+1
    //           }
    //         }
    //         sortTable()
  
    //         // * plot the graph
    //         // adding parameter to x,y graph
    //         // var rows = table.tBodies[0].rows
    //         // let n = 7
    //         // for(let i=0;i<n;i++){
    //         //   graph.addData(0,
    //         //     {
    //         //       x: rows[i].cells[9].innerHTML,
    //         //       y: rows[i].cells[10].innerHTML
    //         //     }
    //         //   )
    //         // }
    //         setDataToGraph()
    //         Scenes.items.graph2.set(null,null,220,355)

  
    //         // after complete
    //         Dom.setBlinkArrow(true, 790, 408).play()
    //         setCC("Click 'Next' to go to next step")
    //         setIsProcessRunning(false)
    //         Scenes.currentStep = 4
    //       }
  
  
          
  
    //       // deactivate the sliders after first value  done
    //       // todo
    //       if(recordBtnClickIdx == 0){
    //         sliders.disable(0,1,2)
    //       }

    //       let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
    //       tableRow.cells[1].innerHTML = vInValue
    //       tableRow.cells[2].innerHTML = dutyRatioValue
    //       tableRow.cells[3].innerHTML = resistanceValue
    //       tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
    //       tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
    //       tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
    //       tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
    //       tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
    //       tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
    //       tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.losses(values)).toFixed(2)
    //       tableRow.cells[11].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)
  
    //       // let x = tableRow.cells[9].innerHTML
    //       // let y = tableRow.cells[10].innerHTML
    //       // // ! addData to graph
    //       // graph.addData(0,{x:x,y:y})
  
    //       // if(recordBtnClickIdx>6){
    //       //   // after complete
    //       //   Dom.setBlinkArrow(true, 790, 408).play();
    //       //   setCC("Click 'Next' to go to next step");
    //       //   setIsProcessRunning(false); 
    //       //   Scenes.currentStep = 4
    //       // }
    //       // warning for sorting the data
    //       if(recordBtnClickIdx==8){
    //         setCC("Press Record")
    //       Dom.setBlinkArrowRed(true,730-leftMinus,60-topMinus,30,30,90).play()
    //       }
    //     }    
         
        
  
        
      
    //   return true
    // }),
  
 
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// * slider
// var rangeSlider = function () {
//   var slider = $(".range-slider"),
//     range = $(".range-slider__range"),
//     value = $(".range-slider__value");

//   slider.each(function () {
//     value.each(function () {
//       var value = $(this).prev().attr("value");
//       $(this).html(value);
//     });

//     range.on("input", function () {
//       $(this).next(value).html(this.value);
//       $(this).next(value).val(this.value);
//     });
//   });63
// };
// $(".resistance-input").on("keyup", () => {
//   let slider = $(".slider_R .range-slider__range");
//   let input = document.querySelector(".resistance-input");

//   let min = 1;
//   let max = Number(slider.attr("max"));
//   // if (input.value < min) {
//   //   input.value = min;
//   // }
//   if (input.value > max) {
//     input.value = max;
//   }
//   slider.val(input.value);
// });
// rangeSlider();

// stepcalling
Scenes.currentStep = 1

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }

