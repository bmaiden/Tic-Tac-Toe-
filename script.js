// 1) Display an empty tic-tac-toe board when the page is initially displayed.  √
// 2) A player can click on the nine cells to make a move.  √
// 3) Every click will alternate between marking an X and O.
// 4) Once occupied with an X or O, the cell cannot be played again.  √
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

//nested array for winning combinations
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


/*----- state variables -----*/
let board;   //an array 
let turn;    //will be a value of 1 || -1
let winner;  
//let resetGame = false;


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
//console.log('squareEls \n', squareEls);

/*----- functions -----*/
//function -init- initializes an empty game board and runs one time when game loads
//also called when the play again button is clicked
function init (){
//set values and nested array for our state variables
    turn = 1;
    winner = null;
//  let resetGame = true;
    board = [null,null,null,null,null,null,null,null,null];
    
    render()
};

init();

//function -renderBoard- with nested functions
//renders the game board by looping over board array/functions and applies a background color for each element 
function renderBoard() {
    board.forEach((squareVal, squareIdx) => {
        const squareEls = document.getElementById(`sq-${squareIdx}`)
            //console.log('squareEl', squareEl)
        squareEls.style.backgroundColor = colors[squareVal]
    })
}

//function -renderControls- changes visibility of the play again button
//this uses a ternary operator: ask a question ? if true, do this : if false do that  uses 2 conditions only
function renderControls() {
    playAgainButton.style.visibility = winner ? 'visible' : 'hidden'
//    if (resetGame = false) {
//        restartGame()
//    }
};

//function -renderMessage- displays a tie, a winner, or current player turn
function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = "It's a Tie!"
//        resetGame = false
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${colors[winner]}">
                ${colors[winner].toUpperCase()}
            </span> Wins!
        `
//        resetGame = false
    } else {
        messageEl.innerHTML = `
            <span style="color: ${colors[turn]}">
                ${colors[turn].toUpperCase()}
            </span>'s Turn!
        `
    }
};

//function -render- calls all of our render based functions at once; call for this function is placed in the function -init
function render() {
    renderBoard()
    renderMessage()
    renderControls()
};

//function -squarePicked- main gameplay function, determines square selected with a event
function squarePicked (event) {
    //get index of square
    const squareIdx = parseInt(event.target.id.replace(`sq-`, ''))
    console.log('this is squareIdx inside squarePicked', squareIdx)
    //determine if valid move or a winner 
    if (board[squareIdx] || winner) return
    //assign value to the square
    board[squareIdx] = turn
    //after everything is done, change whose turn it is
    turn *= -1
    //assign winning value to the winner variable
    winner = getWinner()
    //render updated state
    render()
}

//function -getWinner- uses winningCombo array to determine if there is a winner or determines tie
function getWinner() {
    for (let winArr of winningCombos) {
        if (Math.abs(board[winArr[0]] + board[winArr[1]] + board[winArr[2]]) === 3) return board[winArr[0]];
        } 
        if (board.includes(null)) return null
        else return 'T'
};

//function -restartGame- resets game board back to empty
function restartGame (squareEls) {
   //colors = 1
   //board = [null,null,null,null,null,null,null,null,null];
    squareEls.forEach((squareEl) => squareEls.style.backgroundColor = "");
    init()
    playAgainButton.style.visibility = 'hidden'  
};

/*---- event listeners -----*/
//click on the box to make a move
document.getElementById('board').addEventListener('click', squarePicked);
//click play again button. This initialize an empty board and resets all variables
//playAgainButton.addEventListener('click', init);
playAgainButton.addEventListener('click', function () {
    restartGame(squareEls)
})