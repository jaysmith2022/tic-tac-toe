class Game {
    constructor() {
        this.player1 = new Player(1, 'assets/photos/Frost-Shard.png')
        this.player2 = new Player(2, 'assets/photos/fire-token.png')
        this.gameBoard = [null, null, null, null, null, null, null, null, null]
        this.numberOfTurns = 1
        this.whosTurn = true
        this.whoWins = null
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
                this.whoWins = `Sub-Zero Wins. Flawless Victory`
            } else {
                this.whoWins = `Scorpion Wins. Flawless Victory`
            }
        }
    }
}

    resetGame() {
        this.numberOfTurns = 0
        this.player1.boardPosition = []
        this.player2.boardPosition = []
        this.whoWins = null
        this.gameBoard = [null, null, null, null, null, null, null, null, null]
        this.whosTurn = true
        
    }

    drawMap() {
        if (this.numberOfTurns === 10 && this.whoWins === null) {
            this.whoWins = "Nobody won, be ashamed"
        }
    }
}