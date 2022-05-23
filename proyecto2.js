const habitaciones = [
{
    nombre: "Standard",
    ubicacion: "Pisos inferiores",
    superficie: "30 metros cuadrados",
    img: "/img/standard.jpg",
    cardButtom: "cardBotonStandard",
},
{
    nombre: "Superior",
    ubicacion: "Pisos superiores",
    superficie: "35 metros cuadrados",
    img: "/img/superior.jpg",
    cardButtom: "cardBotonSuperior",
},
    {
        nombre: "Suite",
        ubicacion: "Pisos superiores",
        superficie: "50 metros cuadrados",
        img: "/img/suite.jpg",
        cardButtom: "cardBotonSuite",
    },
];


// Solicitar fechas de estadía (supone que todos los meses tienen 30 días)

// Fecha In
let mesIn;
let diaIn;
let dateIn;
let fechaIn;
let mesOut;
let diaOut;
let dateOut;
let fechaIngreso;
let precioNoche;
let duracionEstadia;
let precioStandard;
let precioSuperior;
let precioSuite;

let boton = document.getElementById("miBoton");
fechaIn = document.getElementById("diaIngreso");
fechaOut = document.getElementById("diaSalida");
boton.addEventListener("click", ingresarFechas);

function ingresarFechas(e)
{
    e.preventDefault();
    let entra = fechaIn.value;
    diaIn = parseInt(entra[8] + entra[9]);
    mesIn = parseInt(entra[5] + entra[6]);
    console.log(diaIn);
    console.log(mesIn);

    let sale = fechaOut.value;
    diaOut = parseInt(sale[8] + sale[9]);
    mesOut = parseInt(sale[5] + sale[6]);
    console.log(diaOut);
    console.log(mesOut);

    // Duración estadía
    
    let inEstadia = Date.parse(fechaIn.value);
    let outEstadia = Date.parse(fechaOut.value);
    duracionEstadia = Math.abs((inEstadia - outEstadia) / 1000 / 60 / 60 / 24);
    console.log("Duración estadía: " + duracionEstadia);
    elegirHabitacion();
    return duracionEstadia;
}


    // Calcular precio noche
    function calcularPrecioNoche()
   {
        switch (mesIn)
        {
            case 1: precioNoche = 100; break;
            case 2: precioNoche = 110; break;
            case 3: precioNoche = 150; break;
            case 4: precioNoche = 145; break;
            case 5: precioNoche = 115; break;
            case 6: precioNoche = 108; break;
            case 7: precioNoche = 112; break;
            case 8: precioNoche = 147; break;
            case 9: precioNoche = 150; break;
            case 10: precioNoche = 155; break;
            case 11: precioNoche = 160; break;
            case 12: precioNoche = 180; break;
        }

        // Precios por categoria

        precioStandard = precioNoche;
        precioSuperior = precioNoche * 1.15;
        precioSuite = precioNoche * 1.4;
   }


    // Mostrar categorías

    function elegirHabitacion()
    {
        calcularPrecioNoche();
        let cate = document.getElementById("categorias");

        for(const habitacion of habitaciones)
        {
            let card = document.createElement("div");

            card.innerHTML = `
            <div class="card-deck cardHabitaciones titleDemo">
                <div class="card cardHabitaciones2">
                    <img class="card-img-top" src="${habitacion.img}" alt="Card image cap">
                    <div class="card-body cardTextos">
                    <h5 class="card-title cardTitulo">${habitacion.nombre}</h5>
                    <p class="card-text">${habitacion.superficie}</p>
                    <p class="card-text"><small class="text-muted">${habitacion.ubicacion}</small></p>
                    <button type="button" class="btn btn-dark" id="${habitacion.cardButtom}">Book Now</button>
                </div>
            </div>
            `;
            cate.appendChild(card);
        }

        // Elegir habitación

        let botonStandard = document.getElementById("cardBotonStandard");
        let botonSuperior = document.getElementById("cardBotonSuperior");
        let botonSuite = document.getElementById("cardBotonSuite");

        botonStandard.addEventListener("click", () => calcularPrecioEstadia(precioStandard, duracionEstadia));
        botonSuperior.addEventListener("click", () => calcularPrecioEstadia(precioSuperior, duracionEstadia));
        botonSuite.addEventListener("click", () => calcularPrecioEstadia(precioSuite, duracionEstadia));
    }

    // Calcular Precio Estadia
    function calcularPrecioEstadia(precio, duracion)
    {
        let total = precio * duracion;
        console.log("Total reserva: " + total);
        mostrarPrecio(total);
        return total;
    }

    function mostrarPrecio(precioAMostrar)
    {
        let resumenReserva = document.createElement("div");
        resumenReserva.innerHTML = `
        <div class="mostrarTitulo">
            <h3>¡Muchas gracias por elegir nuestro hotel!</h3>
            <h4>Le confirmamos su reserva</h4>
        </div>
        <div class="mostrar">
            <p>Check in: ${fechaIn.value}</p>
            <p>Check out: ${fechaOut.value}</p>
            <p>Estadía: ${duracionEstadia} noches</p>
            <p>Precio total: ${precioAMostrar}</p>
        </div>
        `;
        
        let muestraPrecio = document.getElementById("muestraPrecio");
        muestraPrecio.appendChild(resumenReserva);
    }

