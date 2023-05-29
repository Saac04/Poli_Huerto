function cambioColorLineaDelHeaderAcitvo() {
    let botonMenu = document.getElementById("boton-menu");
    let linea = document.getElementById("cabecera-web")
    
    botonMenu.addEventListener("click", function() { 
        if (botonMenu.ariaExpanded === "false") { 
            console.log("if")
            linea.className += " activo";
        }else{
            console.log("else")
            linea.className = linea.className.replace(" activo", "");
        }
    })
}

cambioColorLineaDelHeaderAcitvo()


