class Player {
    constructor(id, token) {
        this.id = id
        this.boardPosition = []
        this.token = token 
        this.wins = 0
    }

wins() {
    this.wins++
}
}