// PHONE CHECKER
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');
const phoneBlock = document.querySelector('#phone_block')

const regExp =/^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'Поздравляю ты последователь Киры! &#127822;'
        phoneResult.style.color = 'green'
        phoneBlock.classList.add('correct')
        phoneBlock.classList.remove('incorrect')
    } else {
        phoneResult.innerHTML = 'Кира убил тебя &#9760;'
        phoneResult.style.color = 'red'
        phoneBlock.classList.add('incorrect')
        phoneBlock.classList.remove('correct')
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

const fetchData1 = async () => {
    try {
        const response = await fetch('../data/converter.json')
        const data = await response.json()

        converter(somInput, usdInput, 'som', data);
        converter(usdInput, somInput, 'usd', data);
        converter(eurInput, somInput, 'eur', data);

        eurInput.oninput = () => {
            if (eurInput.value === '') {
                usdInput.value = ''
                somInput.value = ''
                return;
            }
            const eurValue = parseFloat(eurInput.value)
            usdInput.value = (eurValue * data.usd).toFixed(2)
            somInput.value = (eurValue * data.eur / data.usd).toFixed(2)
        };
    } catch (error) {
        console.error('Error fetching data:', error)
    }
};

fetchData1();

document.addEventListener('DOMContentLoaded', function() {
    const btnSend = document.querySelector('#converter-btn')
    const converterResult = document.querySelector('#converter_result')

    btnSend.addEventListener('click', function() {
        const randomNumber = Math.floor(Math.random() * 100) + 1
        const text = `Ты последователь Киры и твой уровень веры: ${randomNumber}% &#127822;`
        converterResult.style.color = 'darkGreen'
        converterResult.innerHTML = text
    })
});

// CARD SWITCHER

const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
const cardBlock = document.querySelector('.card');

let count = 1;

const fetchData = async (count) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        const data = await response.json()
        updateCardUI(data)
    } catch (error) {
        console.error('Error', error)
    }
};

const updateCardUI = (data) => {
    cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p style="color:${data.completed ? 'green' : 'red'}">
            ${data.completed}
        </p>
        <span>id: ${data.id}</span>
    `;
};

const updateCount = (increment) => {
    count = (count + increment - 1 + 200) % 200 + 1
};

btnNext.onclick = () => {
    updateCount(1)
    fetchData(count).catch(error => console.error('Error', error))
};

btnPrev.onclick = () => {
    updateCount(-1)
    fetchData(count).catch(error => console.error('Error', error))
};

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error', error))

fetchData(1);

//WEATHER

const cityInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');
const BASE_URL ='http://api.openweathermap.org';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

const getTemperatureSymbol = (temperature) => {
    if (temperature >= -15 && temperature < 0) {
        return '&#9729;'
    } else if (temperature >= 0 && temperature < 15) {
        return '&#127780;'
    } else if (temperature >= 15) {
        return '&#9728;'
    } else {
        return '&#10052;'
    }
};

const searchCity = async () => {
    cityInput.oninput = async function(event) {
        try {
            const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            citySpan.innerHTML = data.name ? data.name : 'City is not found'
            tempSpan.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C ' + getTemperatureSymbol(Math.round(data.main?.temp - 273)) : '...'
        } catch (error) {
            console.error('Error', error)
        }
    }
}

searchCity();
