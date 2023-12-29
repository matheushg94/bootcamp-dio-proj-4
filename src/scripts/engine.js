const state = {
    score: {
        playerScore: 0,
        aiScore: 0,
        scoreDisplay: document.querySelector("#score")
    },
    cardHover: {
        cardAvatar: document.querySelector("#card-image"),
        cardName: document.querySelector("#card-name"),
        cardType: document.querySelector("#card-type")
    },
    cardTable: {
        playerCard: document.querySelector("#player-card"),
        aiCard: document.querySelector("#ai-card")
    },
    actions: {
        btnNextDuel: document.querySelector("btn-next-duel")
    }
}

const cardTypes = {
    rock: {
        name: 'Rock',
        winAgainst: 'Scissors',
        loseAgainst: 'Paper'
    },
    paper: {
        name: 'Paper',
        winAgainst: 'Rock',
        loseAgainst: 'Scissors'
    },
    scissors: {
        name: 'Scissors',
        winAgainst: 'Paper',
        loseAgainst: 'Rock'
    }
}

const cardImgPath = 'src/assets/icons/';

const cardData = [
    {
        id: 0,
        name: 'Dark Magician',
        type: cardTypes.paper,
        img: `${cardImgPath}magician.png`
    },
    {
        id: 1,
        name: 'Blue Eyed White Dragon',
        type: cardTypes.rock,
        img: `${cardImgPath}dragon.png`
    },
    {
        id: 2,
        name: 'Exodia',
        type: cardTypes.scissors,
        img: `${cardImgPath}exodia.png`
    }
]

function init() {

}

init();