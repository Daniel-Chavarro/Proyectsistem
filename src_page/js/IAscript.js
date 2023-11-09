const video = document.createElement('video');
const webcamContainer = document.getElementById('webcam-container');
const labelContainer = document.getElementById('label-container');
const buttonInit = document.getElementById('buttonStart')
const URL = '../../src_IA/';
const textLoad = document.getElementById('textLoad')



function init() {
    textLoad.classList.remove('disabled')
    buttonInit.classList.add('disabled')
    video.autoplay = true;
    webcamContainer.appendChild(video);


    navigator.mediaDevices.getUserMedia({ video: {facingMode:'environment'} })
    .then((stream) => {
        video.srcObject = stream;
        video.addEventListener('loadeddata', () => {
        loadModel();
        });
    })
    .catch((err) => {
        console.error('Error accessing the webcam: ', err);
    });

    function loadModel() {
    tmImage.load(URL + 'model.json', URL + 'metadata.json')
        .then((model) => {
            predict(model);
        })
        .catch((err) => {
        console.error('Error loading the model: ', err);
        });

    function predict(model) {
        setInterval(async () => {   
        const prediction = await model.predict(video);
        textLoad.classList.add('disabled')
        indexMaxValue= (prediction.indexOf(Math.max(...prediction.map(x=>parseFloat(x.probability))))) * (-1)
        labelContainer.innerHTML = 'Es mas probable a ser ' + prediction[indexMaxValue].className 


        }, 1000);
    
    }
    
    }
}
