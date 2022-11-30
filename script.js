//notes:
//Build player array then convert to string at each step to check for a winner

function player(name, isAi, score, scoreArray, token, turn, winner){
    this.name;
    this.isAi;
    this.scoreArray;
    this.score; 
    this.token; 
    this.turn; 
    this.winner;

    this.playerScore = function(){return console.log(this.score)};
    this.playerName = function(){return console.log(this.name)},
    this.convertScore = function(){
       return this.score = this.scoreArray.join("");
    };
    this.checkForWin = function(){
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
            if (i === this.scoreArray.join("")){
                console.log(`Win: ${this.scoreArray.join("")} and WIN_ARRAY: ${i}`);
            }else if (this.scoreArray.join("") === "111111111"){
                console.log(`loser: ${this.name}`);
            } 
        }
    }
}

const playerTurn = {
    
}


const player1 = new player();
player1.name = "p1";
player1.token = "X";
player1.scoreArray = [1,0,0,1,0,0,1,0,0];
player1.isAi = false;
player1.turn = true;
player1.checkForWin();

const player2 = new player();
player2.name = "p2";
player2.token = "O";
player2.scoreArray = [1,1,1,1,1,1,1,1,1];
player2.isAi = true;
player2.turn = false;
const win = player2.checkForWin.bind(player2)
console.log(typeof(win));

const button = document.querySelector('#btnSubmit');

button.addEventListener('click', e => {
    e.preventDefault();

    const exportDiv = document.createElement('div');
    const resultsDiv = document.querySelector('#resultsDiv');
    
    exportDiv.textContent = win;

    resultsDiv.appendChild(exportDiv);

});