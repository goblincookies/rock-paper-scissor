// CAN BE EXPANDED TO ANNY ODD NUMBER OF OPTIONS
// THE PATTERN IS WEAK >to> STRONG
let options = ["rock", "scissor", "paper",
    "fire", "gun","lightning", "devil",
    "dragon", "water", "air", "sponge",
    "wolf", "tree", "human", "snake"];

let gameOptions = 3;

const pageTitle = document.querySelector("#pageTitle");
const bttnDecrease=document.querySelector("#decrease");
const bttnIncrease=document.querySelector("#increase");
const optionList = document.querySelector("#selectionOptions");


bttnDecrease.addEventListener("click", function(e) {
    gameOptions -= 2;
    gameOptions = clamp(3, options.length, gameOptions);
    setupGame();
    updateSelectionButtons();
});

bttnIncrease.addEventListener("click", function(e) {
    gameOptions += 2;
    gameOptions = clamp(3, options.length, gameOptions);
    setupGame();
    updateSelectionButtons();
});

function setupGame() {
    console.log("setting up the title");
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
    updateSelectionButtons();
    // updateListeners();
    // SETUP OPTIONS
    // ZERO OUT SCORES

}

function makeButton( mainText, strikeText ) {
    // <li><button class="selection">ROCK <br> <s><span class="strike-text">scissor<br></span></s></button></span></li>
    // 
    // [n times]
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

function updateSelectionButtons ( ) {
    
    let liList = optionList.querySelectorAll("li");

    if (liList.length != gameOptions ) {
        
        // CLEAR THE BUTTONS SO WE CAN UPDATE THE CORRECT TEXT
        if (liList.length > 0 ) {
            // CLEAR OUT THE LIST :(
            liList.forEach( (n) => n.remove() );
        }

        let strikeText = [];

        for ( let i = 0; i < gameOptions; i++ ) {
            strikeText.length = 0;

            for ( let n = 0; n < Math.floor(gameOptions/2); n++ ) {
                // 
                strikeText.push( options[1+(i+n*2)%(gameOptions-1)] )
            }

            if (i > 2 && i%2==0) {
                // ODD, and after the first 3
                optionList.insertBefore( makeButton( options[i], strikeText ), optionList.querySelector("li") );
            } else {
                optionList.appendChild( makeButton( options[i], strikeText ) );
            }
        }
    }
    updateListeners();

}

function bttnHumanChoice( e ) {
    console.log(e.target.id );
    // GO THROUGH ALL BUTTONS, SET BKG TO #EBEBEB
    // SET BKG TO #f61212 for target
    let bttnList = optionList.querySelectorAll("li");

    bttnList.forEach( ( liItem )=> {
        bttn = liItem.querySelector("button");
        bttn.style.cssText = "";
    });
    e.target.style.cssText = "background-color: #f61212;"
}

function updateListeners() {

    let bttnList = optionList.querySelectorAll("li");
    let bttn = null;

    bttnList.forEach( ( liItem )=> {
        bttn = liItem.querySelector("button");
        bttn.removeEventListener("click", bttnHumanChoice );
        bttn.addEventListener( "click", bttnHumanChoice );
    });

    // buttons.forEach( (bBoy) => {
    //     bBoy.addEventListener("click", (e) => {
    //         e.target.style.cssText = "background-color: blue;";
    //         alert(bBoy.id);
    //     });

}

function getComputerChoice( options ) {
    let selection = Math.floor(Math.random()*options.length)
    return selection;
}

function clamp( min, max, val ){
    // Math.min(Math.max( selection, 0), options.length - 1 )
    return Math.min( Math.max( val, min), max );
}

function getHumanChoice( options ) {
    let selection = prompt("(0) Rock, (1) Paper, (2) Scissor")
    
    // CHECKS INPUT TO SEE IF IT IS A NUMBER ?
    if (parseInt(selection).toString() == selection) {
        // CLAMP BETWEEN OPTION
        selection = clamp( 0, options.length-1, selection);
        // selection = Math.min(Math.max( selection, 0), options.length - 1 );
        return selection;
    }

    // CHECK TO FIRST LETTER OF ALL THE OPTIONS
    // AGAINST THE FIRST LETTER OF THE TYPED INPUT
    for (let i = 0; i < options.length; i++) {
        if (options[i][0].toLowerCase() == selection[0].toLowerCase() ) {
            return i;
        }
    }
    // INPUT WAS NOT UNDERSTOOD; DEFAULT TO ROCK
    return 0
}

function compareChoices( valA, valB, options ) {
    // 0 = VAL A WINS
    // 1 = VAL B WINS
    // -1= TIE

    // ASSUMES VAL A IS WINNER
    let winner = 0

    if (valA == valB) {
        // IT'S A TIE;
        return -1;
    }

    // CYCLES THROUGH ALL POSSIBLE OPTIONS
    // THAT WOULD BEAT VAL A AND CHECKS THEM
    // AGAINST VAL B.
    for (let i = 0; i < Math.floor(options.length/2); i++) {
        if (valB == ((valA+1) + (i*2))%options.length) {
            winner = 1;
            break;
        }
    }
    return winner;
}

function verboseGameState( hOpt, cOpt, options) {
    return ("You chose " + options[hOpt].toUpperCase() +
    " and the Computer chose " + options[cOpt].toUpperCase()+"." );
}

function announceWinner( hOpt, cOpt, winner, options, score) {
    // console.log(hOpt, cOpt, winner);
    switch(winner) {
        case -1: // TIE
            alert("TIE, you both chose " + options[hOpt].toUpperCase());
            score[2] += 1;
            break;
        case 0: // HUMAN WIN
            alert("YOU WIN! " + verboseGameState( hOpt, cOpt, options ));
            score[0] += 1;
            break;
        case 1: // COMPUTER WIN
            alert("YOU LOSE :( " + verboseGameState( hOpt, cOpt, options ));
            score[1] += 1;
            break;
    }
    return score;

}

function playRound( score ) {
    // GET HUMAN OPTION
    let hOpt = getHumanChoice( options );
    
    // GET COMPUTER OPTION
    let cOpt = getComputerChoice( options );
    
    // COMPARE RESULTS
    let winner = compareChoices( hOpt, cOpt, options );

    // ANNOUNCE WINNER
    announceWinner( hOpt, cOpt, winner, options, score );
    return score;
}

function playGame( totalRounds ) {
    let score = [0,0,0];

    for (let round = 0; round < totalRounds; round ++) {
        score = playRound( score );
        console.log(score);
    }

    alert(`The final score, YOU: ${score[0]} COMPUTER: ${score[1]} TIES:${score[2]}`);

}




// playGame(5);
setupGame();