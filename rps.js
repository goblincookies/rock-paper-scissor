// CAN BE EXPANDED TO ANNY ODD NUMBER OF OPTIONS
// THE PATTERN IS WEAK >to> STRONG
let options = ["rock", "scissor", "paper",
    "fire", "gun","lightning", "devil",
    "dragon", "water", "air", "sponge",
    "wolf", "tree", "human", "snake"];

let currentGameOptions = ["rock", "scissor", "paper"];

let gameOptions = 3;
let defaultChoice = "-------";
let throwText = "THROW";
let humanChoiceIndex = -1;
let compChoiceIndex = -1;
let score = [0,0,0];


const pageTitle = document.querySelector("#pageTitle");
const bttnDecrease=document.querySelector("#decrease");
const bttnIncrease=document.querySelector("#increase");
const optionList = document.querySelector("#selectionOptions");
const humanChoice = document.querySelector("#selection-human");
const compChoice = document.querySelector("#selection-comp");
const newGame = document.querySelector("#new-game");

const scoreHuman = document.querySelector("#score-human");
const scoreComp = document.querySelector("#score-comp");
const scoreTie = document.querySelector("#score-tie");


// NEW GAME BUTTON
newGame.addEventListener("click", function() {
    setupGame();
});

// DECREASE THE NUMBER OF PLAYABLE OPTIONS 
bttnDecrease.addEventListener("click", function(e) {
    gameOptions -= 2;
    gameOptions = clamp(3, options.length, gameOptions);
    setupGame();
    updateSelectionButtons();
});

// INCREASE THE NUMBER OF PLAYABLE OPTIONS 
bttnIncrease.addEventListener("click", function(e) {
    gameOptions += 2;
    gameOptions = clamp(3, options.length, gameOptions);
    setupGame();
    updateSelectionButtons();
});

// THROW BUTTON
humanChoice.addEventListener("click", playRound );

// SETS NEW GAME
function setupGame() {

    // SETUP TITLE
    let title = "";
    for (let i = 0; i < gameOptions; i++) {
        title += options[i].toUpperCase()
        if (gameOptions > 2 && i == 2) {
            title+="<br>";
        }else if ( gameOptions > 5 && Math.floor(gameOptions/2)+1 == i ) {
            title += "<br>";
        } else if (i < gameOptions-1) {
            title += "*"
        }
    }
    pageTitle.innerHTML = title

    // MAKE SURE THE BUTTONS MATCH THE SELECTED OPTIONS
    updateSelectionButtons();

    // RESET THE SCORE
    updateScore( 99 );
}

// REDRAWS THE SCORE BASED ON WHAT'S
// ALREADY IN THE SCORE VARIABLE
// VAL IS THE WINNER CODE
function updateScore( val ) {
    switch(val) {
        case -1: // TIE
            writeScore(scoreTie, 2);
            break;
        case 0: // HUMAN WIN
            writeScore(scoreHuman, 0);
            break;
        case 1: // COMPUTER WIN
            writeScore(scoreComp, 1);
            break;
        case 99: // RESET
            score = [0,0,0];
            writeScore(scoreHuman, 0);
            writeScore(scoreComp, 1);
            writeScore(scoreTie, 2);
            break;
    }
}

// ANIMATES THE SCORE
// VAL IS THE DOCUMENT ELEMENT
// ID IS THE SCORE INDEX
function writeScore( val, id ) {
    val.textContent = score[id];
    val.classList.add("score-add");
}

// REMOVES THE ANIMATION FLAGS
// SO THEY CAN BE REANIMATED
function clearScoreAnim() {
    scoreHuman.classList.remove("score-add");
    scoreComp.classList.remove("score-add");
    scoreTie.classList.remove("score-add");
}

// A TEMPLATE TO MAKE ROCK/PAPER/ETC BUTTONS
// MAINTEXT IS THE TITLE OF THE BUTTON
// STRIKETEXT IS THE TEXT THAT IS BELOW
function makeButton( mainText, strikeText ) {
    // <li>
    //      <button class="selection">
    //          SCISSOR <br>
    //              <s>
    //              <span class="strike-text">
    //                  Paper<br>
    //                  .....<br>
    //              </span>
    //          </strike>
    //      </button>
    // </li>
    
    let text = mainText.toUpperCase() + "<br>";
    text +="<s>";
    text += '<span class="strike-text" >';
    strikeText.forEach( (n)=> text += (n.toUpperCase()+"<br>") );
    text += "</span>";
    text += "</s>";

    const liItem = document.createElement("li");
    const bttnItem = document.createElement("button");
    bttnItem.classList.add("selection");
    bttnItem.id = mainText;
    bttnItem.innerHTML = text;

    liItem.appendChild( bttnItem );

    return liItem;
}

// MAKES SURE THE BUTTONS MATCH THE GAME OPTIONS
function updateSelectionButtons ( ) {
    
    let liList = optionList.querySelectorAll("li");

    if (liList.length != gameOptions ) {
        
        // CLEAR THE BUTTONS SO WE CAN UPDATE THE CORRECT TEXT
        if (liList.length > 0 ) {

            // CLEAR OUT THE LIST :(
            liList.forEach( (n) => n.remove() );
            currentGameOptions = [];
        }

        let strikeText = [];

        for (let i = 0; i< gameOptions; i++) {
            if (i > 2 && i%2==0) {
                currentGameOptions.unshift( options[i] );
            } else {
                currentGameOptions.push( options[i] );
            }
        }

        for (let i =0; i<currentGameOptions.length; i++) {
            strikeText.length = 0;
            
            for ( let n = 0; n < Math.floor(currentGameOptions.length/2); n++ ) {
                // APPEND THE TEXT
                strikeText.push( currentGameOptions[(1+(i+n*2))%(currentGameOptions.length)] )
            }
            optionList.appendChild( makeButton( currentGameOptions[i], strikeText ) );
        }

    }

    // DISABLE THE THROW BUTTON UNTIL
    // THE PLAYER HAS MADE A SELECTION 
    humanChoice.disabled = true;
    humanChoice.textContent=defaultChoice;
    compChoice.textContent=defaultChoice;

    // REMOVE ANY ANIMATION OR WIN CONDITIONS
    humanChoice.classList.remove("pulse", "playing", "winner", "loser", "tie");
    compChoice.classList.remove("pulse", "playing", "winner", "loser", "tie");

    // MAKE SURE EACH BUTTON HAS AN EVENT LISTENER
    updateListeners();
}

// TRIGGERS WHEN THE PLAYER SELECTS ROCK/PAPER/ETC
function bttnHumanChoice( e ) {
    clearScoreAnim();
    console.log(e.target.id );

    // THE BUTTON SHOULD APPEAR TO TOGGLE ON
    // GO THROUGH ALL BUTTONS, SET BKG TO #EBEBEB (OFF)
    let bttnList = optionList.querySelectorAll("li");
    bttnList.forEach( ( liItem )=> {
        bttn = liItem.querySelector("button");
        bttn.style.cssText = "";
    });
    // SET BKG TO #f61212 (ON) for target
    e.target.style.cssText = "background-color: #f61212;";
    
    // MAKE SURE THE THROW BUTTON IS
    // ENABLED AND ANIMATED
    if (humanChoice.disabled ) {
        humanChoice.disabled = false;
        humanChoice.classList.remove("playing", "winner", "loser", "tie");
        humanChoice.classList.add("pulse");
    }

    humanChoiceIndex = currentGameOptions.indexOf(e.target.id);
    humanChoice.textContent = throwText.toUpperCase();
    compChoice.textContent = defaultChoice.toUpperCase();
    compChoice.classList.remove("playing", "winner", "loser", "tie");
}

// MAKES SURE EACH ROCK/PAPER/ETC BUTTON HAS
// A LISTENER. IT FIRST CLEARS ANY OLD ONES
function updateListeners() {

    let bttnList = optionList.querySelectorAll("li");
    let bttn = null;

    bttnList.forEach( ( liItem )=> {
        bttn = liItem.querySelector("button");
        bttn.removeEventListener("click", bttnHumanChoice );
        bttn.addEventListener( "click", bttnHumanChoice );
    });
}

// RANDOMLY SELECTS AN OPTION AND RETURNS THE INDEX
function getComputerChoice() {
    let selection = Math.floor(Math.random()*currentGameOptions.length);
    return selection;
}

function clamp( min, max, val ){
    return Math.min( Math.max( val, min), max );
}


function compareChoices( valA, valB ) {
    // 0 = VAL A WINS
    // 1 = VAL B WINS
    // -1= TIE

    // ASSUMES VAL A IS WINNER
    let winner = 1;

    if (valA == valB) {
        // IT'S A TIE;
        return -1;
    }

    // CYCLES THROUGH ALL POSSIBLE OPTIONS
    // THAT WOULD BEAT VAL A AND CHECKS THEM
    // AGAINST VAL B.

    for (let i = 0; i < Math.floor(gameOptions/2); i++) {
        if (valB == ((valA+1) + (i*2))%gameOptions) {
            winner = 0;
            break;
        }
    }
    return winner;
}

// TRIGGERS AFTER THROW IS CLICKED
function playRound ( e ) {
    // GET COMPUTER OPTION
    let cOpt = getComputerChoice();

    // REMOVE ANY STYLING ON THE ROCK/PAPER/ETC BUTTONS
    let bttnList = optionList.querySelectorAll("li");
    bttnList.forEach( ( liItem )=> {
        bttn = liItem.querySelector("button");
        bttn.style.cssText = "";
    });

    // DISABLE THE THROW BUTTON
    humanChoice.disabled = true;
    humanChoice.classList.remove("pulse");
    
    // REPLACE THROW WITH THE PLAYERS CHOICE
    humanChoice.textContent = currentGameOptions[humanChoiceIndex].toUpperCase();
    compChoice.textContent = currentGameOptions[cOpt].toUpperCase();
    
    let winner = compareChoices( humanChoiceIndex, cOpt );

    // PLAY WINNER ANIMATIONS
    // AND UPDATE THE SCORE
    switch(winner) {
        case -1: // TIE
            humanChoice.classList.add("playing", "tie");
            compChoice.classList.add("playing", "tie");
            score[2] += 1;
            break;
        case 0: // HUMAN WIN
            humanChoice.classList.add("playing", "winner");
            compChoice.classList.add("playing", "loser");
            score[0] += 1;
            break;
        case 1: // COMPUTER WIN
            humanChoice.classList.add("playing", "loser");
            compChoice.classList.add("playing", "winner");
            score[1] += 1;
            break;
    }

    // UPDATE SCORE ON DELAY
    setTimeout(function (){
        updateScore(winner);
      }, 1000);

}

setupGame();