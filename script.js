const gameSquares = [];
const gameSize = 9; //The total number of squares in the grid. 9 for normal tic-tac-toe
const numPlayers = 2;

function addPlayers(numPlayers){
    for (let i = 0; i < numPlayers; i++){

        const player = [];
        player[i] = new Player();
        player[i].name = `Player-${i}`;
        player[i].token = "X"; //this could be a random letter of the alphabet or other token
        player[i].scoreArray = [0,0,0,0,0,0,0,0,0]; //Need to increase the size of this array based on game size.
                                                    //This would also affect the win patterns
        player[i].isAi = false;
        player[i].turn = false;
    }
}
function buildBoard(totalSquares){

    //since we're dynamically creating the grid, the style needs
    //to reflect that the grid can be different sizes

    for (let i = 0; i < totalSquares; i++){
        gameSquares[i] = document.getElementById(`square-${i}`);
        gameSquares[i].addEventListener('click', e =>{
            gameTriggers(e.target.id);
        })
    }
}
buildBoard(gameSize);
addPlayers(numPlayers);

function gameTriggers(clickedSquare){
            //the gamesquare event listener. Add an X or O here if clicked. 
            //if the div already has an X or O, do nothing. Check against textcontent
            //Set this up so the click triggers a function then do the work in the function

            //check whose turn it is, add that player's token then set their turn to false and the next player's turn to true

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



const player1 = new Player();
player1.name = "p1";
player1.token = "X";
player1.scoreArray = [1,0,0,1,0,0,1,0,1];
player1.isAi = false;
player1.turn = true;
player1.checkForWin();

const player2 = new Player();
player2.name = "p2";
player2.token = "O";
player2.scoreArray = [1,1,1,0,0,0,0,0,1];
player2.isAi = true;
player2.turn = false;
player2.checkForWin();

const button = document.querySelector('#btnSubmit');
button.addEventListener('click', e => {
    e.preventDefault();

    const exportDiv = document.createElement('div');
    const resultsDiv = document.querySelector('#resultsDiv');

    if (player1.winner){
        exportDiv.textContent = `Player 1 winner? ${player1.turn}`;
    }else if (player2.winner){
        exportDiv.textContent = `Player 2 winner? ${player2.winner}`;
    }else{
        exportDiv.textContent = `No winner yet...`;
    }

    resultsDiv.appendChild(exportDiv);

});