const gameSquares = [];
const playerObj = [];
const gameSize = 9; //The total number of squares in the grid. 9 for normal tic-tac-toe
const numPlayers = 2;
let turnNum = 0;

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

    for (let i = 0; i < totalSquares; i++){
        gameSquares[i] = document.getElementById(`square-${i}`);
        gameSquares[i].addEventListener('click', e => {
            gameTriggers(e.target);
        })
    }
}

buildBoard(gameSize);
addPlayers(numPlayers);

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

    
    const div = document.createElement('div');
    const squareDiv = document.getElementById(clickedSquare.id);
    squareDiv.classList.toggle("clicked");

    div.setAttribute('id', `${player.name}-${turnNum}-${clickedSquare.id}`);
    div.classList.add('player-token');
    div.textContent = player.token;
    squareDiv.appendChild(div);

    //Need to add to the player's score array here to mark which square they chose

    turnNum += 1;
}


function Player(name, isAi, scoreArray, score, token, turn, winner){
    //remove 'winner' from the methods list later?
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
            "111000000", 
            "000111000", 
            "000000111",
            // Cols:
            "100100100",
            "010010010",
            "001001001",
            // Diag:
            "100010001",
            "001010100"
        ]
    
        for (let i of WIN_ARRAY){
            if (i === this.score){
                return this.winner = true
            }else if (this.score === "111111111"){
                //Tie game..set to null, no winner
                return this.winner = null;
            }else{
                //No winner yet
                this.winner = false;
            }
        }
    }
}