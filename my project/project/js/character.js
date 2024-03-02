const request = new XMLHttpRequest();
request.open("GET", "../data/persons.json");
request.setRequestHeader("Content-type", "application/json");
request.send();

request.addEventListener('load', () => {
    const data = JSON.parse(request.response)
    const charactersContainer = document.querySelector('.persons-block')
    data.forEach(person => {
        const card = document.createElement('div')
        card.className = 'card'
        const img = document.createElement('img')
        img.src = person.gif_url
        img.className = 'person-photo'
        const name = document.createElement('h2')
        name.textContent = person.name
        const age = document.createElement('p')
        age.textContent = 'Возраст: ' + person.age
        age.className = 'age'
        const bio = document.createElement('p')
        bio.textContent = 'Биография: ' + person.bio
        bio.className = 'bio'
        card.appendChild(img)
        card.appendChild(name)
        card.appendChild(age)
        card.appendChild(bio)
        charactersContainer.appendChild(card)
    });
});
