let classifier;
let camera;
let camera_facingMode = "environment";
let switchButton;

let prediction;
let proba;

let canPredict = false;

function setup() {

    createCanvas(innerWidth, innerHeight);
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

    prediction = createP("Prediction").parent("#wrapper");
    proba = createP("Probability").parent("#wrapper");
    switchButton = createButton("Switch camera").parent("#wrapper");
    switchButton.mousePressed(switchCamera);

    frameRate(4);
}

function switchCamera() {
    canPredict = false;

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
    if (canPredict) {
        canPredict = false;
        image(0, 0, camera, innerWidth, innerHeight);
        classifier.predict(camera, predictionMade);
    }
}