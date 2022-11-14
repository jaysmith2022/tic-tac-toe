class Game {
    constructor() {
        this.player1 = new Player(1, 'assets/photos/Frost-Shard.png')
        this.player2 = new Player(2, 'assets/photos/fire-token.png')
        this.gameBoard = [null, null, null, null, null, null, null, null, null]
        this.numberOfTurns = 0
        this.whosTurn = true
        this.firstTurn = 'player1'
        this.whoWins = null
        this.gameState = ''
    }


    changeTurns() {
        this.numberOfTurns++
        this.whosTurn = !this.whosTurn
    }


    checkForWin(player) {
        var winMap = [
            [0, 1, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [3, 4, 5], 
            [6, 7, 8],
        ]
        for(var i = 0; i < winMap.length;i++) {
            if (player.boardPosition.includes(winMap[i][0]) && player.boardPosition.includes(winMap[i][1]) && player.boardPosition.includes(winMap[i][2])) {
                player.increaseWins()
            if (!this.whosTurn) {
                this.whoWins = `Sub-Zero Wins Flawless Victory`
                this.gameState = 'Winner'
            } else {
                this.whoWins = `Scorpion Wins Flawless Victory`
                this.gameState = 'Winner'
            }
        }
    }
}


    resetGame() {
        this.gameState = ''
        this.numberOfTurns = 0
        this.player1.boardPosition = []
        this.player2.boardPosition = []
        this.whoWins = null
        this.gameBoard = [null, null, null, null, null, null, null, null, null]
        if (this.firstTurn == 'player1'){
            this.whosTurn = false
            this.firstTurn = 'player2'
            } else {
            this.whosTurn = true
            this.firstTurn = 'player1'
        }
    }

    
    resetAfterFive() {
        if (newGame.player1.wins === 5 || newGame.player2.wins === 5) {
            this.whoWins = null
            this.player1.wins = 0
            this.player2.wins = 0
            this.gameState = ''
            this.numberOfTurns = 0
            this.player1.boardPosition = []
            this.player2.boardPosition = []
            this.gameBoard = [null, null, null, null, null, null, null, null, null]
    }
}


    drawMap() {
        if (this.numberOfTurns === 9 && this.whoWins === null) {
            this.whoWins = "Nobody won, be ashamed"
            this.gameState = 'Draw'
        }
    }
}
