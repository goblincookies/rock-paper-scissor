// CAN BE EXPANDED TO ANNY ODD NUMBER OF OPTIONS
// THE PATTERN IS WEAK >to> STRONG
let options = ["rock", "paper", "scissor"];

function getComputerChoice( options ) {
    let selection = Math.floor(Math.random()*options.length)
    return selection;
}

function getHumanChoice( options ) {
    let selection = prompt("(0) Rock, (1) Paper, (2) Scissor")
    
    // CHECKS INPUT TO SEE IF IT IS A NUMBER ?
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

    alert("The final score, YOU: " + score[0] + " COMPUTER: " + score[1] + " TIES:" + score[2]);

}


playGame(5);