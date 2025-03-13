document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("whatsappChat");
    const chatBody = document.getElementById("chatBody");

    // Alternar el chat
    window.toggleChat = function () {
        chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "block" : "none";
    };

    // Manejar tecla Enter
    window.handleKeyPress = function (event, inputId, nextQuestion, nextInputId) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita el salto de línea en textarea
            if (inputId === "message") {
                sendMessage(); // Si es el último campo, envía directamente
            } else {
                sendResponse(inputId, nextQuestion, nextInputId);
            }
        }
    };

    // Enviar respuesta y mostrar siguiente pregunta
    window.sendResponse = function (inputId, nextQuestion, nextInputId) {
        let inputField = document.getElementById(inputId);
        let userResponse = inputField.value.trim();
        if (userResponse === "" || inputField.dataset.sent) return; // Evita respuestas vacías o repetidas

        inputField.dataset.sent = "true";

        let inputContainer = inputField.parentElement;

        let userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = userResponse;
        
        inputContainer.after(userMessage);
        inputContainer.classList.add("hidden");

        let nextQuestionElem = document.getElementById(nextInputId + "Question");
        if (nextQuestionElem) {
            nextQuestionElem.textContent = nextQuestion;
            nextQuestionElem.classList.remove("hidden");
        }

        let nextInputContainer = document.getElementById(nextInputId + "Container");
        if (nextInputContainer) {
            nextInputContainer.classList.remove("hidden");

            let nextInput = nextInputContainer.querySelector("input, textarea");
            if (nextInput) {
                nextInput.focus();
            }
        }

        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Enviar mensaje final y redirigir a WhatsApp
    window.sendMessage = function () {
        let name = document.getElementById("name").value.trim();
        let city = document.getElementById("city").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || city === "" || phone === "" || message === "") {
            alert("Por favor, completa todos los campos antes de enviar el mensaje.");
            return;
        }

        let whatsappMessage = `Hola, mi nombre es ${name} de ${city}. Mi número de contacto es ${phone}. Quiero preguntar: ${message}`;
        let encodedMessage = encodeURIComponent(whatsappMessage);
        let whatsappNumber = "3118784747"; // Número de WhatsApp
        let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Ocultar el input y mostrar mensaje en chat antes de redirigir
        let messageContainer = document.getElementById("messageContainer");
        let userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = message;
        messageContainer.after(userMessage);
        messageContainer.classList.add("hidden");

        window.open(whatsappURL, "_blank");
    };
});
