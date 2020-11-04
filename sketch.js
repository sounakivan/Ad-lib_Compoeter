var textInput;
var textPosY = 200;
let infoText;
let generateButton;
let bg = 250;
let generatedText = '';
let bubbles = [];


// Create the character level generator with a pre trained model
const rnn = ml5.charRNN('models/zora_neale_hurston/', modelReady);

// When the model is loaded
function modelReady() {
  console.log('Model Loaded!');
  generateButton.html('Add line to poem');
}

function setup() {
    createCanvas(600, 500);
    
    //create DOM elements
    infoText = createP('Write a line, and let Compoeter complete the rhyme!');
    infoText.position(100,30)
  
    textInput = createInput();
    textInput.size(400, 25)
    textInput.position(100, 80);
  
    generateButton = createButton('loading...');
    generateButton.position(385, 120);
    generateButton.mousePressed(generateText);
    
    tempSlider = createSlider(0, 1, 0.5, 0.1);
    tempSlider.position(130 + generateButton.width, 122);
    tempSlider.size(150,25);
    
    sliderL = createP('Temperature: ');
    sliderL.position(100,110);
    
    credit = createP('Created using ml5 library, pre-trained model from corpus of Zora Neale Hurston, and RiTa library. ')
    credit.class('plain-text');
    
    //bubbles animation
    for (let i=0; i<20; i++) {
    bubbles.push({
          speed: random(.1, 0.7),
          clr: color(random(0, 60), random(80, 150), random(100, 240)),
          x: width/2 + random(-200, 200),
          y: height - 25,
          size: random(5, 15)
        });
    }

}

function draw() {
    background(bg);
    
    for (let bubble of bubbles) {

    noStroke();
    fill(bubble.clr);
    ellipse(bubble.x, bubble.y, bubble.size);
    
    bubble.y -= bubble.speed;
    bubble.size -= .1;
    
    if (bubble.size < .5) {
      bubble.size = random(7, 20);
      bubble.y = height;
      bubble.speed = random(.1, 0.7);
    }
  }
}

function generateText () {
    //change background
    bg = color(random(220,255),random(220,255),random(220,255));
    
    //add input text
    newLine = createP();
    newLine.position(100, textPosY);
    newLine.html(textInput.value());
    
    //compoeter writing...
    genLine = createP('...');
    genLine.position(100, textPosY+20);
    
    var s = textInput.value()
    var rs = new RiString(s);
    var numChars = rs.length();
    console.log(numChars);
    
    var words = rs.words();
    
    //rhyming the last word
    let wordToRhyme;
    //ignore punctuation
    if (RiTa.isPunctuation(words[words.length-1])) {
        wordToRhyme = words[words.length-2];
    } else {
        wordToRhyme = words[words.length-1];
    }
    //console.log(wordToRhyme);
    
    let newRhymes = RiTa.rhymes(wordToRhyme);
//    console.log(newRhymes);
//    console.log(newRhymes.length-1);
    
    var endWord = newRhymes[Math.floor(Math.random() * newRhymes.length)];
//    console.log(endWord);
    
    if (rnn.ready) {
        
        rnn.generate({ seed: textInput.value(), length: numChars, temperature: tempSlider.value() }, (err, results) =>     {
            
            generatedText = results;
            
            console.log(generatedText);
            genLine.html(generatedText.sample + ' ' + endWord);
            
        });
        console.log(generatedText.sample);
    }

    textPosY += 40;

}