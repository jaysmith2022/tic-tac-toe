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
var tdTags = document.getElementsByTagName('td')
var spots = document.querySelectorAll('td')
var gameWinMessage = document.querySelector('.game-win-message')


var newGame = new Game()


fullBoard.addEventListener('click', newGamePlay)
window.addEventListener('load', matchRestart)

function matchRestart(event) {
    event.preventDefault()
    if (newGame.whosTurn) {
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png"> ' s turn`
    } else if (!newGame.whosTurn)
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/fire-token.png"> ' s turn`
    }


function newGamePlay(event) {
    event.preventDefault()
        if (event.target.textContent === '' && event.target.dataset.section) {
        if (newGame.whosTurn && newGame.whoWins === null) {
            newGame.gameBoard[parseInt(event.target.dataset.section)] = 1
            newGame.player1.boardPosition.push(parseInt(event.target.dataset.section))
            newGame.changeTurns()
            updateWords()
            newGame.checkForWin(newGame.player1)
            newGame.drawMap()
            updateWins()

        if (newGame.gameState === 'Draw') {
            updateWinMessage()
            // setTimeout(() => {
            // newGame.resetGame()
            // displayGamePieces()
            //     updateWords()
            // }, 3000)
            }   
        if (newGame.gameState === 'Winner') {
            // newGame.resetGame()
            updateWinMessage()
            // setTimeout(() => {
                // newGame.resetGame()
                // displayGamePieces()

                // updateWins()
            // }, 3000)
        }

        displayGamePieces()
            return
        }
        if (!newGame.whosTurn && newGame.whoWins === null) {
            newGame.gameBoard[parseInt(event.target.dataset.section)] = 2
            newGame.player2.boardPosition.push(parseInt(event.target.dataset.section))
            newGame.changeTurns()
            updateWords()
            newGame.checkForWin(newGame.player2)
            newGame.drawMap()
            updateWins()
            // displayGamePieces()
            if (newGame.gameState === 'Draw') {
                updateWinMessage()
                // setTimeout(() => {
                // newGame.resetGame()
                // displayGamePieces()
                //     updateWords()
                // }, 3000)
            }
            if (newGame.gameState === 'Winner') {
                updateWinMessage()
                // setTimeout(() => {
                // newGame.resetGame()
                // displayGamePieces()
                //     updateWords()
                // }, 3000)
            }
    
            displayGamePieces()
                return
            }

    function updateWins() {
        player1Wins.innerText = newGame.player1.wins
        player2Wins.innerText = newGame.player2.wins
            if (newGame.whoWins !== null ) {
                player1Wins.innerText = newGame.player1.wins
                player2Wins.innerText = newGame.player2.wins
                displayGamePieces()
                spots.forEach(spots => {
                    spots.classList.remove('disabled')
                })
                }
            } 
        }
    

function displayGamePieces() {
        for (var i = 0; i < newGame.gameBoard.length; i++) {
            if (newGame.gameBoard[i] === null) {
            spots[i].innerText = ''
            } else if (newGame.gameBoard[i] === 1) {
            spots[i].innerHTML = `<img class="player-token" src="${newGame.player1.token}">`
            spots[i].classList.add('disabled')
            } else if (newGame.gameBoard[i] === 2) {
            spots[i].innerHTML = `<img class="player-token" src="${newGame.player2.token}">`
            spots[i].classList.add('disabled')
            }
        }
        } 

        

function updateWords() {
    if (newGame.whosTurn && newGame.whoWins === null) {
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png">' s turn`
    } else {
        mainMessage.innerHTML = `It's<img class="player2-turn" src="assets/photos/fire-token.png">' s turn`
    }
}

function updateWinMessage() {
    if (newGame.whosTurn && newGame.gameState === '') {
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png">' s turn`
    } else if (!newGame.whosTurn && newGame.gameState === '') {
        mainMessage.innerHTML = `It's<img class="player2-turn" src="assets/photos/fire-token.png">' s turn`
    }
    if (newGame.whoWins !== null && newGame.gameState === "Winner") {
        mainMessage.classList.add('hidden')
        gameWinMessage.classList.remove('hidden')
        gameWinMessage.innerText = `${newGame.whoWins}`
    }
    if (newGame.whoWins !== null && newGame.gameState === "Draw") {
        mainMessage.classList.add('hidden')
        gameWinMessage.classList.remove('hidden')
        gameWinMessage.innerText = `${newGame.whoWins}`
    } 
        setTimeout(() => {
            clearWinMessage()
            newGame.resetGame()
            displayGamePieces()
            spots.forEach(spots => {
                spots.classList.remove('disabled')
            })
            }, 3000)
}

function clearWinMessage() {
    mainMessage.classList.remove('hidden')
    gameWinMessage.classList.add('hidden')
}
}