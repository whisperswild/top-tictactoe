const gameSize = 9; //The total number of squares in the grid. 9 for normal tic-tac-toe
const numPlayers = 2;
let turnNum = 0;

//Next step...add some AI


const playerObj = [];

buildBoard(gameSize);
addPlayers(numPlayers);

function addPlayers(numPlayers){
    for (let i = 0; i < numPlayers; i++){


        playerObj[i] = new Player();
        playerObj[i].name = `Player-${i}`;

        playerObj[i].scoreArray = []; //Need to increase the size of this array based on game size.
                                                       //This would also affect the win patterns
        playerObj[i].isAi = false;
        playerObj[i].turn = false;
        
        //This needs to be modified for more than 2 players
        if (i === 0){
            playerObj[i].token = "X";
            playerObj[i].turn = true;
        }else{
            playerObj[i].token = "O"; 
        }
        
    }
}

function buildBoard(totalSquares){

    //since we're dynamically creating the grid, the style needs
    //to reflect that the grid can be different sizes
    const gameSquares = [];
    for (let i = 1; i <= totalSquares; i++){
        gameSquares[i] = document.getElementById(`square-${i}`);
        gameSquares[i].addEventListener('click', e => {
            gameTriggers(e.target);
        })
    }
}

function gameOver(totalSquares){
    const gameSquares = []
    for (let i = 1; i<= totalSquares; i++){
        gameSquares[i] = document.getElementById(`square-${i}`);
        gameSquares[i].classList.add("clicked");
    }

}

function gameTriggers(clickedSquare){

    if(clickedSquare.classList.contains("clicked")){
        return;
    }

    //hard coded to 2 players...move to its own function and allow more players
    let player = [];
    if(playerObj[0].turn){
        player = playerObj[0];
        playerObj[0].turn = false;
        playerObj[1].turn = true;
    }else{
        player = playerObj[1]
        playerObj[0].turn = true;
        playerObj[1].turn = false;
    }

    //need to get which square was clicked...id="square-#"
    let clickedSquareNum = clickedSquare.id.split("-");
    player.scoreArray[clickedSquareNum[1]] = Number(clickedSquareNum[1]);
    
    const div = document.createElement('div');
    const squareDiv = document.getElementById(clickedSquare.id);
    squareDiv.classList.toggle("clicked");

    div.setAttribute('id', `${player.name}-${turnNum}-${clickedSquare.id}`);
    div.classList.add('player-token');
    div.textContent = player.token;
    squareDiv.appendChild(div);


    const footer = document.getElementById('footer');
    const winnerDiv = document.createElement('div');

    player.checkForWin();
    if (player.winner){
        winnerDiv.textContent = `AND THE WINNER IS: ${player.getWinner()}!`;
        footer.appendChild(winnerDiv);

        gameOver(gameSize);
    }else if (player.winner == null){ 
        winnerDiv.textContent = `TIE GAME, SORRY!`;
        footer.appendChild(winnerDiv);
    }
    turnNum += 1;
}


function Player(name, isAi, scoreArray, score, token, turn, getWinner){
    this.name = name;
    this.isAi = isAi;
    this.scoreArray = scoreArray;
    this.score = score;
    this.token = token;
    this.turn = turn; //bool
    this.winner = false;
    this.tokenCounter = 0;

    this.playerScore = () => {return console.log(this.score)};
    this.playerName = () => {return console.log(this.name)};

    this.checkForWin = () => {
        const WIN_ARRAY = [
            //Each one will add up to 15
            // Rows
            [4, 9, 2],
            [3, 5, 7], 
            [8, 1, 6], 

            // Cols:
            [4, 3, 8],
            [9, 5, 1], 
            [2, 7, 6], 

            // Diag:
            [4, 5, 6], 
            [2, 5, 8]  

        ]

        //Loop through the player's array and check if it matches all values in any one of the WIN_ARRAY elements:
        //[[0, 1, 2],[3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        WIN_ARRAY.forEach(grid => {
                let sum = 0;
                grid.forEach(square =>{
                    sum += this.scoreArray[square]
                });
                if (sum === 15){
                    this.winner = true;
                }
        });

        if (turn == 8){
            this.winner = null;
        }     
    }
    this.getWinner = () => {
        return this.token;
    }

}