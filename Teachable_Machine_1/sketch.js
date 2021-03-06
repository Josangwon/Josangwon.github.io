  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/m2E7be0Vb/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    //인식된 레이블에 따라 다른 메세지가 화면에 출력됨
    if(label=="Up") {
      document.getElementById("hi").innerHTML="굳."
      text(label, width / 2, height - 4);
    } else if(label=="Down") {
      document.getElementById("hi").innerHTML="으..."
      text(label, width / 2, height - 4);
    } else {
      document.getElementById("hi").innerHTML="아무 행동도 없음"
      text(label, width / 2, height - 4);
    }
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }