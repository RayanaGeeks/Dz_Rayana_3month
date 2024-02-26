// MODAL
const modal = document.querySelector('.modal');
const modalTriggerButton = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow= 'hidden'

};
const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow =''
};
modalTriggerButton.onclick = () => openModal();

modalCloseButton.onclick = () => closeModal();

modal.onclick=(event) => {
    if (event.target=== modal){
        closeModal()
    }
};


const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
        openModal()
        window.removeEventListener('scroll',handleScroll)
    }
};

window.addEventListener('scroll',handleScroll);


// setTimeout(openModal, 10000);

// POST DATA

const formElement = document.querySelector('form');

const postData = (url,dataJson)=>{
    const response =fetch(url), {
        method:"POST",
        headers: {"Content-type":"application/json"},
        body: dataJson
    
    }
}
postData('server.php', json)

//
// const postData = (form)=> {
//     form.addEventListener('submit', (event)=> {
//         event.preventDefault()
//
//         const request = new XMLHttpRequest()
//         request.open("POST", "server.php")
//         request.setRequestHeader("Content-type", "application/json")
//
//         const formData = new FormData(form)
//         const user = {}
//
//         formData.forEach((item,index) => {
//             user[index] = item
//         })
//         const json = JSON.stringify(user)
//         request.send(json)
//     })
// }
// postData(formElement);




