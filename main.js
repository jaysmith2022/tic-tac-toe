video = document.getElementById("player2-idle");
video.playbackRate = 1.3;
video = document.getElementById("player1-idle");
video.playbackRate = 1.5;

var player1Logo = document.querySelector('.player1')
var player2Logo = document.querySelector('.player2')
var player1Wins = document.querySelector('.player1-wins')
var player2Wins = document.querySelector('.player2-wins')
var leftPlayer = document.querySelector('.left-player1')
var rightPlayer = document.querySelector('.right-player2')
var mainPage = document.querySelector('.main-area')
var fullBoard = document.querySelector('.game-board')
var winnerLogo = document.querySelector('.winner-logo')
var winMessage = document.querySelector('.win-message')
var mainMessage = document.querySelector('.main-page-message')
var tdTags = document.getElementsByTagName('td')
var spots = document.querySelectorAll('td')
var gameWinMessage = document.querySelector('.game-win-message')
var loadingPageArea = document.querySelector('.loading')
var loadingButton = document.querySelector('.loading-button')
var background = document.querySelector('.background')


var newGame = new Game()
var newAudio = new Audio('assets/music/MK-theme.mp3')



fullBoard.addEventListener('click', newGamePlay)
window.addEventListener('load', matchRestart)
loadingButton.addEventListener('click', loadingPage)
window.addEventListener('click', playTheme)

function playTheme() {
    newAudio.volume = 0.2
    newAudio.play()
}

function loadingPage(event) {
    event.preventDefault()
    hide(loadingPageArea)
    show(leftPlayer)
    show(mainPage)
    show(rightPlayer)
    show(background)
}

function matchRestart(event) {
    event.preventDefault()
    newGamePlay(event)
    updateWords()
}


function newGamePlay(event) {
    event.preventDefault()
    if (newGame.whosTurn && newGame.whoWins === null && event.target.textContent === '' && event.target.dataset.section) {
        newGame.gameBoard[parseInt(event.target.dataset.section)] = 1
        newGame.player1.boardPosition.push(parseInt(event.target.dataset.section))
        newGame.changeTurns()
        updateWords()
        newGame.checkForWin(newGame.player1)
        updateGame()
        return
        }
    if (!newGame.whosTurn && newGame.whoWins === null && event.target.textContent === '' && event.target.dataset.section) {
        newGame.gameBoard[parseInt(event.target.dataset.section)] = 2
        newGame.player2.boardPosition.push(parseInt(event.target.dataset.section))
        newGame.changeTurns()
        updateWords()
        newGame.checkForWin(newGame.player2)
        updateGame()
        return
        }


function updateGame() {
    newGame.drawMap()
    updateWins()
    if (newGame.gameState === 'Draw') {
        updateWinMessage()
    }   
    if (newGame.gameState === 'Winner') {
        updateWinMessage()
    }
        displayGamePieces()
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
    if (newGame.whoWins !== null && newGame.gameState === "Winner" || newGame.gameState === "Draw" ) {
        hide(mainMessage)
        show(gameWinMessage)
        gameWinMessage.innerText = `${newGame.whoWins}`
    }
        setTimeout(() => {
            clearWinMessage()
            newGame.resetGame()
            newGame.resetAfterFive()
            player1Wins.innerText = newGame.player1.wins
            player2Wins.innerText = newGame.player2.wins
            displayGamePieces()
            spots.forEach(spots => {
                spots.classList.remove('disabled')
                updateWords() 
            })
            }, 2000)
}


function clearWinMessage() {
    hide(gameWinMessage)
    show(mainMessage)
    }

function hide(select) {
    select.classList.add('hidden')
}

function show(select) {
    select.classList.remove('hidden')
}

