class Player {
    constructor(token) {
        this.id = Date.now()
        this.boardPosition = []
        this.token = token 
        this.wins = 0
    }

wins() {
    this.wins++
}
}