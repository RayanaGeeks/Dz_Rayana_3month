  /* GMAIL BLOCK */
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');
const gmailBlock = document.querySelector('.gmail_block');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.addEventListener('click',() =>{
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'Поздравляю ты прошел 1 этап проверки &#128522;'
        gmailResult.style.color = 'green'
        gmailBlock.classList.add('correct')
        gmailBlock.classList.remove('incorrect');
    }else {
        gmailResult.innerHTML = 'Эл подезревает что-ты шпион Киры &#128544;'
        gmailResult.style.color = 'red'
        gmailBlock.classList.add('incorrect')
        gmailBlock.classList.remove('correct')
    }
});

/* MOVE BLOCK */

  const childBlocks = document.querySelectorAll('.child_block');
  const parentBlock = document.querySelector('.parent_block');
  const mainWidth = parentBlock.offsetWidth - 50;
  const mainHeight = parentBlock.offsetHeight - 50;
  let positionsX = [0, 50, 100, 150];
  let positionsY = [0, 50, 100, 150];
  let moveRights = [true, true, true, true];
  let moveDowns = [true, true, true, true];

  const moveBlocks = () => {
      childBlocks.forEach((childBlock, index) => {
          if (moveRights[index] && positionsX[index] < mainWidth) {
              positionsX[index] += 2
              childBlock.style.left = `${positionsX[index]}px`
          } else if (!moveRights[index] && positionsX[index] > 0) {
              positionsX[index] -= 2
              childBlock.style.left = `${positionsX[index]}px`
          } else if (moveDowns[index] && positionsY[index] < mainHeight) {
              positionsY[index] += 2
              childBlock.style.top = `${positionsY[index]}px`
          } else if (!moveDowns[index] && positionsY[index] > 0) {
              positionsY[index] -= 2
              childBlock.style.top = `${positionsY[index]}px`
          }
          if (positionsX[index] >= mainWidth && positionsY[index] >= mainHeight) {
              moveRights[index] = false
              moveDowns[index] = false
          } else if (positionsX[index] <= 0 && positionsY[index] <= 0) {
              moveRights[index] = true
              moveDowns[index] = true
          }

          let hue = (index * 60 + positionsX[index] + positionsY[index]) % 360
          childBlock.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
      })
      setTimeout(moveBlocks, 5);
  };

  moveBlocks();

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
        }, 1000)
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
    }
    reset()
    },800);
});






