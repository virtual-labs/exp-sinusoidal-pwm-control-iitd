const sliders = {
  //to catch the select option header
  selectOpHeader1: document.querySelector(".header_c"),
  selectOpHeader2: document.querySelector(".header_v"),
  selectOpHeader3: document.querySelector(".header_r"),
  selectContainers: document.querySelectorAll(".select-container"),
  //to catch the select option
  selectOp1: document.querySelector(".slider_C"),
  selectOp2: document.querySelector(".slider_vIn"),
  selectOp3: document.querySelector(".slider_R"),
  selectOptions: [],
  selectOpHeaders: [],
  slider: document.querySelector(".slider_D"),
  sliderInput: document.querySelector(".slider_D_input"),
  sliderHeader: document.querySelector(".header_d"),
  
  slider2: document.querySelector(".slider2"),
  sliderInput2: document.querySelector(".slider2_input"),
  sliderHeader2: document.querySelector(".slider2"),
  
  init(){
    this.selectOptions = [this.selectOp1,this.selectOp2,this.selectOp3]
    this.changeValue()
    this.selectOpHeaders = [this.selectOpHeader1, this.selectOpHeader2, this.selectOpHeader3]
    this.selectOptionsAll = [...this.selectOptions,this.slider]
  },
  //to change the header of option
  changeHeader(idx, headerTitle) {
    this.selectOpHeaders[idx].innerHTML = headerTitle
  },
  //to change the option in select
  generateOptionsFor(stepIndex) {
    function genOptions(selectEleOpn,opsArr,opsArr2=null){
      let strOps = `<option value="0">Select</option>`;
      for (let ops in opsArr) {
        let ops2 = opsArr[ops]
        if(opsArr2!=null){
          ops2 = opsArr2[ops]
        }
        strOps += `<option value="${opsArr[ops]}">${ops2}</option>`;
      }
      selectEleOpn.innerHTML = strOps;
    }
    if(stepIndex>=0)
    switch(stepIndex){
      case -1:
      case 0:
      case 1:
        this.enableAll()

        this.changeHeader(1,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[220,240,260])
        this.setSlider(0.1,0.9,0.1,"M")
        this.setSlider2(220,260,20,"")
        this.hideSliderAndOption(0)
        this.hideSliderAndOption(1)
        this.hideSliderAndOption(2)
        break

      case 2:
        this.enableAll()

        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[220,240,260])

        this.changeHeader(1,"M")
        genOptions(this.selectOptions[1],[0.3,0.5,0.8])

        this.hideSlider2()
        this.hideSliderAndOption(2)
        this.hideSliderAndOption(3)
    
        break
      
      case 3:
        this.enableAll()
      
        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[24,36,48])
        
        this.changeHeader(1,"R (Ω)")
        genOptions(this.selectOptions[1],[12, 24, 36])

        this.changeHeader(2,"Turns ratio")
        genOptions(this.selectOptions[2],[2,0.5],["1:2","2:1"])


        this.setSlider(0.25, 0.75, 0.25, "D")
        this.enableAll()
        break
    }
  },

  changeValue(maxValue) {
    this.slider.oninput = () => {
      this.sliderInput.value = this.slider.value;
    }

    this.sliderInput.onkeyup = () => {
      if (this.slider.value > maxValue) {
        this.slider.value = maxValue;
      }
      this.slider.value = this.sliderInput.value;
    }
  },

  disable(...selectIndex) {
    selectIndex.forEach(index=>{
      if(index==3){
        this.slider2.disabled = true
        this.sliderInput2.disabled = true
        // this.selectContainers[index].classList.add("disabled")
      }else{
        this.selectOptions[index].disabled = true
        this.selectContainers[index].classList.add("disabled")
      }
    })
  },
  enableAll(){
    this.selectOptions.forEach(ele=>{
      ele.disabled = false
    })
    this.selectContainers.forEach(ele=>{
      ele.classList.remove("disabled")
    })
    this.slider.disabled = false
    this.sliderInput.disabled = false

    this.slider2.disabled = false
    this.sliderInput2.disabled = false

    document.querySelector(".row3").style.display = "block"

    this.showSliderAndOptions()
  },
  hideSliderAndOption(opsIdx){
    let sliderArr = document.querySelectorAll(".select-container")
    sliderArr[opsIdx].style.display="none"
  },
  showSliderAndOptions(){
    for(let i =0; i<3;i++){
      this.selectContainers[i].style.display = "block"
    }
    this.selectContainers[3].style.display = "flex"
  },

  setSlider(min,max,step,title){
    this.slider.value = min
    this.slider.min = min
    this.slider.max = max
    this.slider.step = step

    this.sliderInput.value = min
    this.sliderInput.min = min
    this.sliderInput.max = max

    this.sliderHeader.innerHTML = title

    this.changeValue(max)
  },
  setSlider2(min,max,step,title){
    this.slider2.value = min
    this.slider2.min = min
    this.slider2.max = max
    this.slider2.step = step

    this.sliderInput2.value = min
    this.sliderInput2.min = min
    this.sliderInput2.max = max

    this.sliderHeader2.innerHTML = title

    this.slider2.oninput = () => {
      this.sliderInput2.value = this.slider2.value;
    }
  },
  hideSlider2(){
    document.querySelector(".row3").style.display = "none"
  }
}
sliders.init()
