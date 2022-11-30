//notes:
//Build player array then convert to string at each step to check for a winner

function Player(name, isAi, scoreArray, score, token, turn, winner){
    this.name = name;
    this.isAi = isAi;
    this.scoreArray = scoreArray;
    this.score = score;
    this.token = token;
    this.turn = turn;
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