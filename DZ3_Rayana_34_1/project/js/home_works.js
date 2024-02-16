  /* GMAIL BLOCK */
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.addEventListener('click',() =>{
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'PLEASE WRITE CORRECT GMAIL ADDRESS'
        gmailResult.style.color = 'red'
    };
});

/* MOVE BLOCK */

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
const mainWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const mainHeight = parentBlock.offsetHeight - childBlock.offsetHeight;
let positionX = 0;
let positionY = 0;
let moveRight = true;
let moveDown = true;

const moveBlock = () => {
    if (moveRight && positionX < mainWidth) {
        positionX+=2
        childBlock.style.left = `${positionX}px`;
    } else if (!moveRight && positionX > 0) {
        positionX-=2
        childBlock.style.left = `${positionX}px`;
    } else if (moveDown && positionY < mainHeight) {
        positionY+=2
        childBlock.style.top = `${positionY}px`;
    } else if (!moveDown && positionY > 0) {
        positionY-=2;
        childBlock.style.top = `${positionY}px`;
    }
    if (positionX >= mainWidth && positionY >= mainHeight) {
        moveRight = false;
        moveDown = false;
    } else if (positionX <= 0 && positionY <= 0) {
        moveRight = true;
        moveDown = true;
    }
    setTimeout(moveBlock, 1);
}
moveBlock();




/*-------STOP WATCH------ */

const buttonStart = document.getElementById('start');
const buttonStop = document.getElementById('stop');
const buttonReset = document.getElementById('reset');
let timeBlock = document.getElementById('seconds');
let time = 0;
let interval;

function startCounter() {
    if (!interval) {
        interval = setInterval(() => {
            time++;
            timeBlock.innerHTML = time;
            buttonStart.disabled = true;
            buttonStop.disabled = false;
        }, 1000);
    }
}

buttonStart.addEventListener('click', startCounter);

buttonStop.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    buttonStart.disabled = false;
    buttonStop.disabled = true;
});

buttonReset.addEventListener('click', () => {
    clearInterval(interval);
    setTimeout(()=>{
    function reset (){
        interval = null
        time=0
        timeBlock.innerHTML=time
        buttonStart.disabled=false
        buttonStop.disabled=true
    };
    reset()
    },800);
});






