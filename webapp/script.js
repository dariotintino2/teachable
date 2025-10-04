{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const URL = "./model/";\
let model, webcam, labelContainer, maxPredictions;\
\
async function init() \{\
  const modelURL = URL + "model.json";\
  const metadataURL = URL + "metadata.json";\
\
  model = await tmImage.load(modelURL, metadataURL);\
  maxPredictions = model.getTotalClasses();\
\
  const flip = true; // specchia immagine come uno specchio\
  webcam = new tmImage.Webcam(300, 300, flip);\
  await webcam.setup();\
  await webcam.play();\
  window.requestAnimationFrame(loop);\
\
  document.getElementById("webcam").appendChild(webcam.canvas);\
  labelContainer = document.getElementById("result");\
\}\
\
async function loop() \{\
  webcam.update();\
  await predict();\
  window.requestAnimationFrame(loop);\
\}\
\
async function predict() \{\
  const prediction = await model.predict(webcam.canvas);\
  let topResult = prediction[0];\
  for (let i = 1; i < prediction.length; i++) \{\
    if (prediction[i].probability > topResult.probability) \{\
      topResult = prediction[i];\
    \}\
  \}\
  labelContainer.innerHTML = `Predizione: $\{topResult.className\} ($\{(topResult.probability * 100).toFixed(2)\}%)`;\
\}\
\
init();\
}