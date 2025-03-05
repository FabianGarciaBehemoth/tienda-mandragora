// Cargar el botón de PayPal cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
    paypal.Buttons({
        createOrder: function (data, actions) {
            let totalCOP = calcularTotalCarrito(); // Calcular total correctamente
            let totalUSD = convertirCOPaUSD(totalCOP); // Convertimos COP a USD

            console.log("Total en COP:", totalCOP);
            console.log("Total convertido a USD:", totalUSD);

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD", // Cambiamos a dólares
                        value: totalUSD
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Pago completado por " + details.payer.name.given_name);
                limpiarCarrito();
            });
        },
        onError: function (err) {
            console.error("Error en el pago:", err);
            alert("Hubo un problema con el pago. Inténtalo de nuevo.");
        }
    }).render("#paypal-button-container");
});

// Función corregida para calcular el total del carrito usando el array carrito
function calcularTotalCarrito() {
    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    console.log("Total calculado en COP:", total);
    return total > 0 ? total : 1; // Evita valores en 0
}

// Función para convertir COP a USD (Tasa de cambio aproximada)
function convertirCOPaUSD(cop) {
    let tasaCambio = 4123.10; // Puedes cambiarla según la tasa real
    return (cop / tasaCambio).toFixed(2);
}

// Función para vaciar el carrito después del pago
function limpiarCarrito() {
    carrito = []; // Vacía el array de productos
    actualizarCarrito(); // Actualiza la interfaz
}

