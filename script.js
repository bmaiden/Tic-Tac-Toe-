
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
// ... = spread operator
// this operator takes a copy of whatever is selected(object, a nodelist, htmlcollection, array) and 
//does something to all of the items
// because we used array brackets, the spread operator is grabbing the items in the nodelist and pushing 
//them into a new array
const squareEls = [...document.querySelectorAll('#board > div')];
console.log('squareEls \n', squareEls);

/*----- functions -----*/
//function -init- initializes an empty game board and runs one time when game loads
//also called when the play again button is clicked
function init (){
    //set values and nested array for our state variables
    turn = 1;
    winner = null;

    board = [
        [0,0,0],   // col 0
        [0,0,0],   // col 1
        [0,0,0],   // col 2
    ]

    render()

};

init();


//function -renderBoard- with nested functions
//renders the game board by looping over board array/functions and applies a background color for each element 
function renderBoard() {
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = colors[cellVal]
        })
    })
};

//function -renderControls- changes visibility of the play again button
//this uses a ternary operator: ask a question ? if true, do this : if false do that
function renderControls() {
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
};

//function -renderMessage- displays a tie, a winner, or current player turn
function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!"
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${colors[winner]}">
                ${colors[winner].toUpperCase()}
            </span> Wins!
        `
    } else {
        messageEl.innerHTML = `
            <span style="color: ${colors[turn]}">
                ${colors[turn].toUpperCase()}
            </span> Turn!
        `
    }
};

//function -render- calls all of our render based functions at once; call for this function is placed in the function -init
function render() {
    renderBoard()
    renderMessage()
    renderControls()
};

//function -boxClicked- main gameplay function, finds the box clicked on
//function boxClicked (event) {
//determine square selected
function boxClicked (event){
    const colIdx = squareEls.indexOf(event.target)
    console.log('this gives a number for boxClicked', colIdx)
};

/*----- event listeners -----*/
//click on the box to make a move
document.getElementById('board').addEventListener('click', boxClicked);
//click play again button. This initialize an empty board and resets all variables
playAgainButton.addEventListener('click', init)
