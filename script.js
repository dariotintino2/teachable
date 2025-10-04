const URL = "./model/";
let model, webcam, labelContainer, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true; // specchia immagine come uno specchio
  webcam = new tmImage.Webcam(300, 300, flip);
  await webcam.setup();
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam").appendChild(webcam.canvas);
  labelContainer = document.getElementById("result");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  let topResult = prediction[0];
  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > topResult.probability) {
      topResult = prediction[i];
    }
  }
  labelContainer.innerHTML = `Predizione: ${topResult.className} (${(topResult.probability * 100).toFixed(2)}%)`;
}

init();
