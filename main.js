
the_camera = document.getElementById("camera");

Webcam.attach(the_camera);

Webcam.set({
    width: 350,
    height: 300,
    image_format : 'png',
    png_quality: 90
});  


function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_bmm_MWSD/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Nice") {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(results[0].label == "Good") {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        if(results[0].label == "Dislike") {
            document.getElementById("update_emoji").innerHTML = "&#128078;"
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The First Prediction is " + prediction;

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}