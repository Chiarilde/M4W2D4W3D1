const cardContainer = document.getElementById("cards");

const createCard = (array) => {
    array.map((item) => {
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const card = document.createElement("div");
        card.classList.add("card");
        const { img: i, title: t, price: p } = item;
        const img = document.createElement("img");
        img.src = i;
        const title = document.createElement("h2");
        title.textContent = t;
        const price = document.createElement("h3");
        const aggiungi = document.createElement("button");
        aggiungi.textContent = "Add";
        const togli = document.createElement("button");
        togli.textContent = "Remove";
        price.textContent = "Price: " + p + "$";
        card.append(img, title, price, buttons);
        buttons.append(aggiungi, togli);
        cardContainer.appendChild(card);
    });
};

const getBook = async () => {
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/books",
        );
        return await response.json();
    } catch (e) {
        console.error(e);
    }
};

getBook().then((res) => {
    createCard(res);
});
