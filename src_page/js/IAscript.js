const video = document.createElement('video');
const webcamContainer = document.getElementById('webcam-container');
const labelContainer = document.getElementById('label-container');
const buttonInit = document.getElementById('buttonStart')
const URL = '../../src_IA/';




function init() {
    buttonInit.classList.add('disabled')
    video.autoplay = true;
    webcamContainer.appendChild(video);


    navigator.mediaDevices.getUserMedia({ video: true })
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
        numTotalclasses = model.getTotalClasses();
        for (let i = 0 ; i < numTotalclasses ; i++){
            labelContainer.appendChild(document.createElement("div"));
        }
        predict(model,numTotalclasses);
        console.log(model)
        })
        .catch((err) => {
        console.error('Error loading the model: ', err);
        });

    function predict(model, numTotalclasses) {
        setInterval(async () => {   
        const prediction = await model.predict(video);
        
        for (i = 0 ; i < numTotalclasses; i++){
            const textPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2)
            labelContainer.childNodes[i].innerHTML = textPrediction
        }
        }, 1000);
    }
    }
}
