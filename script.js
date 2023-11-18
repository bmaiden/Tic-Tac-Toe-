
// 1) Display an empty tic-tac-toe board when the page is initially displayed.  √
// 2) A player can click on the nine cells to make a move.
// 3) Every click will alternate between marking an X and O.
// 4) Once occupied with an X or O, the cell cannot be played again.
// 5) Provide a Reset Game button that will clear the contents of the board.

//Testing to make sure HTML & CSS are linked to JS  √
//console.log("This is working!")

/*----- constants -----*/
//Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. 
//The value assigned to each key represents the color to display for an empty square (null), 
//player 1 and player -1.
const colors = {
    0: 'white',
    1: 'purple',
    '-1': 'orange'
};

/*----- state variables -----*/
let board;   //an array of 3 nested arrays
let turn;    //will be a value of 1 || -1
let winner;  //null || 1 || -1 || 'tie'

/*----- cached DOM elements  -----*/
//save HTML elements as variables to use later
const messageEl = document.querySelector('h2');
const playAgainButton = document.querySelector('button');

/*----- functions -----*/
//function -init- initializes an empty game board and runs one time when game loads.
//also called when the play again button is clicked.
function init (){
    //set values and nested array for our state variables
    turn = 1;
    winner = null;

    board = [
        [0,0,0],   // col 0
        [0,0,0],   // col 1
        [0,0,0],   // col 2
    ]

    //render()
};

init();


/*----- event listeners -----*/
//click play again button. This initialize an empty board and resets all variables
playAgainButton.addEventListener('click', init);






