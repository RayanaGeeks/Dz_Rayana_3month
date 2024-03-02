document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        const cardContainer = document.getElementById("card-container");

        data.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = "https://i.pinimg.com/originals/ed/37/3c/ed373c1fd00dfa923e28c9ed7eab16f5.jpg";
            image.alt = "Image";

            const title = document.createElement("h2");
            title.textContent = post.title;

            const description = document.createElement("p");
            description.textContent = post.body;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});