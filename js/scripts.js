/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');

/*----- app's state (variables) -----*/
// use objectives to represent scores. p = player, t = tie, and c = computer
let scores;

// use objects to remember player and computer choice. key of 'p' for player results and values of 'r' rock, 'p' for paper, 's' for scissors
let results;

// need a variable to outcome. string and p if player win, t is tie, and c for computer
let winner;


/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init(); //calling the init function

//initializes all state(aka) data, then call render();
function init(){
    scores = {
        p:0,
        t:0,
        c:0
    };
    results = {
        p: 'r',
        c: 'r'
    };
    winner = 't';
    render();
}

function render() {
    
}
