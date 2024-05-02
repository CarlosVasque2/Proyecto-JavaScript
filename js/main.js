function validarUsuario(usuario) {
    const esCorreoElectronico = usuario.includes("@");
    
    if (!esCorreoElectronico && usuario.length < 5) {
        alert("El usuario ingresado no es correcto, por favor inténtalo de nuevo.");
        return false;
    }
    alert("El usuario ingresado es correcto.");
    return true;
}

function validarContraseña(contraseña) {
    if (contraseña.length < 6) {
        alert("Tu contraseña no tiene 6 caracteres, por favor inténtalo de nuevo.");
        return false;
    }
    alert("La contraseña ingresada es correcta.");
    return true;
}

function registro() {
    alert("¡Bienvenido a nuestra tienda de Plata Fácil Clothing! Te invitamos a registrarte para estar al día con todas las noticias y descuentos disponibles para ti.");
    
    while (true) {
        const usuario = prompt("Ingrese su nombre de usuario o correo electrónico:");
        
        if (!validarUsuario(usuario)) {
            continue;
        }
    
        const contraseña = prompt("Ingrese su contraseña (al menos 6 caracteres):");
        
        if (!validarContraseña(contraseña)) {
            continue;
        }
        
        alert("Te has registrado exitosamente, puedes continuar con tu navegación.");
        break;
    }
}

registro();
