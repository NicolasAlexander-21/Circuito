

let x = null
let processFrame = null 

class AudioVisualizer {
  constructor(audioContext, processFrame) {
    this.analyser = null
    this.audioContext = audioContext;
    this.processFrame = processFrame;
    this.connectStream = this.connectStream.bind(this);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(this.connectStream)
      .catch((error) => {
        alert('Se ha iterrumpido la entrada de audio')
      });
  }

  connectStream(stream) {
    this.analyser = this.audioContext.createAnalyser();
    const source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyser.fftSize = 32;

    this.initRenderLoop(this.analyser);
  }

  initRenderLoop() {
    const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    const processFrame = this.processFrame || (() => { });

    const renderFrame = () => {
      this.analyser.getByteFrequencyData(frequencyData);
      processFrame(frequencyData);

      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }


  closed(){
    this.audioContext.suspend();
    this.audioContext.close();
    this.analyser.disconnect()
    this.analyser.suspend()

  }
  open(){
    this.audioContext.resume();
  }
  
}



// container barEffect
const visualMainElement = document.getElementById('soundContainer');
// n bar
const visualValueCount = 16;
// var for get all bar 
let visualElements;



// crear barras
let i;
for (i = 0; i < visualValueCount; ++i) {
  const elm = document.createElement('div');
  visualMainElement.appendChild(elm);
}

visualElements = document.querySelectorAll('#soundContainer div');


function run() {


  // Swapping values around for a better visual effect
  const dataMap = { 0: 15, 1: 10, 2: 8, 3: 9, 4: 6, 5: 5, 6: 2, 7: 1, 8: 0, 9: 4, 10: 3, 11: 7, 12: 11, 13: 13, 14: 14, 15: 14 };
    processFrame = (data) => {
    const values = Object.values(data);
    let i;
    for (i = 0; i < visualValueCount; ++i) {
      const value = values[dataMap[i]] / 250;
      const elmStyles = visualElements[i].style;
      elmStyles.transform = `scaleY( ${value} )`;
      elmStyles.opacity = Math.max(.3, value);
    }
  };




};


function init(){
  run()
  x = new AudioVisualizer(new AudioContext(), processFrame);
}


function end(){
  x.closed()
}