//Next step, build a "game complete" function to clear the board off
// Diagonals don't always win?


const gameSize = 9; //The total number of squares in the grid. 9 for normal tic-tac-toe
const numPlayers = 2;
let turnNum = 0;


const playerObj = [];

buildBoard(gameSize);
addPlayers(numPlayers);

function addPlayers(numPlayers){
    for (let i = 0; i < numPlayers; i++){


        playerObj[i] = new Player();
        playerObj[i].name = `Player-${i}`;

        playerObj[i].scoreArray = [0,0,0,0,0,0,0,0,0]; //Need to increase the size of this array based on game size.
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
    for (let i = 0; i < totalSquares; i++){
        gameSquares[i] = document.getElementById(`square-${i}`);
        gameSquares[i].addEventListener('click', e => {
            gameTriggers(e.target);
        })
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
    player.scoreArray[clickedSquareNum[1]] = 1;
    
    const footer = document.getElementById('footer');
    const winnerDiv = document.createElement('div');

    if (player.checkForWin()){
        // player.getWinner();

        winnerDiv.textContent = `AND THE WINNER IS: ${player.getWinner()}!`;
        footer.appendChild(winnerDiv);
    }else if (player.checkForWin()){ 
        winnerDiv.textContent = `TIE GAME, SORRY!`;
        footer.appendChild(winnerDiv);
    }
    
    const div = document.createElement('div');
    const squareDiv = document.getElementById(clickedSquare.id);
    squareDiv.classList.toggle("clicked");

    div.setAttribute('id', `${player.name}-${turnNum}-${clickedSquare.id}`);
    div.classList.add('player-token');
    div.textContent = player.token;
    squareDiv.appendChild(div);

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

    this.playerScore = () => {return console.log(this.score)};
    this.playerName = () => {return console.log(this.name)};
    this.convertScore = () => {
       return this.score = this.scoreArray.join("");
    },
    this.checkForWin = () => {
        this.convertScore();
        const WIN_ARRAY = [
            // Rows
            [0, 1, 2], //111000000 [0][1][2]
            [3, 4, 5], //000111000 [3][4][5]
            [6, 7, 8], //000000111 [6][7][8]

            // Cols:
            [0, 3, 6], //100100100 [0][3][6]
            [1, 4, 7], //010010010 [1][4][7]
            [2, 5, 8], //001001001 [2][5][8]

            // Diag:
            [0, 4, 8], //100010001 [0][4][8]
            [2, 4, 6]  //001010100 [2][4][6]

        ]
    
        //winner: return this.winner = true;
        //tie: return this.winner = null;
        //no winner: this.winner = false;

        for (let i of WIN_ARRAY){
            for (let j of i){
                if (this.scoreArray[j] === 1){
                    this.winner = true;
                }else{
                    this.winner = false;
                }
            }
        }

        if (this.winner == true){
            console.log("WIN");
            return this.winner
        } else {
            if (turn == 8){
                console.log("TIE");
                return this.winner = null;
            }
        }
    }
    this.getWinner = () => {
        return this.token;
    }
}