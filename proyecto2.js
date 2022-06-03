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

// Registro de reservas
let reservas;
class Reservas {
    constructor (reserva)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.pais = pais;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.ingreso = ingreso;
        this.out = out;
    }
}

reservas = JSON.parse(localStorage.getItem("reservas")) || []; 

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
let total;
let nombre;
let apellido;
let email;
let pais;
let ciudad;
let direccion;
let telefono;
let inEstadia;
let outEstadia;
let ingreso;
let out;


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
    
    inEstadia = new Date(fechaIn.value);
    outEstadia = new Date(fechaOut.value);
    duracionEstadia = Math.abs((inEstadia - outEstadia) / 1000 / 60 / 60 / 24);
    console.log("Duración estadía: " + duracionEstadia);
    console.log("Fecha In: " + inEstadia);
    console.log("Fecha out: " + outEstadia);
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

        let standard = "standard";
        let superior = "superior";
        let suite = "suite";

        botonStandard.addEventListener("click", () => calcularPrecioEstadia(precioStandard, duracionEstadia, standard));
        botonSuperior.addEventListener("click", () => calcularPrecioEstadia(precioSuperior, duracionEstadia, superior));
        botonSuite.addEventListener("click", () => calcularPrecioEstadia(precioSuite, duracionEstadia, suite));
    }

    // Calcular Precio Estadia
    function calcularPrecioEstadia(precio, duracion, categoria)
    {
        total = precio * duracion;
        console.log("Total reserva: " + total);
        mostrarReserva(total, categoria);
        return total;
    }

    function mostrarReserva(precioAMostrar, categoria)
    {
        let resumenReserva = document.createElement("div");
        resumenReserva.innerHTML = `
        <div class="mostrarTitulo">
            <h3>Recapitulativo</h3>
            <h4>Su reserva</h4>
        </div>
        <div class="mostrar">
            <p>Check in: ${fechaIn.value}</p>
            <p>Check out: ${fechaOut.value}</p>
            <p>Estadía: ${duracionEstadia} noches</p>
            <p>Habitación: ${categoria}</p>
            <p>Precio total: ${precioAMostrar}</p>
        </div>
        `;
    
        let muestraPrecio = document.getElementById("muestraPrecio");
        muestraPrecio.appendChild(resumenReserva);
        confirmarReserva();
    }

    // Botón confirmar reserva
    function confirmarReserva()
    {
        let confirma = document.createElement("div");
        confirma.innerHTML = `
        <button type="button" class="btn btn-dark botonConfirmarReserva" id="botonConfirmar">Confirmar reserva</button>
        `;
        let confirmaReserva = document.getElementById("confirmaReserva");
        confirmaReserva.appendChild(confirma);

        let botonConfirmar = document.getElementById("botonConfirmar");
        botonConfirmar.onclick = () => ingresarDatos();
    }

    // Ingresar datos
    function ingresarDatos()
    {
        let ingresoDatos = document.createElement("div");
        ingresoDatos.innerHTML = `
        <form class="inputNombre">

        <div class="form-group">
          <label for="inputAddress">First Name</label>
          <input type="text" class="form-control" id="firstName" placeholder="Julián">
        </div>
      
        <div class="form-group">
          <label for="inputAddress">Last Name</label>
          <input type="text" class="form-control" id="lastName" placeholder="Álvarez">
        </div>
        
        <div class="form-row">
            <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="julian@river.com">
            </div>
        </div>
      
        <div class="form-group">
          <label for="inputAddress2">Phone</label>
          <input type="phone" class="form-control" id="phone" placeholder="+54 11 3636 9898">
        </div>
      
        <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="Arenales 1111">
        </div>
        
        <div class="form-row">
            <div class="form-group">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" placeholder="Buenos Aires">
            </div>
      
            <div class="form-row">
              <div class="form-group">
              <label for="inputCity">Country</label>
              <input type="text" class="form-control" id="inputCountry" placeholder="Argentina">
            </div>
      
        </div>
        <button type="button" class="btn btn-dark botonConfirmarReserva" id="botonContinuar">Continuar</button>
      </form>
        `;
        let seccionIngreso = document.getElementById("seccionIngresoDatos");
        seccionIngreso.appendChild(ingresoDatos);

        let botonContinuar = document.getElementById("botonContinuar");
        botonContinuar.onclick = () => {
            nombre = document.getElementById("firstName").value;
            apellido = document.getElementById("lastName").value;
            email = document.getElementById("email").value;
            telefono = document.getElementById("phone").value;
            pais = document.getElementById("inputCountry").value;
            ciudad = document.getElementById("inputCity").value;
            direccion = document.getElementById("inputAddress").value;
            //agregar fecha in y out
            ingreso = inEstadia;
            out = outEstadia;
            crearNuevaReserva(nombre, apellido, email, telefono, pais, ciudad, direccion, ingreso, out);
        }
    }

// Crear nueva reserva
function crearNuevaReserva(nombre, apellido, email, telefono, pais, ciudad, direccion, ingreso, out)
{
    console.log("Nombre: " + nombre);
    console.log("Apellido: " + apellido);
    console.log("Email: " + email);

    let nuevaReserva = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        pais: pais,
        ciudad: ciudad,
        direccion: direccion,
        ingreso: ingreso,
        out: out
    };

reservas.push(new Reservas(nuevaReserva));
console.table(reservas);
localStorage.setItem("reservas", JSON.stringify(reservas));
formaDePago();
}


    // Forma de pago
    function formaDePago()
    {
        let formaPago = document.createElement("div");
        formaPago.innerHTML = `
        <div class="formaPago inputNombre">
            <h3>Forma de pago</h3>
            <div class="form-group">
                <label for="formaPago">Elija el método de pago</label>
                <select class="form-control" id="formaPago">
                    <option>Elegir opción</option>
                    <option>Tarjeta de crédito</option>
                    <option>Transferencia bancaria</option>
                </select>
            </div>
        </div>
        `;
        let secciondeFormaPago = document.getElementById("seccionFormaPago");
        secciondeFormaPago.appendChild(formaPago);

        let formaPagoSeleccionada = document.getElementById("formaPago");
        formaPagoSeleccionada.onchange = () => {
            formaPagoSeleccionada.value == "Tarjeta de crédito" ?  mostrarTarjeta() : mostrarTransferencia();
        }
    }

    // Tarjeta de crédito
    function mostrarTarjeta()
    {
        let tarjeta = document.createElement("div");
        tarjeta.innerHTML = `
        <div class="caja">
        <div class="container tarjetaCredito">
          <div class="tarjetaCredito1">
            <label for="fname">Full Name</label>
            <input type="text" class="form-control" id="fname" placeholder="John M. Smith">
            <label for="cardnumber">Card Number</label>
            <input type="number" class="form-control" id="cardNumber" placeholder="1234 1234 1234 1234">
          </div>
          <div class="tarjetaCredito2">
            <label for="cvv">CVV</label>
            <input type="number" class="form-control" id="cNumber" placeholder="123">
            <label for="exDate">Expiration Date</label>
            <input type="number" class="form-control" id="exDate" placeholder="12/22">
          </div>
        <button type="button" class="btn btn-dark botonConfirmarReserva" id="botonPagar">Pagar</button>
        </div>
      </div>
        `;
        let seccionFormaDePago = document.getElementById("seccionFormaPago");
        seccionFormaDePago.appendChild(tarjeta);

        let botonPagar = document.getElementById("botonPagar");
        botonPagar.onclick = () => finalizar();
    }

    // Transferencia bancaria
    function mostrarTransferencia()
    {
        let tran = document.createElement("div");
        tran.innerHTML = `
        <div class="articulos">
        <h2 class="titulo">Datos para la transferencia bancaria</h2>
        <p>Razón Social: Nuestro Hotel SA</p>
        <p>CUIT: 1-123456789-10</p>
        <p>CBU: 1234567890123456789012</p>
        <p>Banco: Mi banco</p>
        <p>Tipo de cuenta: CC en $</p>
        <button type="button" class="btn btn-dark botonConfirmarReserva" id="botonContinuar2">Continuar</button>
        </div>
        `;
        let seccionFormaDePago = document.getElementById("seccionFormaPago");
        seccionFormaDePago.appendChild(tran);

        let botonContinuar2 = document.getElementById("botonContinuar2");
        botonContinuar2.onclick = () => {
            Swal.fire(
                'Has finalizado tu reserva',
                'Te esperamos pronto',
                'success'
              );
            finalizar();
            };
    }

// Finalizar
function finalizar()
{
    console.log(reservas.length);
    let ultima = reservas.length - 1;
    console.log("ultima: " + ultima);
    let fin = document.createElement("div");
    fin.innerHTML = `
    <div class="articulos">
    <h2 class="titulo">Muchas gracias por confiar en nosotros</h2>
    <p>Resumen de su reserva</p>
    <p>Apellido: ${reservas[ultima].apellido}</p>
    <p>Check In: ${diaIn}/${mesIn}</p>
    <p>Check Out: ${diaOut}/${mesOut}</p>
    <p>${duracionEstadia} Noches</p>
    <p>Precio: ${total}</p>
    <a href="index.html">
        <button type="button" class="btn btn-dark botonConfirmarReserva" id="" href="index.html">Realizar una nueva reserva</button>
    </a>
    </div>
    `;
    let seccionFin = document.getElementById("seccionFinalizar");
    seccionFin.appendChild(fin);
    console.table("reservas");


// Desestructuración y alias. Se hace sólo a modo de ejercicio.
const {
    apellido: huesped,
    ingreso: llegada,
    out: salida,
} = reservas[ultima];

console.log(`El huésped ${huesped} tiene una reserva en el hotel con fecha de llegada ${llegada} y fecha de salida ${salida}`);

}
