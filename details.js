const params = new URLSearchParams(location.search);
const id = params.get("id");

const baseUrl = "https://striveschool-api.herokuapp.com/books/";

const getDetails = async () => {
    try {
        const res = await fetch(baseUrl + id);
        const data = await res.json();
        createCardDetail(data);
    } catch (error) {
        console.error(error);
    }
};
getDetails();

const createCardDetail = (res) => {
    const img = document.getElementById("image");
    img.src = res.img;
    const title = document.getElementById("title");
    title.textContent = "Title: " + res.title;
    const category = document.getElementById("category");
    category.textContent = "Category: " + res.category;
    const asin = document.getElementById("asin");
    asin.textContent = "Asin Code: " + res.asin;
};
