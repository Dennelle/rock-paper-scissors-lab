/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_LOOKUP = {
    r: {img: 'imgs/rock.png', beats: 's'},
    p: {img: 'imgs/paper.png', beats: 'r'},
    s: {img: 'imgs/scissors.png', beats: 'p'}
};

/*----- app's state (variables) -----*/
// use objectives to represent scores. p = player, t = tie, and c = computer
let scores;

// use objects to remember player and computer choice. key of 'p' for player results and values of 'r' rock, 'p' for paper, 's' for scissors
let results;

// need a variable to outcome. string and p if player win, t is tie, and c for computer
let winner;


/*----- cached element references -----*/
const pResultEL = document.getElementById('p-result');
const cResultEL = document.getElementById('c-result');
const countdownEL = document.getElementById('c-result');


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);

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

// In response to user interaction (player makes a move),
// we update all impacted state, then finally, call render()
function handleChoice(evt) {
    //guards to protect if the user clicks something other than the 3 buttons.
    if (evt.target.tagName !== 'BUTTON') return;
    // PLayer has made a choice
    results.p = evt.target.innerText.toLowerCase();
    //compute a random choice for the computer
    results.c = getRandomRPS();
    winner = getWinner();
    scores[winner] += 1;

    render();

}

function getWinner() {
    if (results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c';


}
function getRandomRPS() {
    const rps = Object.keys(RPS_LOOKUP);
    const rndIdx = Math.floor(Math.random() * rps.length);


    return rps[rndIdx];
}

function renderScores() {
for (let key in scores) {
    const scoreEl = document.getElementById(`${key}-score`);
    scoreEl.innerText = scores[key];
    }
}

function renderResults() {
    pResultEL.src = RPS_LOOKUP[results.p].img;
    cResultEL.src = RPS_LOOKUP[results.c].img;
    pResultEL.style.borderColor = winner === 'p' ? 'grey' : 'white';
    cResultEL.style.borderColor = winner === 'c' ? 'grey' : 'white';
}
//render functions or visual all state to the DOM
function render() {
    renderCountdown(function() {
    renderScores();
    renderResults();
    });

    function renderCountdown(cb) {
    let count = 3;
    AUDIO.currentTime = 0;
    AUDIO.play();
    countdownEL.style.visibility = 'visible';
    countdownEL.innerText = count;
    const timerId = setInterval(function() {
        count --;
        if (count) {
            countdownEL.innerText = count;
        } else {
            clearInterval(timerId);
            countdownEL.style.visibility = 'hidden';
            cb();
        }
    }, 1000 );
    }

}
