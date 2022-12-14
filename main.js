video = document.getElementById("player2-idle");
video.playbackRate = 1.3;
video = document.getElementById("player1-idle");
video.playbackRate = 1.5;

var background = document.querySelector('.background')
var clearButton = document.getElementById('clearScore')
var errorMessage = document.getElementById('errorMessage')
var fullBoard = document.querySelector('.game-board')
var gameWinMessage = document.querySelector('.game-win-message')
var leftPlayer = document.querySelector('.left-player1')
var loadingButton = document.querySelector('.loading-button')
var loadingPageArea = document.querySelector('.loading')
var mainMessage = document.querySelector('.main-page-message')
var mainPage = document.querySelector('.main-area')
var player1Wins = document.querySelector('.player1-wins')
var player2Wins = document.querySelector('.player2-wins')
var rightPlayer = document.querySelector('.right-player2')
var spots = document.querySelectorAll('td')
var tdTags = document.getElementsByTagName('td')
var winMessage = document.querySelector('.win-message')


var newGame = new Game()
var errorAudio = new Audio('assets/music/toasty-sound.mp3')
var newAudio = new Audio('assets/music/Mortal Kombat.mp3')
var subZeroWins = new Audio('assets/music/subzero-wins.mp3')
var scorpionWins = new Audio('assets/music/scorpionwins.mp3')
var uhoh = new Audio('assets/music/uhoh.mp3')


clearButton.addEventListener('click', clearGameBoard)
fullBoard.addEventListener('click', newGamePlay)
loadingButton.addEventListener('click', loadingPage)
window.addEventListener('load', matchRestart)
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
    player1Wins.innerText = newGame.player1.wins
    player2Wins.innerText = newGame.player2.wins
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
    if (event.target.textContent !== '' && event.target.getElementById === undefined ) {
        show(errorMessage)
        errorMessage.innerHTML = 
        `<video id="error-video" class="errorVideo" poster="assets/videos/toasty-error.gif">
        <source src="assets/videos/toasty-error.mp4" type="video/gif">
        </video>`
        errorAudio.volume = 0.2
        errorAudio.play()
        setTimeout(() => {
            hide(errorMessage)
            errorMessage.innerHTML = ''
        }, "1100")
    }
}


function updateGame() {
    newGame.drawMap()
    updateWins()
    if (newGame.gameState === 'Draw') {
        updateWinMessage()
        uhoh.play()
        uhoh.volume = 0.3
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
    if (newGame.whoWins === 'Sub-Zero Wins Flawless Victory') {
        subZeroWins.volume = 0.2
        subZeroWins.play()
    }
    if (newGame.whoWins === 'Scorpion Wins Flawless Victory') {
        scorpionWins.volume = 0.2
        scorpionWins.play()
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
    if (newGame.whoWins !== null && newGame.gameState === "Winner" ) {
        hide(mainMessage)
        show(gameWinMessage)
        gameWinMessage.innerText = `${newGame.whoWins}`
    }
    if (newGame.whoWins !== null && newGame.gameState === "Draw" ) {
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


function clearGameBoard() {
    if (newGame.player1.wins === 0 && newGame.player2.wins === 0) {
        uhoh.play()
        uhoh.volume = 0.3
    } else {
    newGame.resetGame()
    newGame.player1.wins = 0
    newGame.player2.wins = 0
    updateWins()
    spots.forEach(spots => {
        spots.classList.remove('disabled')
        updateWords()
    displayGamePieces()
    })
}
}
