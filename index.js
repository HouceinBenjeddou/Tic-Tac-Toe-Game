//tic tac toe game

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions =  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; //place holder, 1 for each cell
let currentPlayer = "X";
let running = false;


initializeGame();

function initializeGame(){
    cells.forEach(cells => cells.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`; //update status text
     running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

        if(options[cellIndex] != "" || !running){
            return;
        }
        updatecell(this, cellIndex);
        checkWinner();
}

function updatecell(cells, index){
   options[index] = currentPlayer;
   cells.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
        let i = 0;
        let l = winConditions.length;
        for(i ; i < l ; i+=1 ){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

                if(cellA == "" || cellB == "" || cellC == "" ){
                    continue;
                }

                if(cellA == cellB && cellB == cellC){
                    roundWon = true;
                    break;
                }
        }
        if(roundWon){
            statusText.textContent = `${currentPlayer} wins!`;
                running = false;
        }
        else if(!options.includes("")){
            statusText.textContent = `${currentPlayer} Draw!`;

        }
        else{
            changePlayer();
        }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s trun`;
    cells.forEach(cells => cells.textContent = "");
        running = true;
}
