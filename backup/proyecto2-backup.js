// Definición de las categorías de las habitaciones
class Habitacion{
    constructor(nombre, ubicacion, superficie, disponibilidad)
    {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.superficie = superficie;
        this.disponibilidad = disponibilidad;
    }
}
const standard = new Habitacion("Standard", "30 metros cuadrados", "Pisos inferiores", 20);
const superior = new Habitacion("Superior", "35 metros cuadrados", "Pisos superiores", 10);
const suite = new Habitacion("Standard", "50 metros cuadrados", "Pisos inferiores", 2);


// Solicitar fechas de estadía (supone que todos los meses tienen 30 días)

// Fecha In
let mesIn;
let diaIn;
let dateIn;
function ingresarFechaIn ()
{
    do
    {
    let fechaIn = prompt("Ingrese la fecha de ingreso. \n(Formato DDMM)");
    diaIn = parseInt(fechaIn[0] + fechaIn[1]);
    mesIn = parseInt(fechaIn[2] + fechaIn[3]);
    dateIn = diaIn + "/" + mesIn;
    if(mesIn > 12 || mesIn < 0)
    {
        alert("Por favor, ingrese una fecha válida");
    }
    }
    while((mesIn > 12) || (mesIn < 0));
    console.log("Día check-in: " + diaIn);
    console.log("Mes check-in: " + mesIn);
    console.log("Date In: " + dateIn);
}

// Fecha Out
let mesOut;
let diaOut;
let dateOut;
function ingresarFechaOut ()
{
do
{
let fechaOut = prompt("Ingrese la fecha de salida. \n(Formato DDMM)");
diaOut = parseInt(fechaOut[0] + fechaOut[1]);
mesOut = parseInt(fechaOut[2] + fechaOut[3]);
dateOut = diaOut + "/" + mesOut;
if(mesOut > 12 || mesOut < 0)
{
    alert("Por favor, ingrese una fecha válida");
}
}
while(mesOut > 12 || mesOut < 0);
console.log("Día check-out: " + diaOut);
console.log("Mes check-out: " + mesOut);
console.log("Date Out: " + dateOut);
}

// Duración estadía
let duracionEstadia;
function calcularDuracion()
{
if(mesOut == mesIn)
{
    duracionEstadia = diaOut - diaIn;
}
else if(mesOut > mesIn)
{
    duracionEstadia = (30 - diaIn) + diaIn;
}
console.log("La duración de su estadía es de: " + duracionEstadia + " noches");
}

// Elegir Categoría de habitaciones
let categoria;
function elegirCategoria ()
{
alert("Nuestro hotel cuenta con tres categorías de habitaciones: \nStandard \nSuperior \nSuite");
categoria = prompt("Elige la categoría de habitación en la que quieres hospedarte");
categoria = categoria.toLowerCase();
}


// Log de reservas
class Reserva{
    constructor(nombre, nacionalidad, email, cIn, out, monto, vigente)
    {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.email = email;
        this.cIn = cIn;
        this.out = out;
        this.monto = monto;
        this.vigente = vigente;
    }
}
const alvarez = new Reserva("Julián Álvarez", "Argentina", "alvarez@riverplate.com", "02/03", "10/03", 780, true);
const cruz = new Reserva("Nicolás de la Cruz", "Uruguaya", "delacruz@riverplate.com", "05/07", "09/07", 590, true);
const perez = new Reserva("Enzo Pérez", "Argentina", "perez@riverplate.com", "12/11", "15/11", 365, false);

const logReservas = [alvarez, cruz, perez];
console.table(logReservas);

// Calcular precio total de la reserva
let totalReserva;
let precioNoche;
function calcularPrecioEstadia ()
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

    if(categoria == "superior")
    {
        precioNoche = precioNoche * 1.1;
    }
    else if (categoria == "suite")
    {
        precioNoche = precioNoche * 1.3;
    }
    else
    {
        precioNoche = precioNoche;
    }
    
    console.log("El precio por noche es de: " + precioNoche);
    totalReserva = precioNoche * duracionEstadia;
    console.log("Total reserva: " + totalReserva);
}


// Confirmar reserva
let confirma;
function confirmarReserva()
{
    alert("Datos de su reserva: \nCheck In: " + diaIn + "/" + mesIn + "\nCheck Out: " + diaOut + "/" + mesOut + "\nTotal Noches: " + duracionEstadia
    + "\nPrecio total: " + totalReserva);
    confirma = prompt("Ingrese S para confirmar o N para cancelar");
    confirma = confirma.toLowerCase();
    if(confirma == "s")
    {
        crearNuevaReserva();
    }
    else
    {
        alert("Quedamos a la espera de su reserva en un futuro cercano");
    }
}

// Ingresar reserva
function crearNuevaReserva ()
{
alert("Muchas gracias por su reserva");
const nuevaReserva = new Reserva(
    prompt("Ingrese su nombre"),
    prompt("Ingrese su nacionalidad"),
    prompt("Ingrese su email"),
    dateIn,
    dateOut,
    totalReserva,
    true
)
logReservas.push(nuevaReserva);
console.table(logReservas);
alert("Su reserva está confirmada.");
consultarLogReservas();
}

// Verificar reserva - El usuario puede ver si tiene una reserva
function verificarReserva()
{
    alert("Aquí podrá verificar su reserva");
    const nombreAVerificar = prompt("Ingrese el nombre de la reserva que quiere verificar");
    const coincidencia = logReservas.filter( (rese) => rese.nombre == nombreAVerificar);
    console.log(coincidencia);
    if(coincidencia != 0)
    {
        for(let h = 0; h < coincidencia.length; h++)
        {
            alert("Hay " + coincidencia.length + " reserva(s) para esa persona. \nDatos de la reserva " + (h + 1) + ": \nCheck In: " + coincidencia[h].cIn + "\nCheck Out: " + coincidencia[h].out
            + "\nPrecio Total: " + coincidencia[h].monto + "\nConfirmada: " + coincidencia[h].vigente);
        }
    }
    else
    {
        alert("No existen reservas para esa persona.");
    }
    consultarLogReservas();
}

// Cancelar una reserva (Nota: sé que habría podido hacer todo directamente con el indexOf, sin necesidad del find. Pero la consigna reclamaba un find y no se me ocurría dónde usarlo.)
function cancelarReserva()
{
    alert("Aquí podrá cancelar una reserva.")
    const nombreACancelar = prompt("Ingrese el nombre de la reserva que quiere cancelar.");
    const encontrado = logReservas.find( (rese) => rese.nombre == nombreACancelar);
    if(encontrado != undefined)
    {
        console.log(encontrado);
        let indice = logReservas.indexOf(encontrado);
        let conf = prompt("¿Está seguro de que desea cancelar la reserva a nombre de " + encontrado.nombre + "? \nEscriba S o N.");
        conf = conf.toLowerCase();
        if(conf == "s")
        {
        logReservas.splice(indice,1);
        alert("Su reserva ha sido cancelada.")
        console.table(logReservas);
        }
        else
        {
            alert("Gracias por su consulta.")
        }
    }
    else
    {
        alert("No se encontró una reserva con ese nombre.");
    }
    consultarLogReservas();
}


// DOM - Agrega funcionalidad de consultar las reservas en registros
function consultarLogReservas()
{
    let tit = document.createElement("h2");
    tit.innerHTML = "<p>Registro de reservas del hotel</p>";
    let cuerpo2 = document.getElementsByClassName("cuerpo");
    tit.className = "titulo";
    cuerpo2[0].append(tit);

    let tabla1 = document.createElement("table");
    tabla1.className = "table table-striped thead-light";
    let contenidoTabla = document.createElement("tbody");

    let rowTitle = document.createElement("tr");
    rowTitle.innerHTML = `
    <th>Nombre</th>
    <th>Nacionalidad</th>
    <th>Email</th>
    <th>Check In</th>
    <th>Check Out</th>
    <th>Precio</th>
    <th>Vigente</th>`;
    contenidoTabla.appendChild(rowTitle);

    for(const log of logReservas)
    {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${log.nombre}</td>
        <td>${log.nacionalidad}</td>
        <td>${log.email}</td>
        <td>${log.cIn}</td>
        <td>${log.out}</td>
        <td>${log.monto}</td>
        <td>${log.vigente}</td>`;
        contenidoTabla.appendChild(row);
    }
    tabla1.appendChild(contenidoTabla);

    let cuerpo1 = document.getElementById("cuerpoPrinc");      // Lugar a asignar la tabla
    cuerpo1.appendChild(tabla1);
}


// Inicio
let inicio;
function iniciarSimulador()
{
    inicio = parseInt(prompt("Ingrese el número de la opción deseada: \n1. Realizar una reserva \n2. Verificar una reserva \n3. Cancelar una reserva \n4. Consultar reservas en libros"));
}

// Menú inicial
alert("Buenvenido a nuestro Hotel. \nEstarás entrado a nuestro motor de reservas.");
iniciarSimulador();

if(inicio == 1)
{
    do
    {
    ingresarFechaIn();
    ingresarFechaOut();
    calcularDuracion();
    if(duracionEstadia < 1)
    {
        alert("Por favor, ingrese nuevamente las fechas de estadía");
    }
    }
    while(duracionEstadia < 1);
    elegirCategoria();
    calcularPrecioEstadia();
    confirmarReserva();
}
else if(inicio == 2)
{
    verificarReserva();
}
else if(inicio == 3)
{
    cancelarReserva();
}
else if(inicio == 4)
{
    consultarLogReservas();
}
else
{
    alert("Por favor, eliga una opción del menú.");
    iniciarSimulador();
}
