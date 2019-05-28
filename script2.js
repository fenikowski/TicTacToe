let crossOrCircle = 0;
const poles = document.querySelectorAll('div.board>div');
const board = document.querySelector('div.board');
const score = document.querySelector('div.score');
const reload = document.querySelector('div.reload');
const potatoRain = document.querySelectorAll('div.potatoRain>img')
let gameStatus = 'ongoing';
let circlesscore = 0;
let crossesscore = 0;
let draws = 0;
let click = 0;

//funkcja dzwieku
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
const heartbeat = new sound('mp3/heartbeat.mp3')
const gong = new sound('mp3/gong.mp3')
const horn = new sound('mp3/horn.mp3')
const mySound = new sound('mp3/bang.mp3')
const aplasue = new sound('mp3/aplause.mp3')

board.addEventListener('mousemove', function () {
    heartbeat.play();
})

board.addEventListener('click', function () {
    if (click == 0) {
        gong.play();
    }
})

poles.forEach(function (pole) {
    pole.addEventListener('click', function () {
        if (gameStatus == 'finished' && pole.hasAttribute('status') == false) {
            alert('Are you trying to cheat on me? ( ͡° ͜ʖ ͡°)')
        } else if (crossOrCircle == 0 && pole.hasAttribute('status') == false) {
            crossOrCircle++;
            const newElement = document.createElement('div');
            newElement.style.backgroundImage = 'url(img/potato.png)';
            newElement.classList.add('imgstyle');
            pole.appendChild(newElement);
            pole.setAttribute('status', 'circled');
            mySound.play();
        } else if (crossOrCircle == 1 && pole.hasAttribute('status') == false) {
            crossOrCircle = 0;
            const newElement = document.createElement('div');
            newElement.style.backgroundImage = 'url(img/cookie.png)';
            newElement.classList.add('imgstyle');
            pole.appendChild(newElement);
            pole.setAttribute('status', 'crossed');
            mySound.play();
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
            poles[combination[0]].style.backgroundColor = ' rgb(36, 212, 36)';
            poles[combination[1]].style.backgroundColor = ' rgb(36, 212, 36)';
            poles[combination[2]].style.backgroundColor = ' rgb(36, 212, 36)';
            score.textContent = `${poles[combination[0]].getAttribute('status') == 'circled' ? "Potato Wins!!": "Cookie Wins!!"}`
            //tablica wynikow
            if (poles[combination[0]].getAttribute('status') == 'circled') {
                potatoRain.forEach(function (potato) {
                    potato.style.animationPlayState = 'running'
                    aplasue.play();
                })
                circlesscore++
            } else if (poles[combination[0]].getAttribute('status') == 'crossed') {
                potatoRain.forEach(function (potato) {
                    potato.setAttribute('src', 'img/cookie.png')
                    potato.style.animationPlayState = 'running';
                    horn.play();
                })
                crossesscore++
            }
            console.log('wygrana');
            gameStatus = 'finished';
        } else if (poles[0].hasAttribute('status') == true && poles[1].hasAttribute('status') == true && poles[2].hasAttribute('status') == true && poles[3].hasAttribute('status') == true && poles[4].hasAttribute('status') == true && poles[5].hasAttribute('status') == true && poles[6].hasAttribute('status') == true && poles[7].hasAttribute('status') == true && poles[8].hasAttribute('status') == true && gameStatus == 'ongoing') {
            score.textContent = 'Draw!!';
            gameStatus = 'finished'
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
    document.querySelector('p.circlesscore').textContent = `Potato's Wins: ${circlesscore}`
    document.querySelector('p.crossesscore').textContent = `Cookie's Wins: ${crossesscore}`
    document.querySelector('p.draws').textContent = `Draws: ${draws}`
    score.textContent = "Play Again";
    gameStatus = 'ongoing';
    setTimeout(function () {
        score.textContent = "Click on the board to start";
    }, 1000);
    gong.play();
    potatoRain.forEach(function (potato) {
        potato.setAttribute('src', 'img/potato.png')
        potato.classList.remove('potato');
        setTimeout(function () {
            potato.classList.add('potato');
        }, 1)
        potato.style.animationPlayState = 'paused';
    })
})