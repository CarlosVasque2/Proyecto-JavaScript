const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");
const categoryFilter = document.getElementById("category-filter");
const checkoutButton = document.getElementById("checkout-button");

let mostrarCarrito = false;
const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.innerText = "Mostrar Carrito";
botonMostrarOcultar.onclick = () => mostrarOcultarCarrito();

btnCarrito.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoAAgregar = productos.find(producto => producto.id === id);
    const productoEnCarrito = carrito.find(elemento => elemento.id === productoAAgregar.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        productoAAgregar.cantidad = 1;
        carrito.push(productoAAgregar);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    // SweetAlert for adding product
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${productoAAgregar.nombre} ha sido agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false
    });
}

function quitarDelCarrito(id) {
    const productoEnCarrito = carrito.find(elemento => elemento.id === id);
    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad -= 1;
    } else {
        carrito = carrito.filter(elemento => elemento.id !== id);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    // SweetAlert for removing product
    Swal.fire({
        icon: 'warning',
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito.',
        timer: 1500,
        showConfirmButton: false
    });
}

function crearCard(producto, contenedor) {
    const card = document.createElement("div");
    card.className = producto.stock ? "card" : "no-card";

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.className = "imagen-producto";

    const titulo = document.createElement("p");
    titulo.innerText = producto.nombre;
    titulo.className = "nombre-producto";

    const precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;
    precio.className = "precio-producto";

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = contenedor === "container" ? "Agregar al Carrito" : "Quitar del Carrito";
    botonAgregar.className = "btn-add";
    botonAgregar.onclick = () => contenedor === "container" ? agregarAlCarrito(producto.id) : quitarDelCarrito(producto.id);

    card.appendChild(imagen);
    card.appendChild(titulo);
    card.appendChild(precio);
    card.appendChild(botonAgregar);

    const nuevoContenedor = document.getElementById(contenedor);
    nuevoContenedor.appendChild(card);
}

function mostrarOcultarCarrito() {
    mostrarCarrito = !mostrarCarrito;
    divCarrito.innerHTML = "";
    if (mostrarCarrito) {
        carrito.forEach(producto => crearCarritoItem(producto));
        botonMostrarOcultar.innerText = "Ocultar Carrito";
    } else {
        botonMostrarOcultar.innerText = "Mostrar Carrito";
    }
}

function actualizarCarrito() {
    divCarrito.innerHTML = "";
    carrito.forEach(producto => crearCarritoItem(producto));
    actualizarTotalCarrito();
}

function crearCarritoItem(producto) {
    const item = document.createElement("div");
    item.className = "carrito-item";

    const nombre = document.createElement("p");
    nombre.innerText = producto.nombre;
    nombre.className = "nombre-producto";

    const cantidad = document.createElement("p");
    cantidad.innerText = `Cantidad: ${producto.cantidad}`;
    cantidad.className = "cantidad-producto";

    const precioTotal = document.createElement("p");
    precioTotal.innerText = `Total: $${producto.precio * producto.cantidad}`;
    precioTotal.className = "precio-total-producto";

    const botonQuitar = document.createElement("button");
    botonQuitar.innerText = "Quitar";
    botonQuitar.className = "btn-remove";
    botonQuitar.onclick = () => quitarDelCarrito(producto.id);

    item.appendChild(nombre);
    item.appendChild(cantidad);
    item.appendChild(precioTotal);
    item.appendChild(botonQuitar);

    divCarrito.appendChild(item);
}

function actualizarTotalCarrito() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    const totalDiv = document.getElementById("total-carrito");
    if (totalDiv) {
        totalDiv.innerText = `Total: $${total}`;
    } else {
        const nuevoTotalDiv = document.createElement("div");
        nuevoTotalDiv.id = "total-carrito";
        nuevoTotalDiv.innerText = `Total: $${total}`;
        divCarrito.appendChild(nuevoTotalDiv);
    }
}

function filtrarProductos() {
    const categoriaSeleccionada = categoryFilter.value;
    container.innerHTML = "";
    const productosFiltrados = categoriaSeleccionada === "all" ? productos : productos.filter(producto => producto.categoria === categoriaSeleccionada);
    productosFiltrados.forEach(producto => crearCard(producto, "container"));
}

categoryFilter.addEventListener("change", filtrarProductos);

checkoutButton.addEventListener("click", () => {
    // SweetAlert for checkout
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: 'Ha finalizado su compra, muchas gracias.',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });
});

productos.forEach(producto => crearCard(producto, "container"));
actualizarCarrito();
filtrarProductos();

fetch("./js/data.json")
.then(response => response.json())
.then(data => console.log(data))
