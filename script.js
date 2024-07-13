const statusDisplay=document.querySelector('.status');

let gameActive=true;
let currPlayer="X";

let gameState=["","","","","","","","",""];

const winMsg=()=> `Player ${currPlayer} has Won!`;
const drawMsg=()=> `Game ended in draw!`;
const currPlayerTurn=()=> `It's ${currPlayer}'s turn`;

statusDisplay.innerHTML=currPlayerTurn();

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click',handleRestartGame);

function handleCellClick(clickedCellEvent){
    const clickedCell=clickedCellEvent.target;
    const clickedCellIndex=parseInt(
        clickedCell.getAttribute('cell-index')
    );
    if(gameState[clickedCellIndex]!==""|| !gameActive){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currPlayer;
    clickedCell.innerHTML=currPlayer;
}

const winningConditions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const winCondition=winningConditions[i];
        let a=gameState[winCondition[0]];
        let b=gameState[winCondition[1]];
        let c=gameState[winCondition[2]];
        if(a==''|| b==''|| c==''){
            continue;
        }
        if(a==b && b==c){
            roundWon=true;
            break
        }
    }
    if(roundWon){
        statusDisplay.innerHTML=winMsg();
        gameActive=false;
        return;
    }
    let roundDraw=!gameState.includes("");
    if (roundDraw){
        statusDisplay.innerHTML=drawMsg();
        gameActive=false;
        return;
    }
    handlePlayerChange();
}
function handlePlayerChange() {
    currPlayer = currPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currPlayerTurn();
}
function handleRestartGame(){
    gameActive=true;
    currPlayer="X";
    gameState=["","","","","","","","",""];
    statusDisplay.innerHTML=currPlayerTurn();
    document.querySelectorAll('.cell')
         .forEach(cell=>cell.innerHTML="");
}