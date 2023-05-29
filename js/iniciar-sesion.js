document.querySelector("form").addEventListener(
    "submit", enviarFormulario
)

async function enviarFormulario(event){
    event.preventDefault();
    let usuario = document.getElementById("user").value;
    let contrasenya = document.getElementById("password").value;
    let respuesta = await fetch("./usuarios/"+usuario+"-"+contrasenya);
    if(respuesta.ok){
        if(contrasenya =="1234" && usuario =="admin"){location.href = "usuarios/app.html" ;}else{
            location.href = "usuarios/monitorizar.html"
        }
    }else{
        alert("Usuario incorrecto");
    }
}