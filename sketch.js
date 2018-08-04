let classifier;
let camera;

let prediction;
let proba;

function setup() {
    classifier = ml5.imageClassifier("MobileNet", modelLoaded)
    createCanvas(windowWidth, windowHeight);
    camera = createCapture(VIDEO);
    camera.hide();
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
        prediction = result[0].className;
        proba = result[0].probability;
        classifier.predict(camera, predictionMade);
    }
}

function draw() {
    background(0);
    image(camera, 0, 0, windowWidth, windowHeight - 100);
    textSize(50);
    fill(255);
    let percentage = round(proba * 10000) / 100;
    let t = "Predicted " + prediction + " with a probability of " + percentage + " % ";
    text(t, 10, windowHeight - 50);
}