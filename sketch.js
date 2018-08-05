let classifier;
let camera;
let camera_facingMode = "environment";
let switchButton;

let prediction;
let proba;

let canPredict = false;

function setup() {

    createCanvas(windowWidth, windowHeight);
    //Initialize capture using "environment camera", "user" would be frontcamera"
    camera = createCapture({
        audio: false,
        video: {
            facingMode: camera_facingMode
        }
    }, function () {
        classifier = ml5.imageClassifier("MobileNet", camera, modelLoaded)
    });

    camera.hide();

    frameRate(4);
}

function switchCamera() {
    canPredict = false;

    camera.dispose();
    if (camera_facingMode == "environment") {
        camera_facingMode = "user";
    } else {
        camera_facingMode = "environment";
    }

    camera = createCapture({
        audio: false,
        video: {
            facingMode: camera_facingMode
        }
    }, function () {
        canPredict = true;
    });

    camera.hide();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
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

        let percentage = floor(result[0].probability * 10000) / 100;
        proba = percentage;

        canPredict = true;
        //classifier.predict(camera, predictionMade);
    }
}

function draw() {
    if (canPredict) {
        background(55);
        canPredict = false;
        image(camera, 0, 0, windowWidth * .95, windowHeight * .95);
        textSize((windowHeight - windowHeight * .95) / 2);
        fill(255);
        text("I see " + prediction + " and am " + proba + " % sure about it", 0, windowHeight * .95 + textSize())
        classifier.predict(camera, predictionMade);
    }
}