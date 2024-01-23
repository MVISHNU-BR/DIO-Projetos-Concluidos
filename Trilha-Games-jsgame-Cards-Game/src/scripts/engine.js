const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('.score_poits')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
    },
    playerSides: {
        player1: 'player-cards',
        player1Box: document.querySelectorAll('#player-cards'),
        computerBox: document.querySelectorAll('#computer-cards'),
        computer: 'computer-cards',
    },
    actions: {
        button: document.getElementById('next-card'),
    },
};

// Path: src/scripts/game.js
const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards',
}

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Papel",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],

    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [0],

    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}


async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener('click', () => {
            setCardField(cardImage.getAttribute('data-id'));
        });


        cardImage.addEventListener('mouseover', () => {
            drawSelectCard(idCard);
        })
    }


    return cardImage;
}

async function setCardField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResult = await checkDuelResult(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResult);
}

async function checkDuelResult(playerCardId, computerCardId) {
    let duelResuls = "Empate";
    let playerCard = cardData[playerCardId];
    
    if (playerCard.winOf.includes(computerCardId)) {
        duelResuls = "Ganhou mano";
        await playAudio('win');
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(computerCardId)) {
        duelResuls = "Perdeu mano";
        await playAudio('lose');
        state.score.computerScore++;
    }

    return duelResuls;

} 

async function drawButton(text) {
    state.actions.button.innerHTML = text;
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerHTML = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}


async function removeAllCardsImages() {
    let {computerBox, player1Box} = state.playerSides;
    let imgElements = computerBox.querySelectorAll('img');
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll('img');
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerHTML = cardData[index].name;
    state.cardSprites.type.innerHTML = "Atributte : " + cardData[index].type;

}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randmidCard = await getRandomCardId();
        const cardImage = await createCardImage(randmidCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new audio(`./src/assets/sounds/${status}.wav`);
    audio.play();
}

function init() {
    //state.fieldCards.player.style.display = "none";
    //state.fieldCards.computer.style.display = "none";

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById('bgm');
    bgm.play();
}

init();

