let dat = document.getElementById("enviarDatos");
dat.addEventListener("click", consultaEnviada);

function consultaEnviada(){
  alert("¡Gracias por enviar tu consulta! En la brevedad estaremos respondiendote vía mail.");
}



let carrito = []; 


function obtenerProductoPorMarcador(marcador) {
  let productos = obtenerProductos();
  return productos.find((producto) => producto.marcador === marcador);
}


function obtenerProductos() {
  return [
    {marcador: 1, titulo: "D25 - Pinot Noir", precio: 28050},
    {marcador: 2, titulo: "D25 - Cabernet Franc", precio: 31160},
    {marcador: 3, titulo: "D25 - Cabernet Sauvignon", precio: 30600},
    {marcador: 4, titulo: "D25 - Merlot", precio: 30600},
    {marcador: 5, titulo: "D25 - Syrah", precio: 30600},
    {marcador: 6, titulo: "D25 - Blend", precio: 30600},
    {marcador: 7, titulo: "D25 - Malbec", precio: 30600},
    {marcador: 8, titulo: "DP - Pinot Noir", precio: 55200},
    {marcador: 9, titulo: "DP - Cabernet Franc", precio: 60300},
    {marcador: 10, titulo: "DP - Cabernet Sauvignon", precio: 52200},
    {marcador: 11, titulo: "DP - Malbec", precio: 52200},
    {marcador: 12, titulo: "DP - Syrah", precio: 52200},
    {marcador: 13, titulo: "DP - Blend", precio: 52200},
    {marcador: 14, titulo: "D25 - Sauvignon Blanc", precio: 26400},
    {marcador: 15, titulo: "D25 - Chardonnay", precio: 26400},
    {marcador: 16, titulo: "DP - Chardonnay", precio: 33900},
    {marcador: 17, titulo: "DP - Viognier Late Harvest", precio: 44100},
    {marcador: 18, titulo: "PM - Blanc de Blancs", precio: 36300},
    {marcador: 19, titulo: "PM - Blanc de Noirs", precio: 36300},
    {marcador: 20, titulo: "PM - Chardonnay", precio: 36300},
  ];
}


let botonesCarrito = document.querySelectorAll(".btn.btn-primary[marcador]");
botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", function () {
    let marcador = parseInt(this.getAttribute("marcador"));
    aniadirAlCarrito(marcador);
  });
});


function aniadirAlCarrito(marcador) {
  let producto = obtenerProductoPorMarcador(marcador);
  let productoExistente = carrito.find((item) => item.marcador === marcador);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarCarrito();
}


function mostrarCarrito() {
  let carritoElement = document.getElementById("compras");
  carritoElement.innerHTML = "";

  let subtotal = 0;

  if (carrito.length === 0) {
    carritoElement.innerHTML = "<p>No hay productos en el carrito.</p>";
  } else {
    carrito.forEach((producto) => {
      const compraElement = document.createElement("div");
      compraElement.classList.add("compra");

      const tituloElement = document.createElement("p");
      tituloElement.classList.add("titulo");
      tituloElement.textContent = `${producto.titulo} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`;
      compraElement.appendChild(tituloElement);

      const eliminarElement = document.createElement("span");
      eliminarElement.classList.add("eliminar");
      eliminarElement.textContent = "x";
      eliminarElement.addEventListener("click", () => eliminarDelCarrito(producto.marcador));
      compraElement.appendChild(eliminarElement);

      carritoElement.appendChild(compraElement);

      subtotal += producto.precio * producto.cantidad;
    });
  }

  let subtotalElement = document.getElementById("subtotalcompra");
  subtotalElement.textContent = `Subtotal: $${subtotal}`;

  const mensajeExito = document.getElementById("mensajeExito");
  if (carrito.length > 0) {
    mensajeExito.style.display = "none";
  }
}


function eliminarDelCarrito(marcador) {
  carrito = carrito.filter((item) => item.marcador !== marcador);
  mostrarCarrito();
}


function finalizarCompra() {
  if (carrito.length === 0) {
    alert("No hay items en el carrito.");
    return;
  }

  var modalCompra = new bootstrap.Modal(document.getElementById("modalCompra"));
  modalCompra.show();
}


function reiniciarCarrito() {
  carrito = []; 
  mostrarCarrito(); 
  const mensajeExito = document.getElementById("mensajeExito");
  mensajeExito.style.display = "none";
}

function completarCompra() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var edad = document.getElementById("edad").value;
  var numeroTarjeta = document.getElementById("numeroTarjeta").value;

  if (nombre.trim() === "" || apellido.trim() === "" || isNaN(edad) || numeroTarjeta.length !== 16) {
    alert("Por favor, complete todos los campos correctamente.");
    return;
  }

  if (parseInt(edad) < 18) {
    alert("Debe ser mayor de 18 años para realizar la compra.");
    return;
  }

  var modalCompra = new bootstrap.Modal(document.getElementById("modalCompra"));
  modalCompra.hide();

  alert("Su compra se ha realizado con éxito.");

  reiniciarCarrito();
}

var botonVaciarCarrito = document.querySelector(".vaciar-carrito");
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}









