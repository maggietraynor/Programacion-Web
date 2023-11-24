// Variable para almacenar los productos en el carrito
let productosEnCarrito = [];

let dat = document.getElementById("enviarDatos");
dat.addEventListener("click", consultaEnviada);

function consultaEnviada(){
  alert("¡Gracias por enviar tu consulta! En la brevedad estaremos respondiendote vía mail.");
}

// Para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  // Buscar el producto en el carrito por su ID
  let producto = productosEnCarrito.find(function(item) {
    return item.id === idProducto;
  });

  // Si el producto no existe en el carrito, agregarlo con cantidad 1
  if (!producto) {
    productosEnCarrito.push({ id: idProducto, cantidad: 1 });
  } else {
    // Si el producto ya existe, incrementar la cantidad
    producto.cantidad++;
  }

  // Actualizar el carrito en la página
  actualizarCarrito();
  }

function quitarDelCarrito(idProducto) {
  // Buscar el producto en el carrito por su ID
  let indiceProducto = productosEnCarrito.findIndex(function(item) {
    return item.id === idProducto;
  });

  // Si el producto existe en el carrito, reducir la cantidad
  if (indiceProducto !== -1) {
    productosEnCarrito[indiceProducto].cantidad--;

    // Si el producto esta solo una vez, eliminar el producto del carrito
    if (productosEnCarrito[indiceProducto].cantidad === 0) {
      productosEnCarrito.splice(indiceProducto, 1);
    }
  }

  // Actualizar el carrito en la página
  actualizarCarrito();
  }
  

// Para actualizar el carrito en la página
function actualizarCarrito() {
    let elementoProductosEnCarrito = document.getElementById('productos-en-carrito');
    let precioTotal = 0;

    // Limpiar el contenido actual del carrito
    elementoProductosEnCarrito.innerHTML = '';

    // Recorrer los productos en el carrito y agregarlos al HTML
    productosEnCarrito.forEach(function(item) {
        let producto = obtenerProductoPorId(item.id);
        let precioProducto = calcularPrecioProducto(producto, item.cantidad);
        precioTotal += precioProducto;
    
        let li = document.createElement('li');
        li.textContent = producto.nombre + ' x ' + item.cantidad + ' - $' + precioProducto.toFixed(2);
        li.classList.add("elemento-Carrito")
    
        // Agrega un botón de eliminación al elemento li
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.setAttribute('data-id-producto', item.id);
        botonEliminar.classList.add("elemento-Eliminar")
        botonEliminar.addEventListener('click', function() {
        let idProducto = parseInt(this.getAttribute('data-id-producto'));
        quitarDelCarrito(idProducto);
        });

        li.appendChild(botonEliminar);
        elementoProductosEnCarrito.appendChild(li);
    });


    // Mostrar el precio total acumulado en el carrito
    let elementoTotal = document.createElement('ul');
    elementoTotal.textContent = 'Total: $' + precioTotal.toFixed(2);
    elementoProductosEnCarrito.appendChild(elementoTotal);
  }
  
// Función auxiliar para obtener un producto por su ID
function obtenerProductoPorId(idProducto) {
    let productos = [
      { id: 1, nombre: 'D25 - Pinot Noir', precio: 28050 },
      { id: 2, nombre: 'D25 - Cabernet Franc', precio: 31160 },
      { id: 3, nombre: 'D25 - Cabernet Sauvignon', precio: 30600 },
      { id: 4, nombre: 'D25 - Merlot', precio: 30600 },
      { id: 5, nombre: 'D25 - Syrah', precio: 30600 },
      { id: 6, nombre: 'D25 - Blend', precio: 30600 },
      { id: 7, nombre: 'D25 - Malbec', precio: 30600 },
      { id: 8, nombre: 'DP - Pinot Noir', precio: 55200 },
      { id: 9, nombre: 'DP - Cabernet Franc', precio: 60300 },
      { id: 10, nombre: 'DP - Cabernet Sauvignon', precio: 52200 },
      { id: 11, nombre: 'DP - Malbec', precio: 52200 },
      { id: 12, nombre: 'DP - Syrah', precio: 52200 },
      { id: 13, nombre: 'DP - Blend', precio: 52200 },
      { id: 14, nombre: 'D25 - Sauvignon Blanc', precio: 26400 },
      { id: 15, nombre: 'D25 - Chardonnay', precio: 26400 },
      { id: 16, nombre: 'DP - Chardonnay', precio: 33900 },
      { id: 17, nombre: 'DP - Viognier Late Harvest', precio: 44100 },
      { id: 18, nombre: 'PM - Blanc de Blancs', precio: 36300 },
      { id: 19, nombre: 'PM - Blanc de Noirs', precio: 36300 },
      { id: 20, nombre: 'PM - Chardonnay', precio: 36300 },
    ];
  
    return productos.find(function(producto) {
      return producto.id === idProducto;
    });
  }
  

// Función auxiliar para calcular el precio de un producto en función de su cantidad
function calcularPrecioProducto(producto, cantidad) {
  return producto.precio * cantidad;
}

function vaciarCarrito() {
    // Vaciar el arreglo de productos en el carrito
    productosEnCarrito = [];
  
    // Actualizar el carrito en la página
    actualizarCarrito();
}

function finalizarCompra() {
    // Verificar si el carrito está vacío
    if (productosEnCarrito.length === 0) {
      alert("El carrito está vacío");
      return; // Salir de la función sin continuar con la finalización de la compra
    }
      
    // Mostrar un mensaje al usuario
    alert("Su compra se ha realizado con éxito");
  
    // Vaciar el carrito
    vaciarCarrito();
  }