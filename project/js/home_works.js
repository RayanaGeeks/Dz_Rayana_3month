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

const moveRight = (element, currentPosition = 0, targetPosition = 450) => {
    if (currentPosition >= targetPosition) return
    const step = 1
    const newPosition = currentPosition + step

    element.style.left = `${newPosition}px`

    requestAnimationFrame(() => {
        moveRight(element, newPosition, targetPosition)
    });
};

const smallBlock = document.querySelector('.child_block');

moveRight(smallBlock);