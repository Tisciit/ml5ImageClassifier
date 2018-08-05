let classifier;
let camera;

let prediction;
let proba;

let canPredict = false;

function setup() {
    camera = createCapture(VIDEO, function () {
        classifier = ml5.imageClassifier("MobileNet", camera, modelLoaded)
    }).parent("#wrapper");

    camera.addClass("video");

    prediction = createP("Prediction").parent("#wrapper");
    proba = createP("Probability").parent("#wrapper");

    frameRate(4);
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

        let percentage = floor(result[0].probability * 10000) / 100;
        proba.html(percentage);

        canPredict = true;
        //classifier.predict(camera, predictionMade);
    }
}

function draw() {
    console.log("draw");
    if (canPredict) {
        canPredict = false;
        classifier.predict(camera, predictionMade);
    }
}