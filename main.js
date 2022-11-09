video = document.getElementById("player2-idle");
video.playbackRate = 1.3;
video = document.getElementById("player1-idle");
video.playbackRate = 1.5;
var player1Logo = document.querySelector('.player1')
var player2Logo = document.querySelector('.player2')
var player1Wins = document.querySelector('.player1-wins')
var player2Wins = document.querySelector('.player2-wins')
var fullBoard = document.querySelector('.game-board')
var winnerLogo = document.querySelector('.winner-logo')
var winMessage = document.querySelector('.win-message')
var mainMessage = document.querySelector('.main-page-message')


var newGame = new Game()


fullBoard.addEventListener('click', claimSpot)
window.addEventListener('load', startMessage)

function startMessage(event) {
    event.preventDefault()
    winMessage.classList.remove('hidden')
    mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png">'s turn`


}

function claimSpot(event) {
    event.preventDefault()
        if (event.target.innerText === '' && newGame.whosTurn) {
        newGame.gameBoard[parseInt(event.target.dataset.section)] = parseInt(event.target.dataset.section)
        newGame.player1.boardPosition.push(parseInt(event.target.dataset.section))
        // console.log(newGame.gameBoard)
        // console.log(newGame.player1.boardPosition)
        newGame.changeTurns()
        newGame.checkForWin(newGame.player1)
        newGame.drawMap()
        console.log(newGame.whoWins)

    } else {
        newGame.gameBoard[parseInt(event.target.dataset.section)] = parseInt(event.target.dataset.section)
        newGame.player2.boardPosition.push(parseInt(event.target.dataset.section))
        // console.log(newGame.gameBoard)
        // console.log(newGame.player2.boardPosition)
        newGame.changeTurns()
        newGame.checkForWin(newGame.player2)
        console.log(newGame.whoWins)

    }
}
