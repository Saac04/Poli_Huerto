const menu = document.getElementById("main-menu")

document.querySelector(".hamburguesa").addEventListener("click", () => {
    menu.classList.toggle("activo");
})

document.querySelectorAll("#main-menu ul a").forEach((a) => {
    a.addEventListener("click", () => {
        menu.classList.remove("activo");
    })
})