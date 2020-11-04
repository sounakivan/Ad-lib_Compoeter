var textInput;
var textPosY = 200;
let generateButton;
let bg = 250;
var outputText;


// Create the character level generator with a pre trained model
const rnn = ml5.charRNN('models/woolf/', modelReady);

// When the model is loaded
function modelReady() {
  console.log('Model Loaded!');
  generateButton.html('Add line to poem');
}

function setup() {
    createCanvas(600, 600);
  
    textInput = createInput();
  
    textInput.size(400, 25)
    textInput.position(width/2 - textInput.width/2, 50);
  
    generateButton = createButton('loading...');
    generateButton.position(width/2 - generateButton.width/2, 100);
    generateButton.mousePressed(generateText);

}

function draw() {
    background(bg);
}

function generateText () {
    
    bg = color(random(180,255),random(180,255),random(180,255));
    
    newLine = createP();
    newLine.position(100, textPosY);
    newLine.html(textInput.value());
    
    genLine = createP('...');
    genLine.position(100, textPosY+20);
    
    var s = textInput.value()
    var rs = new RiString(s);
    var numChars = rs.length();
    console.log(numChars);
    
    var words = rs.words();
    var generatedText = '';
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        
        if (!words[0].isNoun) {
            console.log(words[0])
        }
    }
    
    if (rnn.ready) {
        //console.log("Running", textInput.value());
        // Generate content
        rnn.generate({ seed: textInput.value(), length: numChars, temperature: .8 }, (err, results) =>     {
            
            generatedText = results;
            console.log(results);
            genLine.html(generatedText.sample);
            
        });
        
    }
    
    textPosY += 40;
    
    

}