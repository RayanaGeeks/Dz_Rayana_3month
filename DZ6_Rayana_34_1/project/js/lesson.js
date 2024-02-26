// PHONE CHECKER
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp =/^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click',() => {
    if (regExp.test(phoneInput.value)){
       phoneResult.innerHTML = 'OK'
       phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
});

// TAB SLIDER
const tabContents= document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');
let currentSlide = 0 ;

const hideTabContents = () => {
    tabContents.forEach((item)=> {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })

};

const showTabContents = (index = 0) => {
    tabContents[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
};

hideTabContents();
showTabContents();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tabItem,tabIndex)=>{
            if (event.target=== tabItem){
                hideTabContents()
                showTabContents(tabIndex)
            }
        })
    }
};
function nextSlide() {
    tabContents[currentSlide].style.display = 'none'
    tabs[currentSlide].classList.remove('tab_content_item_active')
    currentSlide = (currentSlide + 1) % tabContents.length
    tabContents[currentSlide].style.display = 'block'
    tabs[currentSlide].classList.add('tab_content_item_active')
}

setInterval(nextSlide,3000);

//CONVERTER

//DRY - Don't repeat yourself

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement, current, data) => {
    element.oninput = () => {
        if (element.value === '') {
            targetElement.value = ''
            eurInput.value = ''
            return
        }

        switch (current) {
            case 'som':
                targetElement.value = (element.value / data.usd).toFixed(2)
                eurInput.value = (element.value / data.eur).toFixed(2)
                break;
            case 'usd':
                targetElement.value = (element.value * data.usd).toFixed(2)
                eurInput.value = (targetElement.value / data.eur).toFixed(2)
                break;
            case 'eur':
                targetElement.value = (element.value * data.eur).toFixed(2)
                usdInput.value = (targetElement.value / data.usd).toFixed(2)
                break;
            default:
                break;
        }
    }
};

const request = new XMLHttpRequest();
request.open('GET', '../data/converter.json');
request.setRequestHeader('Content-type', 'application/json');
request.send();

request.onload = () => {
    const data = JSON.parse(request.response);

    converter(somInput, usdInput, 'som', data);
    converter(usdInput, somInput, 'usd', data);
    converter(eurInput, somInput, 'eur', data);

    eurInput.oninput = () => {
        if (eurInput.value === '') {
            usdInput.value = ''
            somInput.value = ''
            return
        }
        const eurValue = parseFloat(eurInput.value);
        usdInput.value = (eurValue * data.usd).toFixed(2);
        somInput.value = (eurValue * data.eur / data.usd).toFixed(2);
    }
};

// CARD SWITCHER

const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const cardBlock = document.querySelector('.card');

let count = 1;

const fetchData = (count) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
.then(response => response.json())
        .then(data =>{
            updateCardUI(data)
        })
};

const updateCardUI = (data) => {
    cardBlock.innerHTML =`
        <p>${data.title}</p>
        <p style="color:${data.completed ? 'green' : 'red'}">
            ${data.completed}
        </p>
        <span>id: ${data.id}</span>
    `
};

const updateCount = (increment) => {
    count = (count + increment - 1 + 200) % 200 + 1
};

btnNext.onclick = () => {
    updateCount(1)
    fetchData(count)
};

btnPrev.onclick = () => {
    updateCount(-1)
    fetchData(count)
};

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))

fetchData(1);

