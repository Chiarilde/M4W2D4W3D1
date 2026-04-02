const cardContainer = document.getElementById("cards");
const spinner = document.querySelector(".spin");
const addBtn = document.querySelector(".addtbn");

const showSpinner = () => {
    spinner.classList.remove("none");
};
const hideSpinner = () => {
    spinner.classList.add("none");
};

const createCard = (array) => {
    array.map((item) => {
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const card = document.createElement("div");
        card.classList.add("card");
        const { img: i, title: t, price: p, asin } = item;
        const img = document.createElement("img");
        img.src = i;
        const title = document.createElement("h2");
        title.textContent = t;
        const price = document.createElement("h3");
        const aggiungi = document.createElement("button");
        aggiungi.classList.add("addBtn");
        aggiungi.textContent = "Add";
        const details = document.createElement("button");
        details.innerHTML = `<a href="./details.html?id=${asin}">Details</a>`;
        const togli = document.createElement("button");
        togli.textContent = "Remove";
        togli.classList.add("togliBtn");
        togli.addEventListener("click", () => removeCard(card));
        aggiungi.addEventListener("click", () => AddBook(item));
        price.textContent = "Price: " + p + "$";
        card.append(img, title, price, buttons);
        buttons.append(details, aggiungi, togli);
        cardContainer.appendChild(card);
    });
};

const getBook = async () => {
    showSpinner();
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/books",
        );
        return await response.json();
    } catch (e) {
        console.error(e);
    } finally {
        hideSpinner();
    }
};

getBook().then((res) => {
    createCard(res);
});

const removeCard = (card) => {
    card.classList.add("removeCard");
};

const carrello = [];
const cart = document.querySelector(".cart");

const AddBook = (item) => {
    carrello.push(item);
    cart.textContent = carrello.length;
    cart.classList.add("cart2"); // mostra il badge (era invertito)
    renderCarrello(); // ← mancava questa riga!
};

const carrelloSpace = document.createElement("div");
carrelloSpace.classList.add("carrello");
document.body.appendChild(carrelloSpace);

const carrelloIcon = document.querySelector(".carrelloIcon");
carrelloIcon.addEventListener("click", () => {
    carrelloSpace.classList.toggle("carrello--open");
});

const renderCarrello = () => {
    carrelloSpace.innerHTML = "";

    carrello.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("carrello-item");
        div.innerHTML = `
            <img src="${item.img}" />
            <strong>${item.title}</strong>
            <span>€${item.price}</span>
            <span class="remove" style="cursor:pointer">❌</span>
        `;
        carrelloSpace.appendChild(div);

        div.querySelector(".remove").addEventListener("click", () => {
            carrello.splice(index, 1);
            cart.textContent = carrello.length;
            renderCarrello();
        });
    });
};
