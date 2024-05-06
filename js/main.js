alert("¡Bienvenido a nuestra tienda de Plata Fácil, te invitamos a conocer todos nuestros productos!");

const productos = [
    { id: 1, nombre: 'Polera', precio: 10000 },
    { id: 2, nombre: 'Polerón', precio: 25000 },
    { id: 3, nombre: 'Gorra', precio: 15000 },
    { id: 4, nombre: 'Short', precio: 15000 }
];

// Lista de productos
function mostrarProductos() {
    let mensaje = "Elige una prenda para agregar al carrito:\n";
    productos.forEach(producto => {
        mensaje += `${producto.id}-${producto.nombre} $${producto.precio}\n`;
    });
    mensaje += "Selecciona 0 para finalizar la compra";
    return mensaje;
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(item => item.id === idProducto);
    if (producto) {
        alert("Tu producto ha sido agregado correctamente.");
        const cantidad = parseInt(prompt("Ingrese la cantidad de este producto:"));
        if (!isNaN(cantidad) && cantidad > 0) {
            carrito.push({id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: cantidad});
        } else {
            alert("Cantidad inválida. Producto no agregado al carrito.");
        }
    } else {
        alert("Producto no encontrado. Por favor, selecciona otro.");
    }
}

function mostrarCarrito() {
    let mensaje = "Productos en tu carrito:\n";
    carrito.forEach(item => {
        mensaje += `${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}\n`;
    });
    alert(mensaje);
}

function calcularTotal() {
    let totalCompra = 0;
    carrito.forEach(item => {
        totalCompra += item.precio * item.cantidad;
    });
    return totalCompra;
}

let carrito = [];

let opcion;
while (opcion !== 0) {
    opcion = parseInt(prompt(mostrarProductos()));
    if (!isNaN(opcion) && opcion >= 1 && opcion <= productos.length) {
        agregarAlCarrito(opcion);
    } else if (opcion !== 0) {
        alert("Opción inválida. Por favor, selecciona un producto de la lista o 0 para finalizar la compra.");
    }
}

if (carrito.length > 0) {
    alert("Finalizar compra");
    const totalCompra = calcularTotal();
    alert(`Total de la compra: $${totalCompra}`);
} else {
    alert("Carrito vacío. No se realizó ninguna compra.");
}

