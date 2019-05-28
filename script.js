let crossOrCircle = 0;
const poles = document.querySelectorAll('div.board>div');
const board = document.querySelector('div.board');
const score = document.querySelector('div.score');
const reload = document.querySelector('div.reload');
let gameStatus = 'ongoing';
let circlesscore = 0;
let crossesscore = 0;
let draws = 0;

poles.forEach(function (pole) {
    pole.addEventListener('click', function () {
        if (gameStatus == 'finished' && pole.hasAttribute('status') == false) {
            alert('Are you trying to cheat on me? ( ͡° ͜ʖ ͡°)')
        } else if (crossOrCircle == 0 && pole.hasAttribute('status') == false) {
            crossOrCircle++;
            const newElement = document.createElement('div');
            newElement.classList.add('circle');
            pole.appendChild(newElement);
            pole.setAttribute('status', 'circled');
        } else if (crossOrCircle == 1 && pole.hasAttribute('status') == false) {
            crossOrCircle = 0;
            const newElement = document.createElement('div');
            newElement.classList.add('cross1');
            pole.appendChild(newElement);
            const newElement2 = document.createElement('div');
            newElement2.classList.add('cross2');
            pole.appendChild(newElement2);
            pole.setAttribute('status', 'crossed');
        }
    })
})

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

board.addEventListener('click', function () {
    winningCombinations.forEach(function (combination) {
        if (poles[combination[0]].getAttribute('status') == poles[combination[1]].getAttribute('status') && poles[combination[1]].getAttribute('status') == poles[combination[2]].getAttribute('status') && poles[combination[0]].hasAttribute('status') == true) {
            poles[combination[0]].style.backgroundColor = 'red';
            poles[combination[1]].style.backgroundColor = 'red';
            poles[combination[2]].style.backgroundColor = 'red';
            score.textContent = `${poles[combination[0]].getAttribute('status') == 'circled' ? "Circles Win!!": "Crosses Win!!"}`
            //tablica wynikow
            if (poles[combination[0]].getAttribute('status') == 'circled') {
                circlesscore++
            } else if (poles[combination[0]].getAttribute('status') == 'crossed') {
                crossesscore++
            }
            console.log('wygrana');
            gameStatus = 'finished';
        } else if (poles[0].hasAttribute('status') == true && poles[1].hasAttribute('status') == true && poles[2].hasAttribute('status') == true && poles[3].hasAttribute('status') == true && poles[4].hasAttribute('status') == true && poles[5].hasAttribute('status') == true && poles[6].hasAttribute('status') == true && poles[7].hasAttribute('status') == true && poles[8].hasAttribute('status') == true) {
            score.textContent = 'Draw!!';
            draws++
        }
    })
})



reload.addEventListener('click', function () {
    const elements = document.querySelectorAll('div.board>div>div');
    elements.forEach(function (element) {
        element.parentNode.removeChild(element);
    })
    poles.forEach(function (pole) {
        pole.style.backgroundColor = 'white';
        pole.removeAttribute('status');
    })
    document.querySelector('p.circlesscore').textContent = `Circles Wins: ${circlesscore}`
    document.querySelector('p.crossesscore').textContent = `Crosses Wins: ${crossesscore}`
    document.querySelector('p.draws').textContent = `Draws: ${draws}`
    score.textContent = "Play Again";
    gameStatus = 'ongoing';
    setTimeout(function () {
        score.textContent = "Click on the board to start";
    }, 1000);
})