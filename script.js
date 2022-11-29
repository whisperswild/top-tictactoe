//notes:
//Build player array then convert to string at each step to check for a winner


// const player1 = "000000000";
// const player2 = "100100100";

function player(name, isAi, score, scoreArray, token, turn){
    let player = Object.create(playerTurn);
    name,
    isAi,
    scoreArray,
    score,
    token,
    turn
    return playerTurn;
}

const playerTurn = {
    playerScore(){return console.log(this.score)},
    playerName(){return console.log(this.name)},
    convertScore(){
       return this.score = this.scoreArray.join("");
    },
    checkForWin(){
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
                return console.log(`Win: ${this.scoreArray.join("")} and WIN_ARRAY: ${i}`);
            }else if (this.scoreArray.join("") === "111111111"){
                return console.log("Tie...");
            } 
        }
    },
}


const player1 = player();
player1.name = "p1";
player1.token = "X";
player1.scoreArray = [1,0,0,1,0,0,1,0,0];
player1.isAi = false;
player1.checkForWin();

const player2 = player();
player2.name = "p2";
player2.token = "O";
player2.scoreArray = [1,1,1,1,1,1,1,1,1];
player2.isAi = true;
player2.checkForWin();