let scores, roundScore, activePlayer, dice, gamePlaying, lastDice = 7;

init();

document.querySelector('.dice').style.display = 'none';




document.querySelector('.btn-roll').addEventListener('click', () => {
    //random number
    if (gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;

        // display the result
        const diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        if (dice !== 1 && dice !== lastDice && lastDice !== 6) {
            roundScore += dice;
            lastDice = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;

            document.getElementById('current-0').textContent = 0;
            document.getElementById('current-1').textContent = 0;

            document.querySelector('.player-0').classList.toggle('player-active');
            document.querySelector('.player-1').classList.toggle('player-active');
            document.querySelector('.dice').style.display = 'none';
            lastDice = 0;
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // Add curent score to global score
        scores[activePlayer] += roundScore;


        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        const vall = document.querySelector('.final-score').value;
        let winninScore;
        if (vall) {
            winninScore = vall;
        } else {
            winninScore = 10;
        }

        // Check if player won

        if (scores[activePlayer] >= winninScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer).classList.add('winner');
            document.querySelector('.player-' + activePlayer).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0').classList.toggle('player-active');
    document.querySelector('.player-1').classList.toggle('player-active');
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1 ';
    document.getElementById('name-1').textContent = 'Player 2 ';
    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');
    document.querySelector('.player-1').classList.remove('active');
}