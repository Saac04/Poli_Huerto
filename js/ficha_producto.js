const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const items = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function showItem(index) {
    // Oculta todos los elementos del carrusel y muestra sólo el elemento actual.
    items.forEach(item => item.classList.remove("active"));
    items[index].classList.add("active");
}

showItem(currentIndex);

prevButton.addEventListener("click", () => {
    // Decrementa el índice actual y muestra el elemento correspondiente.
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }
    showItem(currentIndex);
});

nextButton.addEventListener("click", () => {
    // Incrementa el índice actual y muestra el elemento correspondiente.
    currentIndex++;
    if (currentIndex >= items.length) {
        currentIndex = 0;
    }
    showItem(currentIndex);
});