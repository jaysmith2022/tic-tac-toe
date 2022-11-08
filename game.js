class Game {
    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        this.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        this.numberOfTurns = 0
        this.whosTurn = true
        this.whoWins = null
    }


    changeTurns() {
        this.numberOfTurns++
        if (this.whosTurn)
            this.whosTurn = !this.whosTurn
    }


    checkForWin(player) {
        var winMap = [
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for(var i = 0;i < winMap.length;i++) {
            if (winMap[i].includes(player.boardPosition)) {
                player.wins++
            }
        }
    }

    resetGame() {
        this.numberOfTurns = 0
        this.player1.boardPosition = []
        this.player2.boardPosition = []
        this.whoWins = null
    }

    drawMap() {
        if (this.numberOfTurns === 7 && this.whoWins === null) {
            return this.whoWins = "Nobody won, be ashamed"
        }
    }
}