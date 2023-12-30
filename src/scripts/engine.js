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
    contestants: {
        player: document.querySelector('#player-hand'),
        ai: document.querySelector('#ai-hand')
    },
    actions: {
        btnNextDuel: document.querySelector("#btn-next-duel")
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
    const cardHands = document.querySelectorAll('.card-hand');
    cardHands.forEach(hand => {
        const cards = hand.querySelectorAll('img');
        cards.forEach(card => card.remove());
    });
}

async function checkDuelResult(playerCardId, aiCardId) {
    const playerCard = cardData[playerCardId];
    const playerWinsAgainst = playerCard.type.winAgainst;
    const playerLosesAgainst = playerCard.type.loseAgainst;
    const aiCardType = cardData[aiCardId].type.name;

    if (playerWinsAgainst.includes(aiCardType)) {
        state.score.playerScore++;
        return 'Win';
    }

    if (playerLosesAgainst.includes(aiCardType)) {
        state.score.aiScore++;
        return 'Lose';
    }

    return 'tie';
}

async function playSound(duelResult) {
    const audio = new Audio(`./src/assets/audios/${duelResult.toLowerCase()}.wav`);
    audio.volume = 0.3;
    audio.play();
}

async function updateScore() {
    state.score.scoreDisplay.innerHTML = `Win: ${state.score.playerScore} Lose: ${state.score.aiScore}`;
}

async function drawButton(duelResult) {
    state.actions.btnNextDuel.innerHTML = duelResult;
    state.actions.btnNextDuel.style.display = 'block';
}

async function playCards(playerCardId) {
    await removeHandCards();
    
    let aiCardId = await getRandomCardId();
    
    state.cardTable.playerCard.style.display = 'block';
    state.cardTable.playerCard.src = cardData[playerCardId].img;
    state.cardTable.aiCard.style.display = 'block';
    state.cardTable.aiCard.src = cardData[aiCardId].img;
    
    let duelResult = await checkDuelResult(playerCardId, aiCardId);
    
    if (duelResult === 'Win' || duelResult === 'Lose') {
        await playSound(duelResult);
    }
    await updateScore();
    await drawButton(duelResult.toUpperCase());
}

async function createCard(cardId, contestant) {
    const card = document.createElement('img');
    card.setAttribute('data-id', cardId);
    card.setAttribute('src', `${imgDir}card-back.png`);
    card.setAttribute('height', '100px');

    if (contestant === state.contestants.player) {
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

async function drawCards(cardAmount, contestant) {
    for (let i = 0; i < cardAmount; i++) {
        const randomCardId = await getRandomCardId();
        const card = await createCard(randomCardId, contestant);

        contestant.appendChild(card);
    }
}

async function resetTable() {
    state.cardHover.cardAvatar.src = "";
    state.cardHover.cardName.innerHTML = 'hover over your cards';
    state.cardHover.cardType.innerHTML = 'Attribute: ';

    state.cardTable.playerCard.style.display = 'none';
    state.cardTable.aiCard.style.display = 'none';

    state.actions.btnNextDuel.style.display = 'none';

    drawCards(5, state.contestants.player);
    drawCards(5, state.contestants.ai);
}

function init() {
    drawCards(5, state.contestants.player);
    drawCards(5, state.contestants.ai);
    state.actions.btnNextDuel.addEventListener('click', () => resetTable());
}

init();