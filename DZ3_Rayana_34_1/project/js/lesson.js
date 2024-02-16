// TAB SLIDER
const tabContents= document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentSlide = 0

const hideTabContents = () => {
    tabContents.forEach((item)=> {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })

}

const showTabContents = (index = 0) => {
    tabContents[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

hideTabContents()
showTabContents()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tabItem,tabIndex)=>{
            if (event.target=== tabItem){
                hideTabContents()
                showTabContents(tabIndex)
            }
        })
    }
}
function nextSlide(){
    tabContents[currentSlide].style.display = 'none'
    currentSlide = (currentSlide+1) % tabContents.length
    tabContents[currentSlide].style.display ='block'

}

setInterval(nextSlide,3000)