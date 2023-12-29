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

const imgDir = 'src/assets/icons/';

const cardData = [
    {
        id: 0,
        name: 'Dark Magician',
        type: cardTypes.paper,
        img: `${imgDir}magician.png`
    },
    {
        id: 1,
        name: 'Blue Eyed White Dragon',
        type: cardTypes.rock,
        img: `${imgDir}dragon.png`
    },
    {
        id: 2,
        name: 'Exodia',
        type: cardTypes.scissors,
        img: `${imgDir}exodia.png`
    }
]

const contestantHands = {
    player: 'player-hand',
    ai: 'ai-hand'
}

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

function displayCard(cardId) {
    state.cardHover.cardAvatar.src = cardData[cardId].img;
    state.cardHover.cardName.innerHTML = cardData[cardId].name;
    state.cardHover.cardType.innerHTML = `Attribute: ${cardData[cardId].type.name}`;
}

async function removeHandCards() {
    
}

async function playCards(playerCardId) {
    await removeHandCards();

    let aiCardId = await getRandomCardId();

    state.cardTable.playerCard.style.display = 'block';
    state.cardTable.playerCard.src = cardData[playerCardId].img;
    state.cardTable.aiCard.style.display = 'block';
    state.cardTable.aiCard.src = cardData[aiCardId].img;

    let duelResult = await checkDuelResult(playerCardId, aiCardId);

    await updateScore(duelResult);
    await drawButton(duelResult);
}

async function createCard(cardId, contestantHand) {
    const card = document.createElement('img');
    card.setAttribute('data-id', cardId);
    card.setAttribute('src', `${imgDir}card-back.png`);
    card.setAttribute('height', '100px');
    
    if (contestantHand === contestantHands.player) {
        card.classList.add('card');

        card.addEventListener('mouseover', () => {
            displayCard(cardId);
        })

        card.addEventListener('click', () => {
            playCards(card.getAttribute('data-id'));
        });
    }

    return card;
}

async function drawCards(cardAmount, contestantHand) {
    for (let i = 0; i < cardAmount; i++) {
        const randomCardId = await getRandomCardId();
        const card = await createCard(randomCardId, contestantHand);

        document.querySelector(`#${contestantHand}`).appendChild(card);
    }
}

function init() {
    drawCards(5, contestantHands.player);
    drawCards(5, contestantHands.ai);
}

init();