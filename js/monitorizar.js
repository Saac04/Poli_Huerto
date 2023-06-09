async function configGraficas() {
    const response = await fetch('../js/configGraficas.json');
    const jsonData = await response.json();
    return jsonData
}

const configGraficaConst = configGraficas()

async function medicionesHuerto() {
    const response = await fetch('../js/huertos.json');
    const jsonData = await response.json();
    return jsonData
}

const medicionesHuertoConst = medicionesHuerto()


let ctx = document.getElementById('plot1').getContext('2d');

let data = {
    labels: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    datasets: [{
        label: 'Huerto 1',
        data: [],
        borderColor: 'rgba(255, 0, 0, 0.6)',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderWidth: 1.5,
        tension: 0.3,
    }]
};

let config = {
    maintainAspectRatio: false,
    scales: {
        x: {
            title:{
                display: true,
                text: 'Hora'
            }
        },
        y: {
            title:{
                display: true,
                text: 'temperatura ºC'
            },
            min: 50,
            max: 0
        }
    }
};

let grafica1 = new Chart(ctx, {
    type: 'line',
    data: data,
    options: config
});

let huerto = document.getElementById("selector-huertos")
var nombreHuerto = 'Huerto '+ huerto.value


let HuertoId = () =>{
    let huertoID = 'huerto' + huerto.value
    return huertoID
} 

let cambiarData = (nuevoLabel) => {
    grafica1.data.datasets[0].label = nuevoLabel
    grafica1.update();
}

document.getElementById("selector-huertos").addEventListener("change", () => {
    nombreHuerto = 'Huerto '+ huerto.value
    cambiarData(nombreHuerto)

    cambiarGrafica(0)

    document.getElementById('temperatura').classList.add('active')
    graficaPredeterminada()

    grafica1.update()
    
})


async function seleccionHuerto (){
    
    const dataGrafica = await medicionesHuerto()
    let huerto = HuertoId()
    
    if (huerto == 'huerto1'){
        return dataGrafica.huerto1
    } else if ( huerto == 'huerto2'){
        return dataGrafica.huerto2
    } else {
        return dataGrafica.huerto3
    }
}

async function obtener_Datos_a_Graficar (graficaID) {
    
    const dataGrafica = await seleccionHuerto()
    
    if (graficaID == 'temperatura' || graficaID == 0){
        return dataGrafica.temperatura
    } else if (graficaID == 'humedad' || graficaID == 1){
        return dataGrafica.humedad
    } else if (graficaID == 'luminosidad' || graficaID == 2){ 
        return dataGrafica.luminosidad
    } else if (graficaID == 'luz_UV' || graficaID == 3){
        return dataGrafica.luz_UV
    } else if (graficaID == 'salinidad' || graficaID == 4){
        return dataGrafica.salinidad
    } else {
        return dataGrafica.pH
    }
}
async function obtener_config_grafica (graficaID) {
    
    const dataGrafica = await configGraficas()
    
    if (graficaID == 'temperatura' || graficaID == 0){
        return dataGrafica.temperatura
    } else if (graficaID == 'humedad' || graficaID == 1){
        return dataGrafica.humedad
    } else if (graficaID == 'luminosidad' || graficaID == 2){ 
        return dataGrafica.luminosidad
    } else if (graficaID == 'luz_UV' || graficaID == 3){
        return dataGrafica.luz_UV
    } else if (graficaID == 'salinidad' || graficaID == 4){
        return dataGrafica.salinidad
    } else {
        return dataGrafica.pH
    }
}

const listaTipoMedida = document.getElementsByClassName('list-group-item')



async function minimos_y_maximos (graficaID){
    
    const datosConfigGrafica = await obtener_config_grafica(graficaID)

    const medidas = await seleccionHuerto()
    const datosGrafica = await obtener_Datos_a_Graficar(graficaID)
    
    if (datosGrafica[0] == medidas.temperatura[0]){
        grafica1.options.scales.y.min = Math.min(...datosGrafica) - 0.3 
        grafica1.options.scales.y.max = Math.max(...datosGrafica) + 0.3      
    } else {
        grafica1.options.scales.y.min = 0
        grafica1.options.scales.y.max = datosConfigGrafica.max 
    }
    
    grafica1.update()
}

async function graficaPredeterminada () {
    const mediciones = await seleccionHuerto()
    const config = await configGraficas()

    
    grafica1.data.datasets[0].data = mediciones.temperatura

    grafica1.data.datasets[0].borderColor = config.temperatura.colorLinea
    grafica1.data.datasets[0].backgroundColor = config.temperatura.colorPunto

    minimos_y_maximos(0)
    
    grafica1.update()
}

graficaPredeterminada()

async function valoresActuales(){
    
    for (let i = 0; i < listaTipoMedida.length; i++) {
        
        let datos_a_graficar = await obtener_Datos_a_Graficar(i)
        
        let ultimaMedida = datos_a_graficar[listaTipoMedida.length - 1]
        
        let datosConfig = await obtener_config_grafica(i)

        let tipoEscala = datosConfig.tipoEscala
        
        listaTipoMedida[i].innerHTML = listaTipoMedida[i].id.charAt(0).toUpperCase() + listaTipoMedida[i].id.slice(1) + ": " + ultimaMedida + " " + tipoEscala 
    } 

    grafica1.update()
    
}

valoresActuales()




async function cambiarGrafica(graficaID){
    
    /* Elemento HTML de la medida que se quiere graficar */
    let medida = document.getElementById(graficaID)
    /* tamaño de la lista de las medidas graficadas */
    let tamañoListaMedida = grafica1.data.datasets[0].data.length
    /* Quitar y añadir una la clase active*/
    for (let i = 0; i < listaTipoMedida.length; i++) {
        listaTipoMedida[i].classList.remove('active')
    }

    medida.classList.add('active')  
    
    /* Informacion de obtenida de grafica.json*/
    
    const datos_a_graficar = await obtener_Datos_a_Graficar(graficaID)

    const datos_configuracion = await obtener_config_grafica(graficaID)  
    
    let tipoEscala = datos_configuracion.tipoEscala

    

    /* Cambiar la escala de las Y */
    grafica1.options.scales.y.title.text = graficaID + " " + tipoEscala
    
    /* Se borran los datos de la grafica actual*/ 
    for (let j = 0; j < tamañoListaMedida; j++) {
        grafica1.data.datasets[0].data.pop()      
    }

    /* Nuevos datos de a graficar */
    grafica1.data.datasets[0].data = datos_a_graficar

    minimos_y_maximos(graficaID)

    /* Cambiar los colores de la linea y puntos de la Grafica correspondientemente */ 
    grafica1.data.datasets[0].borderColor = datos_configuracion.colorLinea
    grafica1.data.datasets[0].backgroundColor = datos_configuracion.colorPunto

    grafica1.update()
}


