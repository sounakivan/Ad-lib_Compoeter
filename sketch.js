let textInput;
let generateButton;
let textP;
let generatedText = '';
let modelReady = false;

// Create the character level generator with a pre trained model
const rnn = ml5.charRNN('models/shakespeare/', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  generateButton.html('Generate!');
  modelReady = true;
}

function setup() {
  createCanvas(400, 400);
  
  textInput = createInput();
  
  textInput.size(300, 25)
  textInput.position(width/2 - textInput.width/2, 50);
  
  generateButton = createButton('loading...');
  generateButton.position(width/2 - generateButton.width/2, 100);
  generateButton.mousePressed(generateText);
  
  textP = createP();
  textP.position(25, 200);
  textP.size(350, 200);

}

function draw() {
  background(220);
}

function generateText () {
  if (modelReady) {
    console.log("Running", textInput.value());
      // Generate content
    rnn.generate({ seed: textInput.value(), length: 50, temperature: .3 }, (err, results) =>     {
      // This is a callback function!
      
      generatedText = results;
      textP.html(textInput.value() + generatedText.sample);
      console.log(results);
    });
  }

}