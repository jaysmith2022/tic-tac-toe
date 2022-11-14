class Player {
    constructor(id, token) {
        this.id = id
        this.boardPosition = []
        this.token = token 
        this.wins = 0
    }


    saveWins() {
        localStorage.setItem(`${this.token}`, JSON.stringify(this.wins))
    }


    getWins() {
        var storedWins = JSON.parse(localStorage.getItem(`${this.token}`)) || []
        this.wins = storedWins
    }

increaseWins() {
    this.wins++
    }
}