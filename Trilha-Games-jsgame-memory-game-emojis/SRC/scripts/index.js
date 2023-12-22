const emojis = [
    "🐰",
    "🐰",
    "🦊",
    "🦊",
    "🐻",
    "🐻",
    "🐼",
    "🐼",
    "🐨",
    "🐨",
    "🐯",
    "🐯",
    "🦁",
    "🦁",
    "🐮",
    "🐮"
];
let openCard = [];

let shaffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1 )); // shuffle the emojis   

for(let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shaffleEmojis[i];
    box.onclick = handdleClick;
    document.querySelector(".game").appendChild(box);
}

function handdleClick() {
    if (openCard.length < 2) {
        this.classList.add("boxOpen");
        openCard.push(this);
    }
    if (openCard.length === 2) {
       setTimeout(checkMatch, 500);

    }
    console.log(openCard);
}

function checkMatch() {
    if (openCard[0].innerHTML === openCard[1].innerHTML) {
        openCard[0].classList.add("boxMatch");
        openCard[1].classList.add("boxMatch");
    } else {
        openCard[0].classList.remove("boxOpen");
        openCard[1].classList.remove("boxOpen");
    }
    
    openCard = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("You win");
    }

}