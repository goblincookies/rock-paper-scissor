console.log("Hello World");

let options = ["rock", "paper", "scissor"];
let humanScore = 0;
let computerScore = 0;


function getComputerChoice( options ) {
    let selection = Math.floor(Math.random()*options.length)
    // let options = ["rock", "paper", "scissor"];
    return selection;
}

function inputToString( selection ) {
    return options[selection];
}

function getHumanChoice( options ) {
    let selection = prompt("(0) Rock, (1) Paper, (2) Scissor")
    
    // IS IT A NUMBER ?
    if (parseInt(selection).toString() == selection) {
        // CLAMP BETWEEN OPTION
        selection = Math.min(Math.max( selection, 0), options.length - 1 );
        return selection;
    }

    // CHECK TO FIRST LETTER OF ALL THE OPTIONS
    // AGAINST THE FIRST LETTER OF THE TYPED INPUT
    for (let i = 0; i < options.length; i++) {
        if (options[i][0].toLowerCase() == selection[0].toLowerCase() ) {
            return i;
        }
    }
    // I've got nothing, default to 0
    return 0
}

function compareChoices( options, val1, val2 ) {
    if (val1 == val2) {
        return -1;
    }
    // ((A - B) + 4 ) %3 == 0
    return ((((val1-val2)+options.length+1)%options.length) == 0) + 0;
}

function playRound() {
    
    // Get Human Option
    let hOpt = getHumanChoice( options );
    
    // Get Compu Option
    let cOpt = getComputerChoice( options );
    
    // COMPARE
    let winner = compareChoices( options, hOpt, cOpt )

    // ANNOUNCE WINNER
    console.log(hOpt, cOpt, winner);
    if (winner > 0) {
        alert("YOU LOSE :(")
    } else if (winner > -1){
        alert("YOU WIN!")
    } else {
        alert("TIE")
    }
}

playRound();