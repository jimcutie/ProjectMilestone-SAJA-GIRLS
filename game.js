var wordBank = [
    "ABIDE","ABOVE","ACTOR","ACUTE","ADORE","ADULT","AGENT","AGILE","ALARM","ALBUM",
    "ALERT","ALIEN","ALIGN","ALIVE","ALLOW","ALONE","ALONG","ALTER","AMBER","AMONG",
    "AMPLE","ANGEL","ANGLE","ANGRY","ANODE","APRON","ARGUE","ARISE","ARMED","ARSON",
    "ASIDE","ATONE","AUDIO","AUDIT","AVOID","BADGE","BAKER","BALMY","BASIC","BATCH",
    "BEACH","BEARD","BEAST","BEGIN","BEING","BENCH","BIRTH","BLACK","BLAME","BLEND",
    "BLIND","BLOCK","BLOND","BOARD","BOAST","BOUND","BRAIN","BRAKE","BRAND","BRAVE",
    "BREAD","BREAK","BRICK","BRIDE","BRIEF","BRING","BROAD","BROKE","BROWN","BUILD",
    "BUILT","BUYER","CABLE","CANDY","CAUSE","CHAIN","CHAIR","CHAOS","CHARM","CHASE",    
    "CHEAP","CHEST","CHIEF","CHILD","CHINA","CHOIR","CLAIM","CLEAN","CLEAR","COAST",
    "COUNT","COURT","COVER","CRAFT","CRANE","CRASH","CRIME","CROWN","CURVE","DAILY",
    "DANCE","DEALT","DEATH","DEBUT","DELAY","DEPTH","DIRTY","DOING","DOUBT","DOZEN",
    "DRAFT","DRAWN","DREAM","DRINK","DRIVE","DROVE","DYING","EARTH","EIGHT","EMPTY",
    "ENJOY","ENTRY","EQUAL","EXACT","EXIST","EXTRA","FAITH","FALSE","FAULT","FIELD",
    "FIGHT","FINAL","FIRST","FIXED","FLASH","FLUID","FOCUS","FORCE","FORTH","FOUND",
    "FRAME","FRANK","FRESH","FRONT","FRUIT","GIANT","GLOBE","GRACE","GRADE","GRANT",
    "GRAVE","GREAT","GROUP","GROWN","GUARD","GUIDE","HEART","HEAVY","HONEY","HORSE",
    "HOTEL","HOUSE","HUMAN","IDEAL","IMAGE","IMPLY","INDEX","INPUT","JOINT","JUDGE",
    "LARGE","LASER","LATER","LAUGH","LAYER","LEARN","LEAST","LIGHT","LOGIC","LOWER",
    "LUCKY","LUNCH","MAGIC","MAJOR","MAKER","MARCH","MATCH","MAYOR","MEANT","MEDIA",
    "METAL","MIGHT","MINOR","MODEL","MONEY","MONTH","MOUNT","MOUSE","MOUTH","MOVED",
    "MOVIE","MUSIC","NIGHT","NOISE","NORTH","NOTED","NOVEL","NURSE","OCEAN","OFTEN",
    "OTHER","OUGHT","PAINT","PANEL","PARTY","PHASE","PHONE","PILOT","PITCH","PLACE",    
    "PLAIN","PLANE","PLANT","PLATE","POINT","POUND","POWER","PRICE","PRIDE","PRIME",
    "PRINT","PRIZE","PROUD","PROVE","QUERY","QUEST","QUICK","QUIET","QUITE","RADIO",
    "RAISE","RANGE","RAPID","RATIO","REACH","READY","RIGHT","ROUND","ROUTE","ROYAL",
    "SCALE","SCOPE","SCORE","SHAPE","SHARE","SHARP","SHELF","SHIFT","SHINE","SHIRT",
    "SHOCK","SHORT","SHOWN","SIGHT","SINCE","SLIDE","SMART","SMILE","SMOKE","SOLID",
    "SOLVE","SOUND","SOUTH","SPACE","SPARE","SPEAK","SPEND","SPLIT","SPOKE","SPORT",
    "STAGE","STAKE","STAND","STICK","STOCK","STONE","STORE","STORM","STORY","STRIP",
    "STUCK","STUDY","STYLE","SUGAR","SUITE","SUPER","TABLE","TAKEN","TEACH","THANK",
    "THEIR","THICK","THING","THINK","THIRD","THOSE","THROW","TIMES","TIRED","TODAY",
    "TOPIC","TOUCH","TOUGH","TOWER","TRACK","TRADE","TRAIN","TREND","TRIAL","TRUCK",
    "TRULY","TWICE","UNDER","UNITY","UNTIL","UPSET","URBAN","USAGE","VALID","VALUE",
    "VIDEO","VOICE","WASTE","WATCH","WATER","WHILE","WHITE","WHOLE","WHOSE","WOMAN",
    "WORLD","WORTH","WOULD","WRITE","WRONG","YIELD","YOUNG","YOUTH","ZEBRA"
];

var quizList = [

    {
        question: "What is the capital of Japan?",
        options: ["Tokyo","Seoul","Beijing","Bangkok"],
        answer: 0
    },

    {   
        question: "How many continents are there?",
        options: ["5","6","7","8"],
        answer: 2
    },

    {
        question: "What gas do plants absorb?",
        options: ["Oxygen","Carbon Dioxide","Nitrogen","Helium"],
        answer: 1
    },

    {
        question: "Which animal is the fastest on land?",
        options: ["Cheetah","Lion","Horse","Tiger"],
        answer: 0
    },

    {
        question: "What is the largest planet?",
        options: ["Earth","Mars","Jupiter","Saturn"],
        answer: 2
    },

    {
        question: "How many days are in a leap year?",
        options: ["364","365","366","367"],
        answer: 2
    },

    {
        question: "Which country invented pizza?",
        options: ["France","Italy","Spain","USA"],
        answer: 1
    },

    {
        question: "Which ocean is the largest?",
        options: ["Atlantic","Pacific","Indian","Arctic"],
        answer: 1
    },

    {
        question: "Which planet is closest to the Sun?",
        options: ["Mercury","Venus","Earth","Mars"],
        answer: 0
    },

    {
        question: "What is 9 x 8?",
        options: ["72","64","81","78"],
        answer: 0
    }

];

var secretWord = "";
var attempts = 0;
var maxAttempts = 6;

var currentQuiz = null;

var today = new Date();
document.getElementById("date").innerText =
"Date: " + today.toDateString();


function selectWord(){
    var index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
}

function createRow(rowIndex){
    var game = document.getElementById("game");
    var row = document.createElement("div");
    row.className = "row";

    for(var i=0;i<5;i++){
        var box = document.createElement("input");

        box.type = "text";
        box.maxLength = 1;
        box.className = "box";
        box.id = "box"+rowIndex+"_"+i;

        box.setAttribute(
            "onkeyup",
            "moveNext(" + rowIndex + "," + i + ")"
        );

        box.setAttribute(
            "onkeydown",
            "moveBack(event," + rowIndex + "," + i + ")"
        );
        row.appendChild(box);
    }

game.appendChild(row);
}

function createBoard(){
    for(var i=0;i<maxAttempts;i++){
        createRow(i);
    }
}

function getGuess(){
    var guess = "";

    for(var i=0;i<5;i++){
        var box = document.getElementById("box"+attempts+"_"+i);
        var value = box.value.toUpperCase();

        if(value === "") {
            alert("Please fill all boxes!");
            return;
        }
        
        else if(value < "A" || value > "Z") {
            alert("Only letters are allowed!");
            return;
    }
        guess += value;
    }

return guess;
}

function lockRow(row){
    for(var i=0;i<5;i++){
        document.getElementById("box"+row+"_"+i).disabled = true;
    }
}

function colorBoxes(guess){
    var secretArray = secretWord.split("");
    var guessArray = guess.split("");

    var result = ["wrong","wrong","wrong","wrong","wrong"];

    for(var i=0;i<5;i++){
        if(guessArray[i] === secretArray[i]){
            result[i] = "correct";
            secretArray[i] = null;
            guessArray[i] = null;
        }
    }

    for(var i=0;i<5;i++){
        if(guessArray[i] != null){
            var index = secretArray.indexOf(guessArray[i]);

            if(index != -1){
                result[i] = "present";
                secretArray[index] = null;
            }
        }
    }

    for(var i=0;i<5;i++){
        var box = document.getElementById("box"+attempts+"_"+i);

        box.className = "box " + result[i];
    }
}

function updateRowAccess(){
    for(var r = 0; r < maxAttempts; r++){
        for(var c = 0; c < 5; c++){
            var box = document.getElementById("box" + r + "_" + c);

            if(r === attempts){
                box.disabled = false;   
            } else {
                box.disabled = true;    
            }
        }
    }
}

function checkGuess(){
    if(attempts >= maxAttempts){
        return;
    }

    var guess = getGuess();

    colorBoxes(guess);
    lockRow(attempts);

    if(guess === secretWord){
        var sound = document.getElementById("winSound");
        sound.play();

        document.getElementById("message").innerText =  "You WON! Word was " + secretWord;
        return;
    }

    attempts++;
    updateRowAccess();

    if(attempts >= maxAttempts){
        var sound = document.getElementById("lostSound");
        sound.play();

        document.getElementById("message").innerText ="You LOST! Word was " + secretWord;
    }
}

function moveNext(row, col){
    var currentBox = document.getElementById("box" + row + "_" + col);

    if(currentBox.value.length === 1){
        if(col < 4){
            document.getElementById("box" + row + "_" + (col + 1)).focus();
        }
    }
}

function moveBack(e, row, col){
    if(e.key === "Backspace"){
        var currentBox = document.getElementById("box" + row + "_" + col);

        if(currentBox.value === "" && col > 0){
            document.getElementById("box" + row + "_" + (col - 1)).focus();
        }
    }
}

function setDifficulty(level){
    sessionStorage.setItem("difficulty", level);

    document.getElementById("easyButton").classList.remove("levelSelected");
    document.getElementById("mediumButton").classList.remove("levelSelected");
    document.getElementById("hardButton").classList.remove("levelSelected");
    document.getElementById("extremelyImpossibleButton").classList.remove("levelSelected");

    if(level === "easy"){
        maxAttempts = 6;
        document.getElementById("easyButton").classList.add("levelSelected");
    } else if(level === "medium"){
        maxAttempts = 4;
        document.getElementById("mediumButton").classList.add("levelSelected");
    } else if(level === "hard"){
        maxAttempts = 3;
        document.getElementById("hardButton").classList.add("levelSelected");
    } else if(level === "extremelyImpossible"){
        maxAttempts = 1;
        document.getElementById("extremelyImpossibleButton").classList.add("levelSelected");

    } 

    resetGame();

    if(level === "extremelyImpossible"){
        document.getElementById("hintFlow").style.display = "block";
        askHint();  
    } else {
        document.getElementById("hintArea").style.display = "none";
        document.getElementById("quizArea").style.display = "none";
        document.getElementById("hintFlow").style.display = "none";
    }
}

function resetGame(){
    document.getElementById("hintText").innerText = "";
    document.getElementById("quizQuestion").innerText = "Question will appear here";
    document.querySelectorAll("#quizOptions button").forEach(btn => btn.innerText = "Option");

    document.getElementById("quizArea").style.display = "none";
    document.getElementById("hintFlow").style.display = "none";
    document.getElementById("hintArea").style.display = "none";

    document.querySelectorAll("audio").forEach(function(sound){
        sound.pause();
        sound.currentTime = 0;
    });

    secretWord = selectWord();
    attempts = 0;

    document.getElementById("game").innerHTML = "";
    document.getElementById("message").innerText = "";

    createBoard();
    updateRowAccess();
}

var savedDifficulty = sessionStorage.getItem("difficulty");

if(savedDifficulty){
    setDifficulty(savedDifficulty);
} else {
    setDifficulty("easy");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        checkGuess();       
    }
});

function generateHint(){

    const vowels = "AEIOU";
    var vowelCount = 0;

    for(var i=0;i<secretWord.length;i++){
        if(vowels.includes(secretWord[i])){
            vowelCount++;
        }
    }

    var randomHint = Math.floor(Math.random()*4);
    let hint = "";

    if(randomHint === 0){
        hint = "The word starts with: " + secretWord[0];
    }

    if(randomHint === 1){
        hint = "The word ends with: " + secretWord[4];
    }

    if(randomHint === 2){
        hint = "The word has " + vowelCount + " vowel(s)";
    }

    if(randomHint === 3){
        hint = "One letter in the word is: " + secretWord[Math.floor(Math.random()*5)];
    }

    return hint;
}

function generateQuiz(){

    var index = Math.floor(Math.random() * quizList.length);
    currentQuiz = quizList[index];

    document.getElementById("quizQuestion").innerText = currentQuiz.question;

    var buttons = document.querySelectorAll("#quizOptions button");

    for(var i=0;i<4;i++){
        buttons[i].innerText = currentQuiz.options[i];
    }

}

function checkQuiz(choice){

    document.getElementById("hintArea").style.display = "block";

    if(choice === currentQuiz.answer){
        document.getElementById("hintText").innerText =
            "Correct! Hint: " + generateHint();
    } else {
        document.getElementById("hintText").innerText =
            "Wrong answer. No hint!";
    }
}

function askHint() {
    document.getElementById("hintFlow").style.display = "block";
    document.getElementById("hintButtons").style.display = "block";
    document.getElementById("hintPrompt").innerText = "😏 Is it too hard? Do you want a hint?";
}

function startHintFlow(choice) {
    if(choice === "yes"){
        document.getElementById("hintFlow").style.display = "none";
        generateQuiz();
        document.getElementById("quizArea").style.display = "block";
    } else {
        document.getElementById("hintFlow").style.display = "none";
        document.getElementById("hintText").innerText = "No hint for you then! 😏";
        document.getElementById("hintArea").style.display = "block";
    }
}

function checkQuiz(choice){
    document.getElementById("quizArea").style.display = "none"; 

    if(choice === currentQuiz.answer){
        document.getElementById("hintText").innerText = "Correct! Hint: " + generateHint();
    } else {
        document.getElementById("hintText").innerText = "Wrong answer! No hint. 😝";
    }

    document.getElementById("hintArea").style.display = "block"; 
}