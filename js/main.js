const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");

let mostrarCarrito = false;
const botonMostrarOcultar = document.createElement("button");
botonMostrarOcultar.innerText = "Mostrar Carrito";
botonMostrarOcultar.onclick = () => mostrarOcultarCarrito();

btnCarrito.appendChild(botonMostrarOcultar);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const productoAAgregar = productos.find(producto => producto.id === id);
    if (carrito.some(elemento => elemento.id === productoAAgregar.id)) {
        alert("Este producto ya está en tu carrito.");
    } else {
        carrito.push(productoAAgregar);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(elemento => elemento.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
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
        carrito.forEach(producto => crearCard(producto, "carrito"));
        botonMostrarOcultar.innerText = "Ocultar Carrito";
    } else {
        botonMostrarOcultar.innerText = "Mostrar Carrito";
    }
}

function actualizarCarrito() {
    divCarrito.innerHTML = "";
    carrito.forEach(producto => crearCard(producto, "carrito"));
}

productos.forEach(producto => crearCard(producto, "container"));
