let rec;
let statusRec=false;
let lista = [];
let salir = false;


if(!("webkitSpeechRecognition" in window)){
  alert("no puede usar la api")
}
else {
  rec=new webkitSpeechRecognition();
  rec.lang = "es-AR";
  rec.continuous = true;
  rec.interim = true;
  rec.addEventListener("result",iniciar)
}




function iniciar(event) {
  for (i = event.resultIndex; i< event.results.length; i++) {
    document.getElementById('texto').innerHTML= event.results[i][0].transcript;
    // tratamiento para quitar datos basura a :event.results[i][0].transcript 
    let nombreImg = event.results[i][0].transcript
    lista.push(nombreImg)
    console.log('dato' , nombreImg.toLowerCase())
    showGif(nombreImg.toLowerCase())
    console.log(nombreImg)
    }
  }

// agg a la lista la palabra, La palabra debe eliminar los el,la,etc y signos !?

function changeStatusRec(){
  statusRec = !statusRec
  !statusRec ? rec.abort():rec.start()
}






//reconding voice animation



function seachWord(list){
  // if(list.length = 0){

  // }

}
//fecth gif
function showGif(cadena){
  fetch(`gif/${cadena}`)
    .then(response => response.blob())
    .then(blob => {
      let objectURL = URL.createObjectURL(blob);
      let imgElement = document.getElementById('imagen-gif');
      imgElement.src = objectURL;
      // let $container_gif = document.getElementById('container-gif')
      // $container_gif.appendChild(imgElement);
    });
}




// frontend 

/*  play button */
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const playBtn = document.querySelector('.circle__btn');
const wave1 = document.querySelector('.circle__back-1');
const wave2 = document.querySelector('.circle__back-2');

playBtn.addEventListener('click', function (e) {
  e.preventDefault();
  play.classList.toggle('visibility');
  pause.classList.toggle('visibility');
  playBtn.classList.toggle('shadow');
  wave2.classList.toggle('pause');
  wave1.classList.toggle('pause');
});
