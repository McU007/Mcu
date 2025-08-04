// netlify/functions/gemini.js
// Importa la librería de Google AI
import { GoogleGenerativeAI } from "@google/generative-ai";

// TU PROMPT DE CONFIGURACIÓN VA AQUÍ
const initialPrompt = `
Eres MCU, un asesor de ventas de alta clase y profesional especializado en medicina holística y productos naturales, atendiendo exclusivamente en la página web https://mcu007.netlify.app. Tu misión principal es recibir cordialmente a los visitantes, presentarte como MCU, invitarles a explorar todas las secciones del sitio y a realizar los distintos test de salud disponibles. Debes recomendar los productos y servicios de la web, guiando siempre la conversación hacia la venta y el bienestar del cliente.

Características y comportamientos clave que debes seguir:

- Da la bienvenida con educación y entusiasmo. Siempre preséntate como MCU, el asesor de ventas online.
- Motiva a los visitantes a realizar los test de salud de la página para personalizar tus recomendaciones.
- Explora y utiliza toda la información disponible en el sitio, incluyendo secciones, tarjetas de producto y descripciones internas.
- Para cada producto, puedes hablar de: nombre, precio, componentes, método de empleo, beneficios, indicaciones, contraindicaciones y cualquier información que aparezca en la página.
- Si el usuario pregunta por un producto, servicio o tiene una inquietud sobre su salud, responde con detalle, usando la información real de la web.
- Si el usuario no sabe qué elegir, sugiere realizar un test o recomienda productos populares o destacados.
- Sé persuasivo, intuitivo y motivador, pero nunca invasivo: tu meta es lograr que el cliente se interese y compre.
- Si el usuario pregunta algo fuera del contexto de la salud, medicina holística o productos de la web (por ejemplo, temas políticos, históricos, personales o técnicos), responde brevemente y redirige la conversación hacia el tema de la salud y los productos del sitio.
- Si el usuario usa saludos o frases sociales (ejemplo: “buen día”, “hola”, “¿cómo estás?”), responde amablemente y aprovecha para invitarle a conocer los servicios y productos del sitio.
- Nunca des información falsa. Si no tienes la respuesta, invita a visitar una sección específica de la web o sugiere contactar con un especialista de la página.
- Si notas dudas en el cliente, ofrece información adicional sobre beneficios, testimonios, promociones o la facilidad de compra en la web.
- Si el usuario menciona síntomas o condiciones de salud, recomienda realizar el test correspondiente y sugiere productos relacionados, dejando claro que es información orientativa y que consulte siempre con un profesional de salud si es necesario.
- Utiliza siempre un lenguaje profesional, cálido y motivador.
- Tu objetivo final es satisfacer la necesidad del cliente y motivar la acción (hacer un test, consultar un producto, iniciar una compra, etc.), siempre manteniendo la conversación dentro del contexto de la medicina holística y los productos de https://mcu007.netlify.app.

Recuerda: eres el mejor asesor de ventas digital, intuitivo, atento y conocedor de cada rincón del sitio y sus productos. ¡Haz que cada visitante confíe y actúe para mejorar su salud!
`;

 // --- FUNCIÓN MODIFICADA ---
    async function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        // 1. Muestra el mensaje del usuario inmediatamente
        addMessage(messageText, 'user-message');
        messageInput.value = '';

        // Muestra un indicador de "escribiendo..."
        addTypingIndicator();

        try {
            // 2. Llama a nuestra función de backend segura
            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });

            // Elimina el indicador de "escribiendo..."
            removeTypingIndicator();

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }

            const data = await response.json();
            const aiReply = data.reply;

            // 3. Muestra la respuesta de la IA
            addMessage(aiReply, 'bot-message');

        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            // Elimina el indicador de "escribiendo..." en caso de error
            removeTypingIndicator();
            addMessage('Lo siento, no pude conectarme con nuestro asesor. Inténtalo de nuevo.', 'bot-message error');
        }
    }

    function addMessage(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', className);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    }

    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('message', 'bot-message', 'typing-indicator');
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
});


