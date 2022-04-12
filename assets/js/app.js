const allCards = document.querySelectorAll(".playground .card");
let minutesLabel = document.querySelector("#minutes");
let secondsLabel = document.querySelector("#seconds");
let flipped = false;
let lock = false;
let firstCard;
let secondCard;
let matchFound = 0;
let stepCount = 0;
let totalSeconds = 0;

setInterval(setTime, 1000);
shuffleCards()
allCards.forEach(card => card.addEventListener('click', flip));

const setMessage = (message) => {
    document.querySelector(".message").textContent = message;
};

function flip() {
    if (lock) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    stepCount += 1

    if (!flipped) {
        flipped = true;
        firstCard = this;
    } else {
        flipped = false;
        secondCard = this;

        checkMatch();
        checkIfReady();
    }
}

function checkMatch() {
    let wasMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (wasMatch) {
        blockCards();
        matchFound += 1;
    } else {
        unflip()
    };
}

function checkIfReady() {
    if (matchFound === 5) {
        newGame()
    }
}

function blockCards() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    resetPlay()
}

function unflip() {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lock = false
    }, 1000)
}

function resetPlay() {
    flipped = false;
    lock = false;
    firstCard: null;
    secondCard: null;
}

function shuffleCards() {
    for (let i = allCards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        allCards[randomIndex].style.order = i;
        allCards[i].style.order = randomIndex;
    }
}

function newGame() {
    stepCount = 0;
    setMessage(`You did it, kid, you deserve a gabagool!`)
    setTimeout(() => {
        allCards.forEach(card => card.classList.remove('flip'));
        allCards.forEach(card => card.addEventListener('click', flip));
        shuffleCards();
        resetPlay();
        setMessage(`Just when I thought I was out, they pull me back in!`)
        matchFound = 0;
        totalSeconds = 0;
    }, 5000)
}

function setTime() {
    if (stepCount > 0) {
        totalSeconds += 1;
        secondsLabel.textContent = pad(totalSeconds % 60);
        minutesLabel.textContent = pad(parseInt(totalSeconds / 60));
        setMessage(`It's on, kid!`)
    } else {
        secondsLabel.textContent = pad(totalSeconds % 60);
        minutesLabel.textContent = pad(parseInt(totalSeconds / 60))
    }
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}