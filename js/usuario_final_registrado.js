document.querySelector("#menu").addEventListener(
    "click",
    (event) => {
        let value = event.target.parentNode.dataset.item; // Se cambia el selector a parentNode.dataset.item para seleccionar el valor del atributo data-item del elemento li
        let tt = "item" + value;
        let items = document.querySelectorAll("section[id^='item']");
        items.forEach(
            (item)=>{
                if(item.id === tt){
                    item.classList.add("activo");
                }else{
                    item.classList.remove("activo");
                }
            }
        )
        let links = document.querySelectorAll("#menu a");
        links.forEach((link) => {
            if (link.parentNode.dataset.item === value) {
                link.classList.add("activa");
            } else {
                link.classList.remove("activa");
            }
        });
    }



);


document.querySelector("#menu1").addEventListener(
    "click",
    (event) => {
        let value = event.target.parentNode.dataset.item; // Se cambia el selector a parentNode.dataset.item para seleccionar el valor del atributo data-item del elemento li
        let tt = "item" + value;
        let items = document.querySelectorAll("div[id^='item']");
        items.forEach(
            (item)=>{
                if(item.id === tt){
                    item.classList.add("activo");
                }else{
                    item.classList.remove("activo");
                }
            }
        )
        let links = document.querySelectorAll("#menu1 a");
        links.forEach((link) => {
            if (link.parentNode.dataset.item === value) {
                link.classList.add("activa");
            } else {
                link.classList.remove("activa");
            }
        });
    }



);



document.querySelectorAll('article:not(:first-of-type)').forEach(function(el) {
    el.style.display = 'none';
});

document.querySelectorAll('nav a').forEach(function(el) {
    el.addEventListener('click', function(event) {
        event.preventDefault();

        document.querySelectorAll('article').forEach(function(el) {
            el.style.display = 'none';
        });

        var href = this.getAttribute('href');
        document.querySelector(href).style.display = 'block';
    });
});