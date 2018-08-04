let classifier;
let camera;

let prediction;
let proba;

function setup() {

    prediction = createP("Prediction");
    proba = createP("Probability");

    prediction.innerHTML = "hallo";
    camera = createCapture(VIDEO, function () {
        classifier = ml5.imageClassifier("MobileNet", camera, modelLoaded)
    });
    //camera.hide();
}

function modelLoaded() {
    alert("Classifier is ready");
    classifier.predict(camera, predictionMade)
}

function predictionMade(err, result) {
    if (err) {
        alert("We faced an issue, sorry :(");
        console.error(err);
    } else {
        prediction.html(result[0].className);
        proba.html(result[0].probability);


        classifier.predict(camera, predictionMade);
    }
}

function draw() {
}