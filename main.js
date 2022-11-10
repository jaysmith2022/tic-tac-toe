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


var newGame = new Game()


fullBoard.addEventListener('click', claimSpot)
window.addEventListener('load', startMessage)

function startMessage(event) {
    event.preventDefault()
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png"> ' s turn`

}

function claimSpot(event) {
    event.preventDefault()
        if (event.target.textContent === '' && event.target.dataset.section) {
        if (newGame.whosTurn && newGame.whoWins === null) {
            newGame.gameBoard[parseInt(event.target.dataset.section)] = 1
            newGame.player1.boardPosition.push(parseInt(event.target.dataset.section))
            newGame.changeTurns()
            newGame.checkForWin(newGame.player1)
            newGame.drawMap()
            displayGamePieces()
            updateWins()
            return
        }
        if (!newGame.whosTurn && newGame.whoWins === null) {
            newGame.gameBoard[parseInt(event.target.dataset.section)] = 2
            newGame.player2.boardPosition.push(parseInt(event.target.dataset.section))
            newGame.changeTurns()
            newGame.checkForWin(newGame.player2)
            newGame.drawMap()
            displayGamePieces()
            updateWins()
            return
        }      
    }

    function updateWins() {
        player1Wins.innerText = newGame.player1.wins
        player2Wins.innerText = newGame.player2.wins
            if (newGame.whoWins !== null) {
                player1Wins.innerText = newGame.player1.wins
                player2Wins.innerText = newGame.player2.wins
                newGame.resetGame()
                displayGamePieces()
                spots.forEach(spots => {
                    spots.classList.remove('disabled')
                })
                }
            }  
            if (newGame.whoWins === 'Sub-Zero Wins. Flawless Victory') {
                // mainMessage.innerHTML = 
            
        }
    }

    


function displayGamePieces() {
    updateWords()
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
    if (newGame.whosTurn) {
        mainMessage.innerHTML = `It's<img class="player1-turn" src="assets/photos/Frost-Shard.png">' s turn`
    } else {
        mainMessage.innerHTML = `It's<img class="player2-turn" src="assets/photos/fire-token.png">' s turn`
    }
}



