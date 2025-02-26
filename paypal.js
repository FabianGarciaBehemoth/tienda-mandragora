// Cargar el botón de PayPal cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: calcularTotalCarrito() // Obtiene el total del carrito dinámicamente
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Pago completado por " + details.payer.name.given_name);
                limpiarCarrito(); // Limpia el carrito después de pagar
            });
        },
        onError: function (err) {
            console.error("Error en el pago:", err);
            alert("Hubo un problema con el pago. Inténtalo de nuevo.");
        }
    }).render("#paypal-button-container");
});

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let total = 0;
    document.querySelectorAll(".cart-item-price").forEach(function (item) {
        total += parseFloat(item.innerText.replace("$", "").trim());
    });
    return total.toFixed(2); // Redondea a 2 decimales
}

// Función para vaciar el carrito después del pago
function limpiarCarrito() {
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-total").innerText = "Total: $0";
    document.getElementById("cart-count").innerText = "0";
}
