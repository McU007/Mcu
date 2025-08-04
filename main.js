// Global variables
let cart = JSON.parse(localStorage.getItem("naturalUrologyCart")) || [];
let products = {
    gomitas: [],
    capsulas: [],
    suplementos: [],
};

// Ejemplos de personalización directa en el código fuente
// Para modificar productos, edita directamente los arrays de products en initializeProducts()

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    initializeProducts();
    updateCartDisplay();
    loadCartFromStorage();

// =================================================================
// =============== SECCIÓN DE LÓGICA DEL CHATBOT MCU ===============
// =================================================================

// --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
// Guardamos en constantes los elementos HTML con los que vamos a interactuar.
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotContainer = document.getElementById("chatbot-container");
const closeChatbotButton = document.getElementById("close-chatbot");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatWindow = document.getElementById("chat-window");

// La ruta a nuestra función de backend en Netlify.
// AJUSTE: La ruta debe coincidir con el nombre del archivo (gemini-chat.js -> /gemini-chat).
const apiEndpoint = "/.netlify/functions/gemini";

// --- 2. MANEJO DE EVENTOS PARA ABRIR Y CERRAR EL CHAT ---

// Evento: Al hacer clic en el ícono, se muestra el contenedor del chat.
if (chatbotIcon && chatbotContainer) {
    chatbotIcon.addEventListener("click", () => {
        chatbotContainer.classList.remove("hidden");
    });
}

// Evento: Al hacer clic en el botón de cerrar, se oculta el contenedor del chat.
if (closeChatbotButton && chatbotContainer) {
    closeChatbotButton.addEventListener("click", () => {
        chatbotContainer.classList.add("hidden");
    });
}

// --- 3. LÓGICA PRINCIPAL PARA ENVIAR Y RECIBIR MENSAJES ---

// Evento: Se activa cuando el usuario envía el formulario (presiona Enter o el botón de enviar).
if (chatForm && messageInput && chatWindow) {
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Previene que la página se recargue.

        const userMessage = messageInput.value.trim();
        if (!userMessage) return; // No hace nada si el mensaje está vacío.

        // Muestra el mensaje del usuario en la ventana del chat.
        addMessageToWindow(userMessage, "user-message");
        messageInput.value = ""; // Limpia el campo de entrada.

        // Muestra el indicador "Escribiendo..." mientras espera la respuesta.
        const loadingIndicator = addMessageToWindow(
            "Escribiendo...",
            "loading",
        );

        // Bloque try...catch para manejar posibles errores de conexión.
        try {
            // Llama a nuestra función de backend (Netlify Function).
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // AJUSTE: Enviamos el dato como "message", que es lo que el backend espera.
                body: JSON.stringify({ message: userMessage }),
            });

            // Si la respuesta del servidor no es exitosa (ej: error 500), lanza una excepción.
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }

            // Procesa la respuesta JSON del bot.
            const data = await response.json();

            // Quita el indicador "Escribiendo...".
            chatWindow.removeChild(loadingIndicator);

            // Muestra el mensaje de respuesta del bot en el chat.
            addMessageToWindow(data.reply, "bot-message");

        } catch (error) {
            // Si ocurre cualquier error en el bloque 'try', se ejecuta esto.
            console.error("Error al contactar la API:", error);

            // Quita el indicador "Escribiendo...".
            if (loadingIndicator && chatWindow.contains(loadingIndicator)) {
                chatWindow.removeChild(loadingIndicator);
            }

            // Muestra un mensaje de error claro al usuario en el chat.
            addMessageToWindow(
                "Lo siento, algo salió mal. Por favor, inténtalo de nuevo más tarde.",
                "bot-message-error",
            );
        }
    });

    // --- 4. FUNCIÓN AUXILIAR PARA AÑADIR MENSAJES AL CHAT ---
    // 'message': Es el texto del mensaje a mostrar.
    // 'className': Es la clase CSS para darle estilo (diferenciar usuario de bot).
    function addMessageToWindow(message, className) {
        const messageElement = document.createElement("div");
        // Separar las clases si contienen espacios
        const classes = className.split(' ');
        messageElement.classList.add("message", ...classes);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);

        // Asegura que la ventana del chat siempre muestre el último mensaje.
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageElement;
    }
});

// Initialize products with sample data
function initializeProducts() {
    // EJEMPLO 1 GOMITAS: Modificar descripción y precio
    products.gomitas.push({
        id: "1#",
        name: "Gomita Omega 3 6 9 dha epa ara colina Potasio",
        price: 49, // EJEMPLO: precio modificado
        image: "https://i.imgur.com/Py8azRO.png",
        description:
            "Gomitas Nutricionales Omega 3-6-9 con DHA, EPA, ARA, Colina y Potasio 🍬 ¡La Mejor Forma de Nutrirte con Sabor!.", // EJEMPLO: descripción personalizada
        category: "gomitas",
    });

    // EJEMPLO 2 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "2#",
        name: "Gomitas Multivitamínicas 3-6-9-12",
        price: 49,
        image: "https://i.imgur.com/0HZuzIP.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "Gomitas Multivitamínicas 3-6-9-12 🍊 ¡Vitaminas Esenciales en Deliciosas Gomitas!",
        category: "gomitas",
    });
	
	// EJEMPLO 3 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "3#",
        name: "Gomitas de Colágeno Hidrolizado + Vitaminas",
        price: 49,
        image: "https://i.imgur.com/D9cY43C.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "Gomitas de Colágeno Hidrolizado + Vitaminas 💖 ¡Tu ritual diario de belleza en formato delicioso! 💖",
        category: "gomitas",
    });
	
		// EJEMPLO 4 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "4#",
        name: "Gomitas Antiinflamatorias de Cúrcuma ",
        price: 49,
        image: "https://i.imgur.com/SvBB6Uk.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "Gomitas Antiinflamatorias de Cúrcuma 🌟 ¡Alivio Natural en Cada Gomita!",
        category: "gomitas",
    });

		// EJEMPLO 5 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "5#",
        name: "Gomitas Energéticas de Hierro + Moringa & Vitamina C",
        price: 49,
        image: "https://i.imgur.com/QmSdfUK.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "Gomitas Energéticas de Hierro + Moringa & Vitamina C ¡Combate la Anemia con Sabor!",
        category: "gomitas",
    });
	
	// EJEMPLO 6 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "6#",
        name: "Gomitas de Própolis Premium para Adultos  ¡Defensas Naturales en Cada Gomita!",
        price: 49,
        image: "https://i.imgur.com/36zZBkW.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "usar Adultos con sistema inmunológico débil  Fumadores o personas con irritación faríngea frecuente ",
        category: "gomitas",
    });
	
	// EJEMPLO 7 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "7#",
        name: "Gomitas de Própolis para Niños  ¡Protección Deliciosa para los Pequeños!",
        price: 49,
        image: "https://i.imgur.com/REjF1Hd.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "Gomitas Energéticas de Hierro + Moringa & Vitamina C ¡Combate la Anemia con Sabor!",
        category: "gomitas",
    });
	
	// EJEMPLO 8 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "8#",
        name: "Gomitas Relajantes de Valeriana ¡Descanso Natural en Cada Gomita!",
        price: 49,
        image: "https://i.imgur.com/w8AokCO.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "🌙 ¡El descanso que mereces, en la forma más deliciosa! 🌙",
        category: "gomitas",
    });
	
	// EJEMPLO 9 GOMITAS: Usar imagen de Imgur
    products.gomitas.push({
        id: "9#",
        name: "Gomitas Inmuno-Energéticas con Zinc, Magnesio, Betaglucano, Vitamina C y Selenio!",
        price: 49,
        image: "https://i.imgur.com/Ccvj8wt.png", // EJEMPLO: imagen de Imgur (puedes usar .jpg, .png, .gif)
        description:
            "⚡ ¡Energía y Defensas en Cada Gomita!",
        category: "gomitas",
    });
	
	
	
    // Resto de gomitas (generadas automáticamente)
    for (let i = 1; i <= 1; i++) {
        products.gomitas.push({
            id: `gomita-${i}`,
            name: `Gomita Prostática Natural ${i}`,
            price: 49,
            image: `🍬`,
            description: `Deliciosa gomita natural ${i} elaborada con ingredientes 100% naturales específicamente formulada para la salud prostática. Contiene extractos de saw palmetto, zinc y licopeno para el bienestar del sistema urológico.`,
            category: "gomitas",
        });
    }

    // EJEMPLO 1 CÁPSULAS: Producto premium con precio y descripción personalizada
    products.capsulas.push({
        id: "c1",
        name: "ErectMax Maxx - Potenciador Masculino en Cápsulas💪 ¡Máximo Desempeño y Vitalidad Masculina!",
        price: 59, // EJEMPLO: precio premium
        image: "https://i.imgur.com/pcLMm5r.png",
        description:
            "🚀 ¡Potencia tu energía íntima de forma natural y deliciosa! 🚀.", // EJEMPLO: descripción detallada
        category: "capsulas",
    });

    // EJEMPLO 2 CÁPSULAS: Con imagen personalizada de Imgur
    products.capsulas.push({
        id: "c2",
        name: "BioProst - Soporte Prostático Integral ¡Salud Prostática Natural en Cada Cápsula!",
        price: 49,
        image: "https://i.imgur.com/uYo7NaV.png", // EJEMPLO: imagen de Imgur
        description:
            "🛡️ ¡Cuida tu salud prostática de manera natural con BioProst ! 🛡️",
        category: "capsulas",
    });

// EJEMPLO 3 CÁPSULAS: Con imagen personalizada de Imgur
    products.capsulas.push({
        id: "c3",
        name: "Te Verde- Antioxidante Premium🍃 ¡Poder Antioxidante en Cada Cápsula!",
        price: 49,
        image: "https://i.imgur.com/L6PDL6n.png", // EJEMPLO: imagen de Imgur
        description:
            "🌱 ¡Tu dosis diaria de salud en estado puro con Te Verde! 🌱",
        category: "capsulas",
    });
	
	// EJEMPLO 4 CÁPSULAS: Con imagen personalizada de Imgur
    products.capsulas.push({
        id: "c4",
        name: "Aguaje  Belleza Femenina Natural🌸 ¡Potenciador Hormonal 100% Natural!",
        price: 49,
        image: "https://i.imgur.com/D9mD7DB.png", // EJEMPLO: imagen de Imgur
        description:
            "🌺 ¡Descubre el poder de la feminidad natural con Aguaje! 🌺",
        category: "capsulas",
    });
	
	  products.capsulas.push({
        id: "c5",
        name: "Citrato de Magnesio - Relajación Muscular y Nerviosa🌀 ¡Equilibrio Natural para Cuerpo y Mente!",
        price: 49,
        image: "https://i.imgur.com/FWrtLRX.png", // EJEMPLO: imagen de Imgur
        description:
            "⚡ ¡Recupera tu equilibrio natural con Citrato de Magnesio! ⚡",
        category: "capsulas",
    });
	
	 products.capsulas.push({
        id: "c6",
        name: "Alfa Maxx - Potenciador Masculino Premium🔥 ¡Máximo Desempeño y Vitalidad!",
        price: 49,
        image: "https://i.imgur.com/vTddhnl.png", // EJEMPLO: imagen de Imgur
        description:
            "🚀 ¡Descubre tu máximo potencial con Alfa Maxx! 🚀",
        category: "capsulas",
    });
	
	 products.capsulas.push({
        id: "c7",
        name: "Chupa Panza - Reductor y Quemagrasas Natural ¡Adiós Grasa Localizada, Hola Figura Esbelta!",
        price: 49,
        image: "https://i.imgur.com/mcYspYv.png", // EJEMPLO: imagen de Imgur
        description:
            "⚡ ¡Transforma tu cuerpo de forma natural con Chupa Panza ! ⚡",
        category: "capsulas",
    });
	
		 products.capsulas.push({
        id: "c8",
        name: "Fenogreco - Potenciador Natural de Salud ¡Energía, Metabolismo y Bienestar en Cada Cápsula!",
        price: 49,
        image: "https://i.imgur.com/Fvyor5I.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Descubre el poder milenario del fenogreco con Fenogreco! ✨",
        category: "capsulas",
    });
	
		 products.capsulas.push({
        id: "c9",
        name: "Tocosh- Probiótico Andino Premium¡Salud Digestiva y Refuerzo Inmunológico Ancestral!",
        price: 49,
        image: "https://i.imgur.com/SVvq1TL.png", // EJEMPLO: imagen de Imgur
        description:
            "🍃 ¡La sabiduría medicinal de los Andes en tu suplemento diario! 🍃",
        category: "capsulas",
    });
	
		 products.capsulas.push({
        id: "c10",
        name: "Moring Natural Medix - Superalimento Detox ¡Desintoxicación y Nutrición en Cada Cápsula!",
        price: 49,
        image: "https://i.imgur.com/XjxJNdD.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Nutrición pura y desintoxicación inteligente con Moring Natural ! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c11",
        name: "Aguaje + Inojo + Maca Triple 🌸 ¡Potenciador Femenino Integral!",
        price: 49,
        image: "https://i.imgur.com/8hp93K2.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Potencia tu esencia femenina con esta fórmula exclusiva! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c12",
        name: "Vigoron Maxx - Potenciador de Energía y Vitalidad ¡Máximo Rendimiento Físico y Mental!",
        price: 49,
        image: "https://i.imgur.com/0PadOJ9.png", // EJEMPLO: imagen de Imgur
        description:
            "Vigoron Maxx - Potenciador de Energía y Vitalidad ¡Máximo Rendimiento Físico y Mental!",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c13",
        name: "Omega Triple ¡Potencia tu mente y corazón!",
        price: 49,
        image: "https://i.imgur.com/TKaXBZN.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ Omega Triple - Funcionamiento Avanzado Cómo Actúa Esta Fórmula Potente ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({ 
        id: "c14",
        name: "!Hierro + Calcio + B12 ¡Triple Acción Nutricional!",
        price: 49,
        image: "https://i.imgur.com/yZ7Owg6.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ La sinergia perfecta para tu bienestar integral ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c15",
        name: "!HierroCalcio B12 Plus 🩸💊 ¡Fórmula Completa para Tu Bienestar",
        price: 49,
        image: "https://i.imgur.com/fppSMAz.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ Tu dosis diaria de energía y claridad mental✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c16",
        name: "GlucoBalance Plus ¡Control Integral para Tu Salud Metabólica!",
        price: 49,
        image: "https://i.imgur.com/uQj68Jf.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ El equilibrio inteligente para tu bienestar integral !! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c17",
        name: "Gastrizan Forte🩹 ¡Alivio Integral para Tu Sistema Digestivo!!",
        price: 49,
        image: "https://i.imgur.com/G7HThAX.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Salud digestiva desde la primera toma! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c18",
        name: "FitoHorm Plus¡ Balance Natural para Mujeres Inteligentes!",
        price: 49,
        image: "https://i.imgur.com/sx1JhBh.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡La sabiduría de la naturaleza para tu equilibrio hormonal! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c19",
        name: "FlexiJoint Pro 🦴 ¡Regeneración Articular Completa!!",
        price: 49,
        image: "https://i.imgur.com/S3dlPET.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Movilidad sin límites a cualquier edad! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c20",
        name: "HepatoDetox Ultra ¡Desintoxicación Hepática Profunda!!",
        price: 49,
        image: "https://i.imgur.com/qgUDB36.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El escudo natural que tu hígado necesita! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c21",
        name: "Spirulina Pure+🌱 ¡Superalimento Detox y Energético!",
        price: 49,
        image: "https://i.imgur.com/Nj7yx15.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ Nutrición concentrada de la naturaleza Ideal para veganos, deportistas y personas con déficit nutricional. ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c22",
        name: "EnergiMax B+D Complex ¡Combustible Natural para Cuerpo y Mente!",
        price: 49,
        image: "https://i.imgur.com/qEKTdul.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El multivitamínico inteligente para tu vida activa! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c23",
        name: "RenalClean Forte🌿 ¡Protección Renal Natural!",
        price: 49,
        image: "https://i.imgur.com/ma0KeR1.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ El aliado natural de tu sistema urinario ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c24",
        name: "GlucoControl Plus🩸 ¡Control Inteligente del Azúcar!!",
        price: 49,
        image: "https://i.imgur.com/QBwg3aF.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El enfoque natural para un metabolismo equilibrado! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c25",
        name: "D3 Vital Max☀️ ¡Vitamina Solar en su Máxima Potencia!",
        price: 49,
        image: "https://i.imgur.com/wQXXyBc.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡La esencia del sol en cada cápsula! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c26",
        name: "C-Vital Complex ¡Defensas de Acero con Antioxidante Potente!",
        price: 49,
        image: "https://i.imgur.com/yiIUVBf.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡La vitamina C como la naturaleza la diseñó! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c27",
        name: "Centella Pure+ ¡Regeneración Celular Premium!",
        price: 49,
        image: "https://i.imgur.com/w1RNnQd.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El secreto asiático para una piel y mente jóvenes! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c28",
        name: "VenoForte Pro ¡Solución Natural para Piernas Ligeras!!",
        price: 49,
        image: "https://i.imgur.com/fuorVen.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Bienestar circulatorio desde la primera semana! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c29",
        name: "D3 Ultra Active ¡Poder Solar en Cada Cápsula!!",
        price: 49,
        image: "https://i.imgur.com/Sa578cB.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡La deficiencia de vitamina D termina hoy! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c30",
        name: "Magnesium Ultra+¡Relajación Muscular y Nerviosa Profunda!!",
        price: 49,
        image: "https://i.imgur.com/GYKe7Hi.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c31",
        name: "GynoCare Complex🌸 ¡Salud Femenina! Cuidado inteligente para tu bienestar ginecológico",
        price: 49,
        image: "https://i.imgur.com/ELxjUz3.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡Cuidado inteligente para tu bienestar ginecológico! ✨",
        category: "capsulas",
    });
	
	
			 products.capsulas.push({
        id: "c32",
        name: "Curcuma Gold Complex ¡Antiinflamatorio Natural de Máxima Potencia!!",
        price: 49,
        image: "https://i.imgur.com/mrM1WqP.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c33",
        name: "CalMagZn+D Premium🦴 ¡Fórmula Completa para Huesos Fuertes!!",
        price: 49,
        image: "https://i.imgur.com/LLUeKZV.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c34",
        name: "Uña de Gato Forte El secreto inmunológico de la selva peruana!",
        price: 49,
        image: "https://i.imgur.com/TDlMM9l.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c35",
        name: "CardoMariano Plus El guardián natural de tu hígado",
        price: 49,
        image: "https://i.imgur.com/Tytc1yu.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c36",
        name: "BioProst Peruviano🌿 ¡Salud Prostática 100% Natural!",
        price: 49,
        image: "https://i.imgur.com/fKGoM4t.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c37",
        name: "ColonPure Pro, Solución completa para tu comodidad intestinal",
        price: 49,
        image: "https://i.imgur.com/GjVC9YV.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c38",
        name: "CicloFem Balance, Armonía menstrual en cada ciclo",
        price: 49,
        image: "https://i.imgur.com/igMh4gA.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c39",
        name: "Colágeno Hidrolizado Premium, El secreto para una juventud prolongada",
        price: 49,
        image: "https://i.imgur.com/pMUeyay.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c40",
        name: "FlexiColageno 🦵 ¡Soporte Articular Completo!",
        price: 49,
        image: "https://i.imgur.com/Gr4875z.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c41",
        name: "Saw Palmetto Ultra, El aliado natural de tu próstata después de los 40",
        price: 49,
        image: "https://i.imgur.com/LKAOmrB.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c42",
        name: "Biotina Hair & Nails 💖 ¡La fórmula definitiva para un cabello de ensueño y uñas fuertes! 💖",
        price: 49,
        image: "https://i.imgur.com/lCxXrKu.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c43",
        name: "HepaDetox Ultra higado graso ¡Regeneración Hepática Avanzada,  para tu salud hepática!",
        price: 49,
        image: "https://i.imgur.com/apK9Mrp.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c44",
        name: "Melatonina Ultra+, El descanso que tu cuerpo merece",
        price: 49,
        image: "https://i.imgur.com/xBMUggB.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c45",
        name: "StemBiotin Renewal, Celulas madres+biotina La ciencia de la juventud en una fórmula",
        price: 49,
        image: "https://i.imgur.com/60peIsC.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c46",
        name: "Brewer's Gold+ Levadura de Cerveza El multivitamínico que la naturaleza te diseñó",
        price: 49,
        image: "https://i.imgur.com/wThCyy1.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c47",
        name: "NAD+ Elite Renewal ¡Antienvejecimiento Celular Premium!",
        price: 49,
        image: "https://i.imgur.com/FbD8ory.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c48",
        name: "NAD+ 1500mg 🧬 ¡Regeneración Celular Avanzada!",
        price: 49,
        image: "https://i.imgur.com/lAYKg7O.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c49",
        name: "Resveratrol Ultra+ 1500mg✨ ¡Antioxidante Premium para Longevidad!",
        price: 49,
        image: "https://i.imgur.com/J2c4hLD.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c50",
        name: "NAD+ Resveratrol Elite, La combinación más avanzada para la longevidad celular",
        price: 49,
        image: "https://i.imgur.com/aCi8mjK.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c51",
        name: "Ashwagandha Pura 500mg ¡Adaptógeno Clínico para Estrés y Energía!",
        price: 49,
        image: "https://i.imgur.com/88LxZhe.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c52",
        name: "Ashwagandha Forte 600mg ¡Potenciador de Energía y Resistencia Natural!",
        price: 49,
        image: "https://i.imgur.com/0Wy1fAG.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c53",
        name: "Ácido Hialurónico Ultra+💧 ¡Hidratación Profunda y Antiedad!",
        price: 49,
        image: "https://i.imgur.com/isEX2YJ.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c54",
        name: "Shilajit Premiums ¡Energía Ancestral de los Andes!",
        price: 49,
        image: "https://i.imgur.com/1S6CIJ5.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c55",
        name: "Magnesium L-Threonate Premium🧠 ¡Potenciador Cerebral de Última Generación!",
        price: 49,
        image: "https://i.imgur.com/cL4K2PH.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c56",
        name: "Citrato de Magnesio Puro ¡Relajación Muscular y Nerviosa!",
        price: 49,
        image: "https://i.imgur.com/KkSQqin.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c57",
        name: "Magnesio + Potasio Dual ¡Equilibrio Electrolítico Premium!",
        price: 49,
        image: "https://i.imgur.com/1915WhN.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c58",
        name: "Magnesio Dual Avanzado ¡Doble Formulación para Máximo Beneficio!",
        price: 49,
        image: "https://i.imgur.com/uYLHjhR.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c59",
        name: "Melena de León Neuro, El aliado natural de tu cerebro",
        price: 49,
        image: "https://i.imgur.com/lcy3Yj2.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c60",
        name: "L-Arginina Ultra+❤️ ¡Potencia Tu Circulación y Energía!",
        price: 49,
        image: "https://i.imgur.com/2cjHplg.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c61",
        name: "Spirulina Azul Premium, el poder del océano en tu suplemento diario",
        price: 49,
        image: "https://i.imgur.com/290VT7K.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c62",
        name: "🛡️ ¡Colostrum Bovino Premium, Refuerzo Inmunológico Natural!",
        price: 49,
        image: "https://i.imgur.com/67yqkeP.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c63",
        name: "🏔️Shilajit Premium, El secreto energético de las montañas",
        price: 49,
        image: "https://i.imgur.com/vTK0JRT.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c64",
        name: "Magnesio Malato Premium, El magnesio inteligente para tu energía celular",
        price: 49,
        image: "https://i.imgur.com/Ailn6yG.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c65",
        name: "CoQ10 Ultra 250mg El combustible esencial para tu corazón y células",
        price: 49,
        image: "https://i.imgur.com/YjuUH5z.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c66",
        name: "Citrato de Potasio Puro, el mineral esencial para músculos y nervios",
        price: 49,
        image: "https://i.imgur.com/JI3xXzX.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c67",
        name: "✔ Berberina Ultra+, el aliado natural para el equilibrio glucémico",
        price: 49,
        image: "https://i.imgur.com/U5gQlUC.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c68",
        name: "Vitamina K2 + D3 Premium, La sinergia inteligente para tu salud ósea y cardiovascular",
        price: 49,
        image: "https://i.imgur.com/Iy2ODxS.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
			 products.capsulas.push({
        id: "c69",
        name: "Carbonato de Magnesio Puro ¡Alcalinizante y Digestivo Natural!",
        price: 49,
        image: "https://i.imgur.com/XVVQjfr.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
			 products.capsulas.push({
        id: "c70",
        name: "Cardo Mariano Ultra+ ¡Detox Hepático Profundo!",
        price: 49,
        image: "https://i.imgur.com/JCrJ5u8.png", // EJEMPLO: imagen de Imgur
        description:
            "✨ ¡El mineral que tu cuerpo está pidiendo! ✨",
        category: "capsulas",
    });
	
	   products.capsulas.push({
        id: "c71",
        name: "Citrato de Magnesio + Ashwagandha",
        price: 49,
        image: "https://i.imgur.com/SW8LP4c.png",
        description: "✨ ¡Relajación muscular y alivio del estrés en una fórmula! ✨",
        category: "capsulas",
    });
	
	  products.capsulas.push({
        id: "c72",
        name: "Citrato de Zinc",
        price: 49,
        image: "https://i.imgur.com/4cyU8sw.png",
        description: "✨ ¡Refuerzo inmunológico y apoyo metabólico esencial! ✨",
        category: "capsulas",
    });
	
	 products.capsulas.push({
        id: "c73",
        name: "Ginseng Malayo",
        price: 49,
        image: "https://i.imgur.com/dH8S4mv.png",
        description: "🌿 ¡Energía natural y vitalidad renovada! 🌿",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c74",
        name: "Astaxantina - Antioxidante Potente",
        price: 49,
        image: "https://i.imgur.com/LesKtgv.png",
        description: "✨ ¡Protección celular y rejuvenecimiento premium! ✨",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c75",
        name: "KSM-66 Ashwagandha - Alivio del Estrés",
        price: 49,
        image: "https://i.imgur.com/Qthl9qQ.png",
        description: "🧠 ¡Reduce el cortisol y mejora tu bienestar mental! 🧠",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c76",
        name: "Cloruro de Magnesio - Relajación Muscular",
        price: 49,
        image: "https://i.imgur.com/eKvRbzo.png",
        description: "💪 ¡Alivia calambres y mejora la recuperación muscular! 💪",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c77",
        name: "Colágeno Marino 1000mg - Piel y Articulaciones",
        price: 49,
        image: "https://i.imgur.com/kN7ZxYQ.png",
        description: "🌊 ¡Nutrición para tu piel y soporte articular premium! 🌊",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c78",
        name: "Citrato de Calcio, Magnesio y Zinc + Vitamina D3 - Absorción Mejorada",
        price: 49,
        image: "https://i.imgur.com/WpUw5Ry.png",
        description: "🦴 ¡Fórmula completa para huesos fuertes y salud óptima! 🦴",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c79",
        name: "Bicarbonato de Sodio - Alcalinizante Natural",
        price: 49,
        image: "https://i.imgur.com/es3NXNc.png",
        description: "⚖️ ¡Balancea tu pH corporal y mejora tu digestión! ⚖️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c80",
        name: "Vitamina D3 10,000 IU - Salud Ósea e Inmune",
        price: 49,
        image: "https://i.imgur.com/5Eb5Zzv.png",
        description: "🛡️ ¡Refuerza tus defensas y fortalece tu sistema óseo! 🛡️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c81",
        name: "Ultimate Omega 2X - Ácidos Grasos Premium",
        price: 49,
        image: "https://i.imgur.com/8H09eIV.png",
        description: "🧠❤️ ¡Doble concentración para cerebro y corazón saludables! 🧠❤️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c82",
        name: "Flexacil Ultra - Soporte Articular Avanzado",
        price: 49,
        image: "https://i.imgur.com/6nbNBrC.png",
        description: "🦵 ¡Alivio articular y movilidad mejorada en fórmula potenciada! 🦵",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c83",
        name: "Trans-Resveratrol 1500mg - Antioxidante Premium",
        price: 49,
        image: "https://i.imgur.com/ZCCyNf6.png",
        description: "✨ ¡Protección celular avanzada y longevidad en mega dosis! ✨",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c84",
        name: "Ashwagandha + Melena de León 1500mg - Energía y Enfoque",
        price: 49,
        image: "https://i.imgur.com/fvBNqZE.png",
        description: "🦁🍃 ¡Combustible natural para tu mente y resistencia al estrés! 🍃🦁",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c85",
        name: "Células Madres + Ácido Hialurónico + Colágeno Hidrolizado + Vitamina C - Regeneración Avanzada",
        price: 49,
        image: "https://i.imgur.com/nKXHTRy.png",
        description: "🌟 ¡Fórmula rejuvenecedora para piel, articulaciones y vitalidad celular! 🌟",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c86",
        name: "HGH Complex - Soporte Hormonal Natural",
        price: 49,
        image: "https://i.imgur.com/In26bty.png",
        description: "⚡️ ¡Estimulación natural de energía, metabolismo y regeneración celular! ⚡️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c87",
        name: "Glicinato de Magnesio - Relajación Profunda",
        price: 49,
        image: "https://i.imgur.com/hwrfQf7.png",
        description: "😴 ¡Sueño reparador y relajación muscular premium! 😴",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c88",
        name: "Glicinato de Zinc - Soporte Inmunológico",
        price: 49,
        image: "https://i.imgur.com/DDda1pc.png",
        description: "🛡️ ¡Refuerzo para defensas naturales y metabolismo esencial! 🛡️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c90",
        name: "Biopro - Soporte Integral Premium",
        price: 49,
        image: "https://i.imgur.com/kD56BnP.png",
        description: "⚡️ ¡Fórmula avanzada para energía y bienestar general! ⚡️",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c91",
        name: "Mero Macho - Vitalidad Masculina",
        price: 49,
        image: "https://i.imgur.com/yYn6rPn.png",
        description: "💪 ¡Energía, vigor y soporte para el desempeño físico! 💪",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c92",
        name: "Colágeno Hidrolizado - Piel y Articulaciones",
        price: 49,
        image: "https://i.imgur.com/YL8YVlt.png",
        description: "✨ ¡Renovación celular para una piel firme y articulaciones flexibles! ✨",
        category: "capsulas",
    });
	
	    products.capsulas.push({
        id: "c93",
        name: "Biotina - Belleza Capilar y Uñas",
        price: 49,
        image: "https://i.imgur.com/yVPAAGy.png",
        description: "💇‍♀️ ¡Fortalece cabello, uñas y promueve una piel radiante! 💇‍♀️",
        category: "capsulas",
    });
	
	
    // Resto de cápsulas (generadas automáticamente)
    for (let i = 1; i <= 1; i++) {
        products.capsulas.push({
            id: `capsula-${i}`,
            name: `Cápsula Urológica ${i}`,
            price: 49,
            image: `💊`,
            description: `Cápsula natural ${i} con formulación avanzada para el cuidado de la salud prostática y urinaria. Contiene extractos concentrados de plantas medicinales tradicionales para máxima efectividad.`,
            category: "capsulas",
        });
    }

    // EJEMPLO 1 SUPLEMENTOS: Precio especial y descripción personalizada
    products.suplementos.push({
        id: "suplemento-1",
        name: "Harina de Calabaza Orgánica",
        price: 65, // EJEMPLO: precio diferente
        image: "🌾",
        description:
            "Harina pura de semillas de calabaza orgánica, rica en zinc natural y ácidos grasos esenciales. Perfecta para smoothies y batidos prostáticos.", // EJEMPLO: descripción específica
        category: "suplementos",
    });

    // EJEMPLO 2 SUPLEMENTOS: Con imagen de Imgur
    products.suplementos.push({
        id: "suplemento-2",
        name: "Aceite de Semilla de Calabaza",
        price: 125,
        image: "https://i.imgur.com/NzSNVjL.gif", // EJEMPLO: imagen animada de Imgur
        description:
            "Aceite virgen prensado en frío de semillas de calabaza estiria. Rico en fitoesteroles y omega-3, ideal para la salud prostática.",
        category: "suplementos",
    });

    // Resto de suplementos (generadas automáticamente)
    for (let i = 3; i <= 12; i++) {
        products.suplementos.push({
            id: `suplemento-${i}`,
            name: `Suplemento Prostático ${i}`,
            price: 49,
            image: `🌾`,
            description: `Suplemento natural ${i} rico en nutrientes esenciales para la salud prostática. Perfecto para complementar tu alimentación diaria con ingredientes orgánicos y propiedades antiinflamatorias.`,
            category: "suplementos",
        });
    }

    renderProducts();
    renderPromotions();
}

// Render products in their respective grids
function renderProducts() {
    renderProductGrid("gomitas", products.gomitas);
    renderProductGrid("capsulas", products.capsulas);
    renderProductGrid("suplementos", products.suplementos);
}

function renderProductGrid(category, productList) {
    const grid = document.getElementById(`${category}-grid`);
    if (!grid) return;

    grid.innerHTML = "";

    productList.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <div class="product-image">${product.image.startsWith("http") ? `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:3em;">🍬</div>` : product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">S/. ${product.price}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    Agregar al Carrito
                </button>
            </div>
        `;

        // Add double-click event to show product details
        productCard.addEventListener("dblclick", () =>
            showProductDetail(product.id),
        );

        grid.appendChild(productCard);
    });
}

// Render promotions
function renderPromotions() {
    const promotionsGrid = document.getElementById("promotions-grid");
    if (!promotionsGrid) return;

    // PROMOCIONES PERSONALIZABLES - 12 EJEMPLOS
    const promotions = [
        {
            id: "pr1",
            title: "Pack Próstata Saludable y energia por igual",
            price: 89,
            originalPrice: 120,
            quantity: 1,
            image: "https://i.imgur.com/WyRDfXW.png",
            description:
                "Este paquete está diseñado para el bienestar, la vitalidad y la salud de la próstata del hombre.",
        },
        {
            id: "promo-2",
            title: "LLevate 3 y ahora",
            price: 65,
            originalPrice: 85,
            quantity: 1,
            image: "https://i.imgur.com/gIsVseK.jpeg",
            description:
                "Celulas madres, citrato de magnecio y citrato de potacio",
        },
        {
            id: "pr3",
            title: "llevate 3 y ahorra",
            price: 125,
            originalPrice: 165,
            quantity: 1,
            image: "https://i.imgur.com/cTpbX6n.jpeg",
            description:
                "",
        },
        {
            id: "pr4",
            title: "Salud Femenina",
            price: 99,
            originalPrice: 135,
            quantity: 1,
            image: "https://i.imgur.com/vK2shUy.png",
            description:
                "Productos orientados a las necesidades específicas de la mujer, como el equilibrio hormonal y el ciclo menstrual..",
        },
        {
            id: "pr5",
            title: "Triple Combo",
            price: 110,
            originalPrice: 145,
            quantity: 1,
            image: "https://i.imgur.com/a0hBCl1.jpeg",
            description:
                "",
        },
        {
            id: "pr6",
            title: "CITRATO POTASIO MAGENESIO NM",
            price: 78,
            originalPrice: 105,
            quantity: 1,
            image: "https://i.imgur.com/SOnRgkF.jpeg",
            description:
                "Cuida tu salud",
        },
        {
            id: "pr7",
            title: "Pack cuidado femenino + cuidado renales",
            price: 95,
            originalPrice: 125,
            quantity: 1,
            image: "https://i.imgur.com/mVVObTC.png",
            description:
                "cuidado femenino integral, por que hay que cuidarse por dentro y por fuera!!",
        },
        {
            id: "pr8",
            title: "Combo ayuda a coinciliar el sueño!!",
            price: 85,
            originalPrice: 115,
            quantity: 1,
            image: "https://i.imgur.com/GbkQrRY.png️",
            description:
                "Relajación y Descanso Nocturno  Una combinación para ayudar a manejar el estrés y promover un sueño reparador.",
        },
        {
            id: "pr9",
            title: "higado graso? problemas de colon? problemas renales? TODO ESTA CONECTADO Y TE AYUDAMOS A REPARLO",
            price: 105,
            originalPrice: 140,
            quantity: 1,
            image: "https://i.imgur.com/5EtPNJz.png",
            description:
                "Desintoxicación y Salud Digestiva Para apoyar los procesos naturales de eliminación del cuerpo y la salud digestiva.",
        },
        {
            id: "pr10",
            title: "Contra la fatiga y el cansacio mental",
            price: 115,
            originalPrice: 155,
            quantity: 1,
            image: "https://i.imgur.com/EVzJfEE.png",
            description:
                "Energía y Enfoque Mental  Para combatir la fatiga y mejorar la claridad mental y la energía durante el día.",
        },
        {
            id: "pr11",
            title: "🦴Bienestar y movilidad Articular🦴",
            price: 88,
            originalPrice: 118,
            quantity: 1,
            image: "https://i.imgur.com/19XRKum.png",
            description:
                "Salud Articular y Movilidad  Diseñado para personas que buscan mantener la salud de sus articulaciones y reducir la inflamación.",
        },
        {
            id: "pr12",
            title: "Combo Descanso Reparador",
            price: 72,
            originalPrice: 95,
            quantity: 1,
            image: "https://i.imgur.com/ADNtpnt.png",
            description:
                "Mejora la calidad de tu sueño con relajantes naturales.",
        },
		 {
            id: "pr13",
            title: "Combo Descanso Reparador",
            price: 72,
            originalPrice: 95,
            quantity: 1,
            image: "https://i.imgur.com/rZ0QhG5.jpeg",
            description:
                "Mejora la calidad de tu sueño con relajantes naturales.",
        },
		 {
            id: "pr14",
            title: "Combo Descanso Reparador",
            price: 72,
            originalPrice: 95,
            quantity: 1,
            image: "https://i.imgur.com/CBsnyzg.jpeg",
            description:
                "Mejora la calidad de tu sueño con relajantes naturales.",
        },
    ];

    promotions.forEach((promotion, index) => {
        const promotionItem = document.createElement("div");
        promotionItem.className = "promotion-item";
        promotionItem.innerHTML = `
            <div class="promotion-image-full">${promotion.image.startsWith("http") ? `<img src="${promotion.image}" alt="${promotion.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><div style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:3em;">🎁</div>` : `<div style="font-size:4em; display:flex; align-items:center; justify-content:center; height:100%;">${promotion.image}</div>`}</div>
            <div class="promotion-footer">
                <span class="promotion-price-small">S/. ${promotion.price}</span>
                <button class="add-to-cart-small" onclick="addPromotionToCart('${promotion.title}', ${promotion.price})">+</button>
            </div>
        `;

        promotionsGrid.appendChild(promotionItem);
    });
}



// Mostrar modal de promoción expandida
function showPromotionModal(promotion) {
    const modal = document.getElementById("promotion-modal");
    const modalBody = document.getElementById("promotion-modal-body");

    modalBody.innerHTML = `
        <h2>${promotion.title}</h2>
        <div class="promotion-modal-price">
            <span class="current-price">S/. ${promotion.price}</span>
            <span class="original-price">S/. ${promotion.originalPrice}</span>
            <span class="savings">¡Ahorra S/. ${promotion.originalPrice - promotion.price}!</span>
        </div>
        <p class="promotion-modal-description">${promotion.description}</p>
        <div class="promotion-modal-details">
            <h3>📋 Detalles del Pack:</h3>
            <pre>${promotion.details}</pre>
        </div>
        <div class="promotion-modal-actions">
            <button class="btn-primary" onclick="addPromotionToCart('${promotion.title}', ${promotion.price})">
                Agregar al Carrito - S/. ${promotion.price}
            </button>
            <button class="btn-secondary" onclick="closePromotionModal()">
                Cerrar
            </button>
        </div>
    `;

    modal.style.display = "flex";
}

// Cerrar modal de promoción
function closePromotionModal() {
    const modal = document.getElementById("promotion-modal");
    modal.style.display = "none";
}

// Agregar promoción al carrito
function addPromotionToCart(title, price) {
    const promotionItem = {
        id: `promo-${Date.now()}`,
        name: title,
        price: price,
        image: "🎁",
        description: "Promoción especial",
        category: "promocion",
        quantity: 1,
    };

    cart.push(promotionItem);
    updateCartDisplay();
    saveCartToStorage();
    showNotification(`Promoción agregada al carrito: ${title}`);
    closePromotionModal();
}

// Event listeners para cerrar modal
document.addEventListener("DOMContentLoaded", function () {
    // Cerrar modal al hacer clic en la X
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("promotion-modal-close")) {
            closePromotionModal();
        }

        // Cerrar modal al hacer clic fuera del contenido
        if (e.target.classList.contains("promotion-modal")) {
            closePromotionModal();
        }

        // Cerrar modal de imagen al hacer clic fuera del contenido
        if (e.target.classList.contains("image-modal")) {
            closeImageModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closePromotionModal();
            closeImageModal();
        }
    });
});

// Navigation functions
function toggleMegaMenu(sectionId) {
    // Close all other megamenus
    const allMegamenus = document.querySelectorAll(".megamenu");
    allMegamenus.forEach((menu) => {
        if (menu.id !== `megamenu-${sectionId}`) {
            menu.classList.remove("active");
        }
    });

    // Toggle the selected megamenu
    const targetMegamenu = document.getElementById(`megamenu-${sectionId}`);
    if (targetMegamenu) {
        targetMegamenu.classList.toggle("active");

        // If it's products section, show gomitas by default
        if (
            sectionId === "productos" &&
            targetMegamenu.classList.contains("active")
        ) {
            showProductSection("gomitas");
        }

        // Scroll to the megamenu or video section
        if (targetMegamenu.classList.contains("active")) {
            setTimeout(() => {
                targetMegamenu.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        }
    }

    // Check if any megamenu is active, if not, show video section
    setTimeout(() => {
        const activeMegamenus = document.querySelectorAll(".megamenu.active");
        const videoSection = document.querySelector(".video-section");

        if (activeMegamenus.length === 0 && videoSection) {
            videoSection.style.display = "block";
            setTimeout(() => {
                videoSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 100);
        } else if (videoSection) {
            videoSection.style.display = "none";
        }
    }, 150);
}

function showProductSection(subsection) {
    // Update filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    event.target?.classList.add("active");

    // Hide all product subsections
    const subsections = document.querySelectorAll(".product-subsection");
    subsections.forEach((sub) => {
        sub.style.display = "none";
    });

    // Show selected subsection
    const targetSubsection = document.getElementById(`${subsection}-section`);
    if (targetSubsection) {
        targetSubsection.style.display = "block";
    }
}

// Product detail modal with full landing page
function showProductDetail(productId) {
    const product = findProductById(productId);
    if (!product) return;

    // Get detailed product info based on ID
    const detailedProductInfo = getDetailedProductInfo(productId);

    const modal = document.getElementById("productModal");
    const details = document.getElementById("productDetails");

    details.innerHTML = `
        <div class="product-detail-full">
            <div class="product-header">
                <div class="product-image-large">
                    ${detailedProductInfo.largeImage ? `<img src="${detailedProductInfo.largeImage}" alt="${product.name}" style="width: 400px; height: 400px; object-fit: cover; border-radius: 15px;">` : `<div class="placeholder-image">${product.image}</div>`}
                </div>
                <div class="product-info-header">
                    <h2>${product.name}</h2>                 
                </div>
            </div>

            <div class="product-landing-page">
                <div class="benefits-section">
                    <h3>🌟 Beneficios Principales</h3>
                    <div class="benefits-grid">
                        ${detailedProductInfo.benefits.map((benefit) => `<div class="benefit-item">${benefit}</div>`).join("")}
                    </div>
                </div>

                <div class="ingredients-section">
                    <h3>🌿 Ingredientes Naturales</h3>
                    <div class="ingredients-list">
                        ${detailedProductInfo.ingredients.map((ingredient) => `<span class="ingredient-tag">${ingredient}</span>`).join("")}
                    </div>
                </div>

                <div class="how-to-use">
                    <h3>📋 Modo de Uso</h3>
                    <p>${detailedProductInfo.usage}</p>
                </div>

                <div class="guarantee-section">
                    <h3>✅ Nuestra Garantía</h3>
                    <div class="guarantee-content">
                        <div class="guarantee-item">🚚 Envío a todo el Perú, entrega gratis en lima</div>
                        <div class="guarantee-item">💯 100% Natural y seguro</div>                                      
                    </div>
                </div>
            
                <div class="final-cta">
                    <button class="buy-now-btn" onclick="addToCart('${product.id}'); showPaymentOptions(); closeProductModal();">
                        🔥 COMPRAR AHORA - S/. ${product.price}
                    </button>
                    <div class="payment-methods">
                        <small>💳 Aceptamos: Transferencia BCP • Interbancaria • Yape</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = "block";
}

// Function to get detailed product information
function getDetailedProductInfo(productId) {
    const detailedProducts = {
        // EJEMPLOS GOMITAS
        "1#": {
            largeImage: "https://i.imgur.com/Py8azRO.png",
            benefits: [
                "👪 Ideal Para",
                "🔹 Niños en etapa de crecimiento y desarrollo",
                "🔹 Estudiantes y adultos con alta actividad mental",
                "🔹 Quienes buscan un suplemento práctico y delicioso",
				
				"💡 Beneficios de Nuestras Gomitas Enriquecidas",
			    "✔ Ácidos Grasos Esenciales – DHA y EPA para un cerebro saludable y corazón fuerte",
				"✔ ARA (Ácido Araquidónico) – Apoya el desarrollo cognitivo en niños",
				"✔ Colina – Mejora la memoria y la función neuronal",
				"✔ Potasio – Contribuye al equilibrio muscular y nervioso",
				"✔ Delicioso Sabor Frutal – ¡Una experiencia dulce y nutritiva!",
            ],
            ingredients: [
                "Omega 3-6-9",
				"DHA",
				"EPA",
				"ARA",
				"Colina",
				"Potasio",
            ],
            usage: "Tomar 2 gomitas al día, preferiblemente con las comidas. Para mejores resultados, usar consistentemente por al menos 3 meses.",
            testimonials: [
                {
                    text: "Excelente producto, noté mejoras en pocas semanas",
                    author: "Carlos M., 45 años",
                },
                {
                    text: "Muy buen sabor y efectivo para la salud prostática",
                    author: "Roberto L., 52 años",
                },
            ],
        },
        "2#": {
            largeImage: "https://i.imgur.com/0HZuzIP.png",
            benefits: [
                "✔ Complejo Vitamínico Integral – Combina vitaminas 3, 6, 9 y 12 para un soporte nutricional",
                "✔ Energía Natural – Ayuda a combatir el cansancio y la fatiga",
                "✔ Sistema Nervioso Saludable – Contribuye al funcionamiento óptimo del cerebro",
                "✔ Metabolismo Activo – Favorece la producción de energía celular",
			    "✔ Sabor Cítrico Delicioso – ¡La forma más divertida de tomar tus vitaminas!",
            ],
            ingredients: [
                "Vitamina B3 (Niacina)",
                "Vitamina B6 (Piridoxina)",
                "Vitamina B9 (Ácido Fólico)",
                "Vitamina B12 (Cobalamina)",
				 "Frasco con 120 gomitas)",
            ],
            usage: "Consumir 1-2 gomitas diarias con el desayuno. No exceder la dosis recomendada.",
            testimonials: [
                {
                    text: "Me siento con más energía desde que las tomo",
                    author: "Miguel A., 38 años",
                },
                {
                    text: "Perfectas para complementar mi rutina de salud",
                    author: "Eduardo R., 41 años",
                },
            ],
        },
		"3#": {
            largeImage: "https://i.imgur.com/D9cY43C.png",
            benefits: [
                "✔ Piel Radiante – Estimula la producción de colágeno para reducir arrugas y líneas de expresión",
                "✔ Cabello y Uñas Fuertes – Fortalece la estructura capilar y ungueal",
                "✔ Articulaciones Saludables – Ayuda a mantener la flexibilidad y movilidad articular",
                "✔ Dosis Diaria de Juventud – Con vitamina C para mejor absorción",
			    "✔ Delicioso Sabor a Frutos Rojos – ¡Cuidarte nunca fue tan sabroso!",
            ],
            ingredients: [
                "Colágeno Hidrolizado Tipo I y III (10g por porción)",
                "Vitamina C (para potenciar la síntesis de colágeno)",
                "Ácido Hialurónico (hidratación profunda)",
                "Biotina (para cabello y uñas)",
				 "Frasco con 130 gomitas)",
            ],
            usage: "Consumir 1-2 gomitas diarias con el desayuno. No exceder la dosis recomendada.",
            testimonials: [
                {
                    text: "Me siento con más energía desde que las tomo",
                    author: "Miguel A., 38 años",
                },
                {
                    text: "Perfectas para complementar mi rutina de salud",
                    author: "Eduardo R., 41 años",
                },
            ],
        },
			"4#": {
            largeImage: "https://i.imgur.com/SvBB6Uk.png",
            benefits: [
                "✔ Poder Antiinflamatorio – Reduce dolores articulares y musculares",
                "✔ Protección Hepática – Apoya la función detoxificante del hígado",
                "✔ Antioxidante Natural – Combate los radicales libres",
                "✔ Digestión Saludable – Alivia malestares estomacales",
			    "✔ Delicioso Sabor Cítrico – ¡Sin el sabor amargo de la cúrcuma en polvo!",
            ],
            ingredients: [
                "Cúrcuma (95% curcuminoides)",
                "Vitamina C (para potenciar la síntesis de colágeno)",
                "engibre (potencia el efecto antiinflamatorio)",
                "Pimienta Negra (mejora la absorción)",
				"Vitamina E (acción antioxidante)",
				 "Frasco con 130 gomitas)",
            ],
            usage: "Consumir 1-2 gomitas diarias con el desayuno. No exceder la dosis recomendada.",
            testimonials: [
                {
                    text: "Me siento con más energía desde que las tomo",
                    author: "Miguel A., 38 años",
                },
                {
                    text: "Perfectas para complementar mi rutina de salud",
                    author: "Eduardo R., 41 años",
                },
            ],
        },
		"5#": {
            largeImage: "https://i.imgur.com/QmSdfUK.png",
            benefits: [
                "✔ Refuerzo Contra la Anemia – Hierro altamente biodisponible",
                "✔ Energía Natural – Combate el cansancio y fatiga crónica",
                "✔ Defensas Fortalecidas – Gracias a la vitamina C y moringa",
                "✔ Poder Antioxidante – Protección celular completa",
			    "✔ Sabor Frutal Delicioso – ¡Sin ese regusto metálico del hierro!",
            ],
            ingredients: [
                "Hierro Bisglicinato (alta absorción)",
                "Aceite de Moringa (superalimento nutritivo)",
                "Vitamina C (mejora la absorción del hierro)",
                "Vitamina B12 (apoyo adicional contra la anemia)",
				 "Frasco con 130 gomitas)",
				 "❤️ ¡Hierro que sí se absorbe, energía que sí se siente! ❤️",
            ],
            usage: "Consumir 1-2 gomitas diarias con el desayuno. No exceder la dosis recomendada.",
            testimonials: [
                {
                    text: "Me siento con más energía desde que las tomo",
                    author: "Miguel A., 38 años",
                },
                {
                    text: "Perfectas para complementar mi rutina de salud",
                    author: "Eduardo R., 41 años",
                },
            ],
        },
		"6#": { 
            largeImage: "https://i.imgur.com/36zZBkW.png",
            benefits: [
                "✔ Escudo Antigripal Natural – Refuerza el sistema inmunológico",
                "✔ Alivio de Garganta Irritada – Propiedades antisépticas y antiinflamatorias",
                "✔ Protección Respiratoria – Ideal para temporadas de frío y alergias",
                "✔ Poder Antibacteriano – Ayuda a combatir infecciones",
			    "✔ Sabor Miel-Limón Delicioso – ¡Sin el amargor del própolis líquido!",
            ],
            ingredients: [
                "Hierro Bisglicinato (alta absorción)",
                "Aceite de Moringa (superalimento nutritivo)",
                "Vitamina C (mejora la absorción del hierro)",
                "Vitamina B12 (apoyo adicional contra la anemia)",
				 "Frasco con 130 gomitas)",
				 "❤️ ¡Hierro que sí se absorbe, energía que sí se siente! ❤️",
            ],
            usage:  "Consumir 1-2 gomitas diarias con el desayuno. No exceder la dosis recomendada",
            testimonials: [
                {
                    text: "Me siento con más energía desde que las tomo",
                    author: "Miguel A., 38 años",
                },
                {
                    text: "Perfectas para complementar mi rutina de salud",
                    author: "Eduardo R., 41 años",
                },
            ],
        },
		"7#": {
            largeImage: "https://i.imgur.com/Q2Rz2Kw.png",
            benefits: [
            "Refuerza las defensas naturales de los niños.",
            "Ayuda a aliviar las molestias de garganta y vías respiratorias.",
            "Contribuye a prevenir resfriados y gripes estacionales.",
            "Formato divertido y delicioso que los niños adorarán.",
            "Apoyo inmunológico diario para los más pequeños."
        ],
        ingredients: [
            "Extracto de Propóleo de alta calidad.",
            "Vitamina C para un impulso extra de inmunidad.",
            "Zinc para el correcto funcionamiento del sistema inmune.",
            "Miel pura para un sabor delicioso y propiedades calmantes.",
            "Saborizantes naturales de frutas (fresa, naranja, limón).",
            "Sin colorantes ni conservantes artificiales."
        ],
        "usage": "Se recomienda administrar 1 a 2 gomitas al día a niños mayores de 3 años. Masticar completamente antes de tragar. No exceder la dosis recomendada.",
      ingredients: [
            {
                "text": "Desde que mis hijos toman las gomitas de propóleo, se enferman mucho menos. ¡Están encantados con el sabor!",
                "author": "Ana S., Mamá de 2"
            },
            {
                "text": "Son perfectas para la guardería. Me da tranquilidad saber que están reforzando sus defensas de forma natural.",
                "author": "Javier P., Papá de una niña"
            },
        ]
    },
	"8#": {
            largeImage: "https://i.imgur.com/w8AokCO.png",
		benefits: [
            "Promueve la relajación y el descanso natural.",
            "Ayuda a reducir el estrés y la ansiedad ocasional.",
            "Favorece un sueño reparador sin sensación de pesadez.",
            "Fácil de tomar y con un sabor agradable.",
            "Ideal para calmar los nervios antes de situaciones estresantes."
        ],
        ingredients: [
            "Extracto de Raíz de Valeriana (Valeriana officinalis).",
            "Melatonina para regular el ciclo del sueño (si aplica en el producto, si no, omitir o adaptar).",
            "Manzanilla y Lavanda para un efecto sinérgico relajante (si aplica).",
            "Jarabe de glucosa, azúcar, gelatina (u otros agentes gelificantes si son veganas).",
            "Ácido cítrico, sabores naturales.",
            "Libre de gluten y lactosa (si aplica)."
        ],
        usage: "Se recomienda tomar 1 o 2 gomitas antes de acostarse, o cuando se necesite un efecto relajante.",
        testimonials: [
            {
                "text": "Desde que las tomo, consigo conciliar el sueño mucho más rápido y me despierto más descansada. ¡Son geniales!",
                "author": "Laura M., 45 años"
            },
            {
                "text": "Me ayudan muchísimo a relajarme después de un día ajetreado. Su sabor es suave y no dejan resaca.",
                "author": "Carlos R., 32 años"
            },
        ]
},
        "9#": {
            largeImage: "https://i.imgur.com/Ccvj8wt.png",
		 benefits: [
            "Fortalece potentemente el sistema inmune.",
            "Contribuye a reducir el cansancio y la fatiga.",
            "Mejora la función muscular y nerviosa.",
            "Promueve la salud ósea y dental.",
            "Actúa como un poderoso antioxidante para proteger las células.",
            "Apoya la salud del cabello, piel y uñas."
        ],
        ingredients: [
            "Zinc (como Citrato de Zinc)",
            "Magnesio (como Citrato de Magnesio)",
            "Beta-Glucano (de Levadura)",
            "Vitamina C (como Ácido Ascórbico)",
            "Selenio (como Selenometionina)",
            "Jarabe de Tapioca Orgánico",
            "Azúcar de Caña Orgánica",
            "Pectina",
            "Sabores Naturales de Frutas",
            "Ácido Cítrico"
        ],
        usage: "Tomar 2 gomitas al día, preferiblemente con una comida. Masticar bien antes de tragar. Diseñado para adultos. Consulte a un profesional de la salud si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que las tomo, me siento con mucha más energía y mi sistema inmunológico está a tope. ¡Un producto increíble!",
                "author": "Sofía P., 35 años"
            },
            {
                "text": "Estaba buscando un multivitamínico completo en un formato fácil de tomar, y estas gomitas superaron mis expectativas. El sabor es delicioso.",
                "author": "Roberto G., 42 años"
            }
        ]
    },


        // EJEMPLOS CÁPSULAS
        "c1": {
            largeImage: "https://i.imgur.com/pcLMm5r.pngf",
           benefits: [
            "Apoyo para la vitalidad y el rendimiento masculino.",
            "Contribuye a mejorar la circulación sanguínea.",
            "Promueve la energía y la resistencia.",
            "Formulado para el bienestar general y la confianza.",
            "Ayuda a mantener una función saludable."
        ],
        ingredients: [
            "L-Arginina",
            "Extracto de Ginseng (Panax ginseng)",
            "Maca (Lepidium meyenii)",
            "Tribulus Terrestris",
            "Zinc (como Gluconato de Zinc)",
            "Vitaminas del complejo B",
            "Celulosa microcristalina (agente de carga)",
            "Estearato de magnesio (antiaglomerante)",
            "Cápsula vegetal (HPMC)"
        ],
        usage: "Tomar 1 cápsula al día, preferiblemente con agua. Se recomienda tomar 30-60 minutos antes de la actividad o según las indicaciones de un profesional de la salud. No exceder la dosis recomendada.",
        testimonials: [
            {
                "text": "Me siento con más energía y confianza. Noté una mejora significativa en mi rendimiento general.",
                "author": "Alejandro D., 52 años"
            },
            {
                "text": "Un producto que realmente cumple lo que promete. Siento que ha mejorado mi vitalidad diaria.",
                "author": "Fernando S., 48 años"
            }
        ]
    },
        "c2": {
            largeImage: "https://i.imgur.com/uYo7NaV.png",
          benefits: [
            "Promueve la salud y el bienestar de la próstata.",
            "Ayuda a mantener una función urinaria normal.",
            "Contribuye a reducir la inflamación y las molestias.",
            "Apoya el flujo urinario saludable.",
            "Formulación natural para el cuidado masculino."
        ],
        ingredients: [
            "Extracto de Saw Palmetto (Serenoa repens)",
            "Pygeum Africanum",
            "Licopeno",
            "Zinc (como Citrato de Zinc)",
            "Selenio (como Selenometionina)",
            "Vitamina E",
            "Extracto de Semilla de Calabaza",
            "Uva Ursi",
            "Ortiga (Urtica dioica)",
            "Otros excipientes y agentes de carga naturales."
        ],
        usage: "Tomar 2 cápsulas al día con una comida, o según las indicaciones de su profesional de la salud. Para obtener mejores resultados, se recomienda un uso continuo. No exceder la dosis recomendada.",
        testimonials: [
            {
                "text": "He notado una gran mejora en mi flujo urinario y me siento mucho más cómodo desde que tomo BioProst. ¡Muy recomendable!",
                "author": "Ricardo G., 65 años"
            },
            {
                "text": "Este producto natural me ha ayudado a mantener mi próstata saludable sin efectos secundarios. Estoy muy satisfecho.",
                "author": "Juan P., 58 años"
            }
        ]
    },
			"c3": {
            largeImage: "https://i.imgur.com/L6PDL6n.png",
            benefits: [
                "Potente antioxidante natural que combate los radicales libres.",
                "Apoya la aceleración del metabolismo y la quema de grasa.",
                "Contribuye a aumentar los niveles de energía y concentración.",
                "Favorece la salud cardiovascular y el control del colesterol.",
                "Ayuda a la desintoxicación del organismo.",
                "Promueve la salud general y el bienestar."
            ],
            ingredients: [
                "Extracto de Hoja de Té Verde (Camellia sinensis)",
                "Estandarizado a Polifenoles y Catequinas (EGCG)",
                "Cafeína natural (en cantidades moderadas, si aplica)",
                "Cápsula vegetal (Hipromelosa)",
                "Agentes de carga (Celulosa microcristalina)",
                "Antiaglomerantes (Estearato de magnesio, Dióxido de silicio)"
            ],
            usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para mejores resultados, tomar por la mañana o al mediodía. No exceder la dosis recomendada. Consulte a su médico si tiene alguna condición médica o es sensible a la cafeína.",
            testimonials: [
                {
                    "text": "Me siento con más energía durante el día y he notado una mejora en mi digestión. ¡Excelente para mi rutina diaria!",
                    "author": "María G., 30 años"
                },
                {
                    "text": "Un gran aliado para mi metabolismo. Siento que me ayuda a mantenerme activo y a sentirme más ligero. Lo recomiendo.",
                    "author": "Pablo R., 40 años"
                }
            ]
        },
		
		"c4": {
                largeImage: "https://i.imgur.com/D9mD7DB.png",
        benefits: [
            "Contribuye al realce de las curvas femeninas de forma natural.",
            "Favorece la salud de la piel, haciéndola más suave y elástica.",
            "Ayuda a fortalecer el cabello y las uñas.",
            "Proporciona fitoestrógenos naturales para el equilibrio hormonal.",
            "Rico en vitaminas A, C y E, y ácidos grasos esenciales.",
            "Apoya la belleza integral desde el interior."
        ],
        ingredients: [
            "Extracto de Fruto de Aguaje (Mauritia flexuosa)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida. Para resultados óptimos, se recomienda un uso continuado. Consulte a su médico antes de usar si está embarazada, amamantando o si tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo Aguaje, siento mi piel más hidratada y elástica. ¡Mis curvas también lucen mejor!",
                "author": "Camila P., 28 años"
            },
            {
                "text": "Es un excelente suplemento para la belleza femenina. He notado mi cabello más fuerte y brillante. Muy feliz con los resultados.",
                "author": "Valentina R., 34 años"
            }
            ]
        },
		
		"c6": {
        largeImage: "https://i.imgur.com/vTddhnl.png",
        benefits: [
            "Potencia la energía y el vigor general.",
            "Ayuda a mejorar el rendimiento físico y mental.",
            "Contribuye a la vitalidad masculina.",
            "Promueve la fuerza y resistencia.",
            "Fomenta un estado de ánimo positivo y enfoque."
        ],
        ingredients: [
            "Extracto de Ginseng (Panax ginseng)",
            "L-Arginina",
            "Maca (Lepidium meyenii)",
            "Tribulus Terrestris",
            "Zinc",
            "Vitaminas del complejo B",
            "Extractos de plantas adaptógenas (ej. Rhodiola Rosea, Ashwagandha, si aplica)",
            "Celulosa microcristalina",
            "Cápsula vegetal (Hipromelosa)"
        ],
        usage: "Tomar 1 cápsula al día con un vaso de agua, preferiblemente por la mañana. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Me siento más enérgico y con una vitalidad renovada. 'Alfa Maxx' realmente funciona para mantenerme activo.",
                "author": "Andrés P., 45 años"
            },
            {
                "text": "Desde que lo tomo, mi concentración ha mejorado y siento un impulso extra para enfrentar el día. Muy satisfecho.",
                "author": "Daniel S., 39 años"
            }
            ]
        },
			"c7": {
        largeImage: "https://i.imgur.com/mcYspYv.png",
        benefits: [
            "Apoya la reducción de medidas en la zona abdominal.",
            "Contribuye a la eliminación de líquidos y toxinas.",
            "Favorece un metabolismo digestivo saludable.",
            "Ayuda a controlar el apetito y la ansiedad por comer.",
            "Promueve la quema de grasa de forma natural.",
            "Proporciona un efecto desintoxicante y depurativo."
        ],
        ingredients: [
            "Extracto de Jengibre (Zingiber officinale)",
            "Té Verde (Camellia sinensis)",
            "Jamaica (Hibiscus sabdariffa)",
            "Alcachofa (Cynara scolymus)",
            "Linaza (Linum usitatissimum)",
            "Raíz de Nopal (Opuntia ficus-indica)",
            "Ciruela (Prunus domestica)",
            "Picolinato de Cromo (para el control del azúcar en sangre)",
            "Cápsula vegetal (Hipromelosa)"
        ],
        usage: "Tomar 1 a 2 cápsulas al día con un vaso de agua, preferiblemente 30 minutos antes de las comidas principales. Se recomienda acompañar con una dieta balanceada y ejercicio regular para mejores resultados. No exceder la dosis recomendada.",
        testimonials: [
            {
                "text": "Desde que lo uso, he notado una diferencia en mi abdomen y me siento menos hinchada. ¡Me encanta!",
                "author": "Fernanda L., 38 años"
            },
            {
                "text": "Es el complemento perfecto para mi rutina de bienestar. Me ayuda a sentirme más ligera y activa.",
                "author": "Miguel R., 42 años"
            }
            ]
        },
		 "c8": {
        largeImage: "https://i.imgur.com/Fvyor5I.png",
        benefits: [
            "Apoya la producción natural de leche materna en madres lactantes.",
            "Contribuye al control de los niveles de azúcar en la sangre.",
            "Favorece una digestión saludable y reduce la hinchazón.",
            "Ayuda a mejorar la salud del cabello y el cuero cabelludo.",
            "Promueve el equilibrio hormonal natural.",
            "Rico en fibra dietética para la saciedad y el tránsito intestinal."
        ],
        ingredients: [
            "Extracto de Semilla de Fenogreco (Trigonella foenum-graecum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga (Celulosa microcristalina)",
            "Antiaglomerantes (Estearato de magnesio, Dióxido de silicio)"
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para madres lactantes, consulte a su médico para la dosis adecuada. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo Fenogreco, he notado una mejora significativa en mi producción de leche. ¡Es increíble!",
                "author": "Laura V., 30 años (Madre lactante)"
            },
            {
                "text": "Me ayuda a mantener mis niveles de azúcar estables y siento mi digestión mucho más ligera. Un excelente complemento.",
                "author": "Roberto C., 55 años"
            }
            ]
        },
		 "c9": {
        largeImage: "https://i.imgur.com/SVvq1TL.png",
        benefits: [
            "Favorece la salud digestiva y el equilibrio de la flora intestinal.",
            "Ayuda a fortalecer el sistema inmunológico de forma natural.",
            "Contribuye a la desintoxicación y limpieza del organismo.",
            "Apoya la recuperación de molestias estomacales e intestinales.",
            "Aporta nutrientes esenciales para el bienestar general."
        ],
        ingredients: [
            "Polvo de Tocosh (Solanum tuberosum fermentado)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con agua, preferiblemente antes de las comidas. No exceder la dosis recomendada. Consulte a un profesional de la salud si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi digestión ha mejorado muchísimo desde que tomo Tocosh. Siento mi estómago más ligero y desinflamado.",
                "author": "Isabel P., 40 años"
            },
            {
                "text": "Es un gran apoyo para mi sistema inmune, especialmente en épocas de cambios. Me siento más fuerte y protegido.",
                "author": "Carlos M., 50 años"
            }
            ]
        },
		 "c10": {
        largeImage: "https://i.imgur.com/XjxJNdD.png",
        benefits: [
            "Superalimento rico en vitaminas, minerales y aminoácidos.",
            "Potente antioxidante que combate el daño de los radicales libres.",
            "Apoya la energía y la vitalidad general.",
            "Contribuye a la salud de la piel y el cabello.",
            "Ayuda a fortalecer el sistema inmunológico.",
            "Favorece la desintoxicación y el bienestar digestivo."
        ],
        ingredients: [
            "Extracto de Hoja de Moringa Oleifera",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga (Celulosa microcristalina)",
            "Antiaglomerantes (Estearato de magnesio, Dióxido de silicio)"
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Me siento con mucha más energía y mi piel luce radiante desde que incluyo Moringa en mi dieta. ¡Es un cambio notable!",
                "author": "Laura Q., 42 años"
            },
            {
                "text": "Un excelente suplemento para mi bienestar diario. Siento que me ayuda a mantenerme saludable y activo. Totalmente recomendado.",
                "author": "Manuel A., 50 años"
            }
            ]
        },
		
		"c11": {
        largeImage: "https://i.imgur.com/xx0rCq6.png",
        benefits: [
            "Potencia el realce natural de las curvas femeninas.",
            "Favorece el equilibrio hormonal y el bienestar femenino.",
            "Contribuye a una digestión saludable y reduce la hinchazón (gracias al Hinojo).",
            "Aumenta la energía, vitalidad y resistencia (gracias a la Maca).",
            "Mejora la salud de la piel, cabello y uñas.",
            "Apoyo integral para la salud femenina."
        ],
        ingredients: [
            "Extracto de Fruto de Aguaje (Mauritia flexuosa)",
            "Extracto de Semilla de Hinojo (Foeniculum vulgare)",
            "Extracto de Raíz de Maca (Lepidium meyenii)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. Consulte a su médico antes de usar si está embarazada, amamantando o si tiene alguna condición médica.",
        testimonials: [
            {
                "text": "¡Esta combinación es increíble! Me siento con más energía, mi digestión ha mejorado y mis curvas lucen más definidas.",
                "author": "Sofía C., 32 años"
            },
            {
                "text": "Un producto completo para la mujer. He notado un equilibrio en mi cuerpo y me siento con mayor vitalidad a diario. Muy contenta.",
                "author": "Gabriela F., 40 años"
            }
            ]
        },
		
		"c12": {
        largeImage: "https://i.imgur.com/0PadOJ9.png",
        benefits: [
            "Potencia la energía y el vigor masculino.",
            "Contribuye a mejorar la resistencia física y el rendimiento.",
            "Favorece la vitalidad y el bienestar general del hombre.",
            "Ayuda a mantener un estado de ánimo positivo y confianza.",
            "Formulado para un soporte integral de la fuerza y el aguante."
        ],
        ingredients: [
            "Extracto de Raíz de Maca (Lepidium meyenii)",
            "Ginseng (Panax ginseng)",
            "L-Arginina",
            "Tribulus Terrestris",
            "Damiana (Turnera diffusa)",
            "Zinc",
            "Vitaminas del complejo B",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con un vaso de agua, preferiblemente por la mañana o antes de la actividad. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene alguna condición médica o está tomando otros medicamentos.",
        testimonials: [
            {
                "text": "Desde que uso Vigoron Maxx, me siento con una energía renovada y mi resistencia ha mejorado notablemente. ¡Un cambio excelente!",
                "author": "Javier L., 50 años"
            },
            {
                "text": "Es el impulso que necesitaba. Siento más vitalidad y confianza en mi día a día. Totalmente recomendado para hombres activos.",
                "author": "Roberto A., 43 años"
            }
            ]
        },
		
			"c13": {
        largeImage: "https://i.imgur.com/TKaXBZN.png",
        benefits: [
            "Apoya la salud cardiovascular y el corazón.",
            "Contribuye al buen funcionamiento cerebral y la memoria.",
            "Favorece la salud de la piel, cabello y uñas.",
            "Ayuda a reducir la inflamación en el cuerpo.",
            "Esencial para el bienestar ocular.",
            "Promueve el equilibrio de colesterol saludable."
        ],
        ingredients: [
            "Aceite de Pescado (Omega 3: EPA y DHA)",
            "Aceite de Linaza (Omega 3, 6, 9)",
            "Aceite de Borraja (Omega 6, GLA)",
            "Vitamina E (como antioxidante)",
            "Gelatina (de la cápsula blanda)",
            "Glicerina (humectante)",
            "Agua purificada"
        ],
        usage: "Tomar 1 a 2 cápsulas blandas al día, preferiblemente con las comidas. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando anticoagulantes o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "He notado una mejora en mi concentración y mi piel se siente más hidratada. ¡El Omega Triple es un esencial para mí!",
                "author": "Claudia R., 48 años"
            },
            {
                "text": "Un producto excelente para la salud del corazón. Me siento más activo y mi bienestar general ha mejorado. Lo recomiendo sin duda.",
                "author": "Felipe G., 55 años"
            }
            ]
        },
		
			"c14": {
        largeImage: "https://i.imgur.com/yZ7Owg6.png",
        benefits: [
            "Apoya la salud ósea y dental fuerte.",
            "Contribuye a la formación de glóbulos rojos y previene la anemia.",
            "Esencial para el funcionamiento normal del sistema nervioso.",
            "Ayuda a reducir el cansancio y la fatiga, aumentando la energía.",
            "Fundamental para el metabolismo energético y el bienestar general.",
            "Ideal para personas con deficiencias de hierro, calcio o vitamina B12."
        ],
        ingredients: [
            "Hierro (como Fumarato Ferroso o Bisglicinato de Hierro)",
            "Calcio (como Carbonato de Calcio o Citrato de Calcio)",
            "Vitamina B12 (Cianocobalamina o Metilcobalamina)",
            "Vitamina D3 (para la absorción del Calcio, si aplica)",
            "Ácido Fólico (para la absorción del Hierro, si aplica)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua, o según las indicaciones de su médico. No exceder la dosis recomendada. Consulte a su médico si está embarazada, amamantando o tiene alguna condición médica, especialmente si toma otros suplementos de hierro o calcio.",
        testimonials: [
            {
                "text": "Sentía mucha fatiga, pero desde que tomo este suplemento, mi energía ha regresado y mis huesos se sienten más fuertes. ¡Excelente combinación!",
                "author": "María J., 40 años"
            },
            {
                "text": "Mi médico me lo recomendó para mi deficiencia de hierro y me ha ayudado muchísimo. Además, el calcio es un plus para mis huesos.",
                "author": "Pedro S., 58 años"
            }
            ]
        },
		
		"c15": {
        largeImage: "https://i.imgur.com/fppSMAz.png",
        benefits: [
            "Aumenta los niveles de energía y reduce el cansancio.",
            "Esencial para el buen funcionamiento del sistema nervioso.",
            "Contribuye a la formación normal de glóbulos rojos.",
            "Apoya la salud cerebral y la función cognitiva.",
            "Favorece un metabolismo saludable de proteínas, grasas y carbohidratos.",
            "Fundamental para el bienestar general y la vitalidad."
        ],
        ingredients: [
            "Vitamina B1 (Tiamina)",
            "Vitamina B2 (Riboflavina)",
            "Vitamina B3 (Niacina)",
            "Vitamina B5 (Ácido Pantoténico)",
            "Vitamina B6 (Piridoxina)",
            "Vitamina B7 (Biotina)",
            "Vitamina B9 (Ácido Fólico)",
            "Vitamina B12 (Cianocobalamina o Metilcobalamina)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día, preferiblemente con una comida y un vaso de agua. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Siento un gran cambio en mi energía desde que tomo este Complejo B. Adiós al cansancio extremo y más concentración.",
                "author": "Marta G., 35 años"
            },
            {
                "text": "Es el impulso que necesitaba para mi día a día. Mis nervios están más tranquilos y me siento más vital. Excelente producto.",
                "author": "Jorge L., 47 años"
            }
            ]
        },
		
		"c16": {
        largeImage: "https://i.imgur.com/uQj68Jf.png",
        benefits: [
            "Ayuda a mantener niveles saludables de azúcar en la sangre.",
            "Contribuye al control de los niveles de colesterol.",
            "Apoya la regulación de la presión arterial dentro de rangos normales.",
            "Promueve la salud cardiovascular general.",
            "Fórmula natural para el bienestar metabólico integral.",
            "Actúa como un antioxidante protector."
        ],
        ingredients: [
            "Extracto de Canela (Cinnamomum verum)",
            "Melón Amargo (Momordica charantia)",
            "Berberina (si aplica)",
            "Ácido Alfa Lipoico",
            "Cromo (como Picolinato de Cromo)",
            "Ajo Negro (Allium sativum)",
            "Hibisco (Hibiscus sabdariffa)",
            "Fenogreco (Trigonella foenum-graecum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para mejores resultados, se recomienda un uso constante junto con un estilo de vida saludable. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tomando medicamentos para diabetes, colesterol o presión arterial.",
        testimonials: [
            {
                "text": "Estoy muy contenta con los resultados. Mis chequeos han mejorado y me siento mucho más tranquila sobre mi salud.",
                "author": "Ana R., 60 años"
            },
            {
                "text": "Un gran apoyo para mi bienestar general. Me ayuda a mantener a raya mis indicadores de salud de forma natural. Lo recomiendo.",
                "author": "José M., 68 años"
            }
            ]
        },
		
		"c17": {
        largeImage: "https://i.imgur.com/G7HThAX.png",
        benefits: [
            "Alivia las molestias estomacales y la acidez.",
            "Favorece una digestión suave y eficiente.",
            "Ayuda a proteger la mucosa gástrica e intestinal.",
            "Contribuye a reducir la hinchazón y los gases.",
            "Promueve el bienestar digestivo general.",
            "Ideal para calmar el estómago de forma natural."
        ],
        ingredients: [
            "Regaliz (Glycyrrhiza glabra)",
            "Manzanilla (Matricaria chamomilla)",
            "Aloe Vera (Aloe barbadensis Miller)",
            "Malvavisco (Althaea officinalis)",
            "Jengibre (Zingiber officinale)",
            "Bicarbonato de sodio (para el alivio de la acidez, si aplica)",
            "Carbonato de Calcio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas con agua antes o después de las comidas, o según sea necesario para el alivio digestivo. No exceder la dosis recomendada. Consulte a su médico si los síntomas persisten o si está embarazada, amamantando o tomando otros medicamentos.",
        testimonials: [
            {
                "text": "Gastrizan ha sido mi salvación para la acidez. Siento un alivio rápido y duradero. Lo recomiendo a todos con problemas estomacales.",
                "author": "Patricia L., 45 años"
            },
            {
                "text": "Ahora puedo disfrutar de mis comidas sin preocuparme por la indigestión. Me siento mucho más cómodo y mi digestión es excelente.",
                "author": "Ramón S., 58 años"
            }
            ]
        },
		
		"c18": {
        largeImage: "https://i.imgur.com/sx1JhBh.png",
        benefits: [
            "Ayuda a equilibrar las hormonas de forma natural.",
            "Alivia los síntomas de la menopausia y perimenopausia (sofocos, cambios de humor).",
            "Contribuye a la salud ósea y cardiovascular en la mujer.",
            "Promueve el bienestar emocional y reduce la irritabilidad.",
            "Favorece la vitalidad y el confort durante las etapas de cambio hormonal."
        ],
        ingredients: [
            "Isoflavonas de Soya (Glycine max)",
            "Cimicífuga Racemosa (Black Cohosh)",
            "Dong Quai (Angelica sinensis)",
            "Ñame Silvestre (Dioscorea villosa)",
            "Trébol Rojo (Trifolium pratense)",
            "Vitaminas del complejo B (si aplica)",
            "Vitamina D3 y Calcio (para soporte óseo, si aplica)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida, o según las indicaciones de su profesional de la salud. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene antecedentes de condiciones sensibles a hormonas.",
        testimonials: [
            {
                "text": "Desde que tomo Fito Hormonas, mis sofocos han disminuido y me siento mucho más equilibrada. ¡Una gran ayuda en esta etapa!",
                "author": "Carmen R., 52 años"
            },
            {
                "text": "Me ha ayudado a manejar los cambios de humor y a dormir mejor. Es un apoyo natural excelente para el balance hormonal.",
                "author": "Elena M., 48 años"
            }
            ]
        },
		
		"c19": {
        largeImage: "https://i.imgur.com/S3dlPET.png",
        benefits: [
            "Promueve la salud y flexibilidad de las articulaciones.",
            "Ayuda a regenerar el cartílago y reducir el desgaste.",
            "Alivia el dolor y la rigidez articular.",
            "Contribuye a mejorar la movilidad y el confort al moverse.",
            "Fortalece huesos, tendones y ligamentos.",
            "Soporte integral para la salud articular y ósea."
        ],
        ingredients: [
            "Glucosamina (Sulfato de Glucosamina)",
            "Colágeno Hidrolizado (Tipo II o Bovino/Marino)",
            "Cartílago de Tiburón",
            "Condroitina (Sulfato de Condroitina, si aplica)",
            "MSM (Metilsulfonilmetano, si aplica)",
            "Vitamina C (para la síntesis de colágeno, si aplica)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 2 cápsulas al día con una comida y un vaso de agua. Para obtener resultados óptimos, se recomienda un uso continuado durante al menos 3 meses. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene alergia al pescado o mariscos, o alguna condición médica.",
        testimonials: [
            {
                "text": "Mis rodillas se sienten mucho mejor desde que tomo este suplemento. La rigidez ha disminuido y puedo moverme con más facilidad.",
                "author": "Ramón D., 62 años"
            },
            {
                "text": "Es el apoyo perfecto para mis articulaciones después del ejercicio. Me ayuda a recuperarme más rápido y sin molestias. Muy recomendado.",
                "author": "Sofía T., 49 años"
            }
            ]
        },
		
		"c20": {
        largeImage: "https://i.imgur.com/qgUDB36.png",
        benefits: [
            "Apoya la salud y función hepática óptima.",
            "Contribuye a la desintoxicación natural del hígado.",
            "Ayuda a proteger el hígado de toxinas y daños.",
            "Promueve la regeneración de las células hepáticas.",
            "Actúa como un potente antioxidante para el bienestar general.",
            "Favorece una digestión saludable."
        ],
        ingredients: [
            "Extracto de Semilla de Cardo Mariano (Silybum marianum)",
            "Estandarizado a Silimarina (el compuesto activo)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida. No exceder la dosis recomendada. Para obtener mejores resultados, se recomienda un uso continuado. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica hepática preexistente.",
        testimonials: [
            {
                "text": "Mi hígado se siente mucho mejor y tengo más energía desde que tomo Cardo Mariano. ¡Un excelente desintoxicante natural!",
                "author": "Ricardo B., 55 años"
            },
            {
                "text": "Es el apoyo perfecto para mi hígado. Me ayuda a sentirme más ligero y a mantener mi sistema digestivo en forma. Lo recomiendo ampliamente.",
                "author": "Ana F., 48 años"
            }
            ]
        },
		
		"c21": {
        largeImage: "https://i.imgur.com/Nj7yx15.png",
        benefits: [
            "Superalimento rico en proteínas, vitaminas y minerales esenciales.",
            "Potente antioxidante que ayuda a combatir el estrés oxidativo.",
            "Contribuye a la desintoxicación natural del organismo.",
            "Aumenta los niveles de energía y vitalidad.",
            "Apoya el sistema inmunológico.",
            "Favorece el control del peso y la saciedad."
        ],
        ingredients: [
            "Alga Spirulina en polvo (Arthrospira platensis)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 2 cápsulas al día con un vaso de agua, preferiblemente antes de las comidas. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo Spirulina, mi energía se ha disparado y me siento mucho más vital. ¡Un complemento esencial para mi bienestar!",
                "author": "Carla S., 32 años"
            },
            {
                "text": "Me ayuda a desintoxicarme y a sentirme más ligera. Es el superalimento perfecto para complementar mi dieta diaria. Lo recomiendo.",
                "author": "Diego F., 45 años"
            }
            ]
        },
		
		"c22": {
        largeImage: "https://i.imgur.com/qEKTdul.png",
        benefits: [
            "Potencia la energía y reduce el cansancio y la fatiga.",
            "Apoya el funcionamiento saludable del sistema nervioso.",
            "Contribuye al metabolismo energético normal (Vitaminas B).",
            "Fortalece el sistema inmunitario (Vitamina D, Ginseng).",
            "Favorece la salud ósea y muscular (Vitamina D).",
            "Mejora la concentración y el rendimiento mental (Ginseng)."
        ],
        ingredients: [
            "Extracto de Ginseng (Panax ginseng)",
            "Vitamina B1 (Tiamina)",
            "Vitamina B2 (Riboflavina)",
            "Vitamina B6 (Piridoxina)",
            "Vitamina D (Colecalciferol)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene alguna condición médica o está tomando medicamentos.",
        testimonials: [
            {
                "text": "Siento una energía increíble durante todo el día y mi mente está mucho más clara. ¡La combinación perfecta para mi rutina!",
                "author": "Laura P., 40 años"
            },
            {
                "text": "Me ha ayudado muchísimo a superar la fatiga y a sentirme más fuerte, tanto física como mentalmente. Un excelente impulso.",
                "author": "Roberto F., 52 años"
            }
            ]
        },
		
		  "c23": {
        largeImage: "https://i.imgur.com/ma0KeR1.png",
        benefits: [
            "Apoya la salud del riñón y la vesícula biliar.",
            "Ayuda a la eliminación natural de cálculos renales y biliares (piedras).",
            "Contribuye a la desintoxicación del tracto urinario.",
            "Promueve una función renal saludable.",
            "Actúa como diurético natural para la eliminación de líquidos."
        ],
        ingredients: [
            "Extracto de Chanca Piedra (Phyllanthus niruri)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con un vaso de agua, preferiblemente antes de las comidas. Se recomienda beber abundante agua durante el uso. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, o tiene condiciones médicas preexistentes de riñón o vesícula.",
        testimonials: [
            {
                "text": "He tenido problemas renales por años y Chanca Piedra me ha ayudado a sentir un alivio notable. ¡Un gran apoyo natural!",
                "author": "Manuel A., 60 años"
            },
            {
                "text": "Siento que mi sistema urinario funciona mucho mejor y me siento más ligero. Un producto efectivo y natural.",
                "author": "Rosa B., 52 años"
            }
            ]
        },
		
		 "c24": {
        largeImage: "https://i.imgur.com/QBwg3aF.png",
        benefits: [
            "Ayuda a mantener niveles saludables de azúcar en la sangre.",
            "Contribuye al metabolismo normal de la glucosa.",
            "Apoya la sensibilidad a la insulina.",
            "Favorece la energía y reduce la fatiga asociada a desequilibrios de azúcar.",
            "Promueve el bienestar general en personas con preocupaciones de azúcar en la sangre."
        ],
        ingredients: [
            "Extracto de Melón Amargo (Momordica charantia)",
            "Canela (Cinnamomum verum)",
            "Picolinato de Cromo",
            "Ácido Alfa Lipoico",
            "Gimnema Silvestre (Gymnema sylvestre)",
            "Nopal (Opuntia ficus-indica)",
            "Extracto de Fenogreco (Trigonella foenum-graecum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para mejores resultados, se recomienda el uso continuo y un estilo de vida saludable. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tomando medicamentos para la diabetes.",
        testimonials: [
            {
                "text": "Desde que incorporé Diabetisan a mi rutina, he notado una mejora en la estabilidad de mis niveles de azúcar. Me siento más controlada y con más energía.",
                "author": "Sofía V., 60 años"
            },
            {
                "text": "Me ayuda a mantener mis niveles de glucosa bajo control de forma natural. Es un gran apoyo para mi salud metabólica.",
                "author": "Carlos R., 55 años"
            }
            ]
        },
		
		"c25": {
        largeImage: "https://i.imgur.com/wQXXyBc.png",
        benefits: [
            "Esencial para la salud ósea y la absorción de calcio.",
            "Fortalece el sistema inmunológico, ayudando a prevenir enfermedades.",
            "Contribuye al buen funcionamiento muscular.",
            "Apoya la salud cardiovascular.",
            "Influye positivamente en el estado de ánimo y el bienestar emocional.",
            "Fundamental para el equilibrio general del organismo."
        ],
        ingredients: [
            "Vitamina D3 (Colecalciferol)",
            "Aceite de girasol o coco (para mejor absorción, si es cápsula blanda)",
            "Cápsula blanda de gelatina o cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes (en caso de tabletas o cápsulas duras)."
        ],
        usage: "Tomar 1 cápsula o gota al día con una comida, o según las indicaciones de su profesional de la salud. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi médico me recomendó Vitamina D y he notado una gran mejora en mi energía y mi ánimo. ¡Esencial para el día a día!",
                "author": "Laura G., 48 años"
            },
            {
                "text": "Me ayuda a mantener mis huesos fuertes y a sentirme con más vitalidad, especialmente en los meses con menos sol. Un producto de calidad.",
                "author": "Roberto P., 60 años"
            }
            ]
        },
		
		 "c26": {
        largeImage: "https://i.imgur.com/yiIUVBf.png",
        benefits: [
            "Potente antioxidante que protege las células del daño.",
            "Fortalece el sistema inmunológico, ayudando a prevenir resfriados y gripes.",
            "Esencial para la formación de colágeno, mejorando la salud de la piel, huesos y encías.",
            "Contribuye a la absorción de hierro.",
            "Apoya la energía y reduce el cansancio y la fatiga.",
            "Favorece la salud cardiovascular."
        ],
        ingredients: [
            "Vitamina C (como Ácido Ascórbico o Ascorbato de Calcio/Sodio)",
            "Extractos cítricos (si aplica, para bioflavonoides)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para un refuerzo inmunitario extra, se puede tomar hasta 2 cápsulas al día, consultando a un profesional. No exceder la dosis recomendada. Consulte a su médico si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo Vitamina C, me siento con más defensas y energía. Es un básico para mi bienestar diario, especialmente en invierno.",
                "author": "Andrea G., 30 años"
            },
            {
                "text": "Mi piel luce más luminosa y mi sistema inmune está más fuerte. Un gran suplemento que no puede faltar en casa.",
                "author": "Javier R., 45 años"
            }
            ]
        },
		
		"c27": {
        largeImage: "https://i.imgur.com/w1RNnQd.png",
        benefits: [
            "Favorece la salud y elasticidad de la piel, ayudando a reducir la apariencia de celulitis y estrías.",
            "Contribuye a mejorar la circulación sanguínea, especialmente en las piernas.",
            "Apoya la cicatrización de heridas y la regeneración de tejidos.",
            "Ayuda a mejorar la función cognitiva y la memoria.",
            "Tiene propiedades antioxidantes y antiinflamatorias.",
            "Promueve el bienestar general y la vitalidad."
        ],
        ingredients: [
            "Extracto de Centella Asiática (Gotu Kola, Centella asiatica)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos en la piel, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "He notado una mejora increíble en la firmeza de mi piel y la reducción de celulitis. ¡La Centella Asiática es maravillosa!",
                "author": "Laura M., 39 años"
            },
            {
                "text": "Me ayuda a sentir las piernas más ligeras y a mejorar la circulación. Un producto natural muy eficaz.",
                "author": "Rosa P., 50 años"
            }
            ]
        },
		
		 "c28": {
        largeImage: "https://i.imgur.com/fuorVen.png",
        benefits: [
            "Ayuda a mejorar la circulación sanguínea en las piernas.",
            "Contribuye a reducir la hinchazón y la sensación de pesadez.",
            "Alivia las molestias y el cansancio asociados con las varices.",
            "Fortalece las paredes de los vasos sanguíneos y capilares.",
            "Promueve la salud venosa y el bienestar de las piernas."
        ],
        ingredients: [
            "Castaño de Indias (Aesculus hippocastanum)",
            "Rusco (Ruscus aculeatus)",
            "Vid Roja (Vitis vinifera)",
            "Ginkgo Biloba",
            "Vitamina C (para la producción de colágeno en vasos)",
            "Bioflavonoides Cítricos",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado y combinar con hábitos saludables para las piernas (ej. elevación, ejercicio). No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica circulatoria.",
        testimonials: [
            {
                "text": "Mis piernas se sienten mucho más ligeras y la hinchazón ha disminuido notablemente. ¡Varizan ha sido un gran descubrimiento!",
                "author": "Laura S., 58 años"
            },
            {
                "text": "Noto una mejoría en la apariencia de mis venas y la molestia es casi nula. Me da mucha más comodidad en mi día a día.",
                "author": "Mario P., 65 años"
            }
            ]
        },
		
		"c29": {
        largeImage: "https://i.imgur.com/Sa578cB.png",
        benefits: [
            "Esencial para la salud ósea y la absorción de calcio.",
            "Fortalece el sistema inmunológico, ayudando a prevenir enfermedades.",
            "Contribuye al buen funcionamiento muscular.",
            "Apoya la salud cardiovascular.",
            "Influye positivamente en el estado de ánimo y el bienestar emocional.",
            "Fundamental para el equilibrio general del organismo."
        ],
        ingredients: [
            "Vitamina D3 (Colecalciferol)",
            "Aceite de girasol o coco (para mejor absorción, si es cápsula blanda)",
            "Cápsula blanda de gelatina o cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes (en caso de tabletas o cápsulas duras)."
        ],
        usage: "Tomar 1 cápsula o gota al día con una comida, o según las indicaciones de su profesional de la salud. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi médico me recomendó Vitamina D y he notado una gran mejora en mi energía y mi ánimo. ¡Esencial para el día a día!",
                "author": "Laura G., 48 años"
            },
            {
                "text": "Me ayuda a mantener mis huesos fuertes y a sentirme con más vitalidad, especialmente en los meses con menos sol. Un producto de calidad.",
                "author": "Roberto P., 60 años"
            }
            ]
        },
		
		"c30": {
        largeImage: "https://i.imgur.com/GYKe7Hi.png",
        benefits: [
            "Contribuye al funcionamiento normal de músculos y nervios.",
            "Ayuda a mantener huesos y dientes fuertes y sanos.",
            "Apoya la reducción del cansancio y la fatiga.",
            "Favorece el equilibrio electrolítico en el cuerpo.",
            "Participa en el metabolismo energético y la producción de proteínas.",
            "Promueve un sueño reparador y la relajación."
        ],
        ingredients: [
            "Cloruro de Magnesio Hexahidratado",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales (si aplica en la presentación)."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con agua, preferiblemente con las comidas. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene problemas renales o alguna otra condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo Cloruro de Magnesio, mis calambres musculares han desaparecido y me siento con mucha más vitalidad. ¡Es increíble!",
                "author": "Manuel S., 62 años"
            },
            {
                "text": "Me ayuda a dormir profundamente y a sentirme más relajado. Un producto esencial para mi bienestar diario.",
                "author": "Patricia V., 50 años"
            }
            ]
        },
		
		"c31": {
        largeImage: "https://i.imgur.com/ELxjUz3.png",
        benefits: [
            "Apoya el equilibrio hormonal femenino natural.",
            "Contribuye al bienestar general del sistema reproductor femenino.",
            "Ayuda a aliviar molestias asociadas con el ciclo menstrual.",
            "Promueve una sensación de confort y vitalidad femenina.",
            "Fomenta la desintoxicación y la limpieza del organismo."
        ],
        ingredients: [
            "Extracto de Ñame Silvestre (Dioscorea villosa)",
            "Dong Quai (Angelica sinensis)",
            "Cimicífuga Racemosa (Black Cohosh)",
            "Sauzgatillo (Vitex agnus-castus)",
            "Maca (Lepidium meyenii)",
            "Extracto de Frambuesa (Rubus idaeus)",
            "Vitamina B6 (Piridoxina)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o si tiene alguna condición médica, especialmente si está bajo tratamiento médico.",
        testimonials: [
            {
                "text": "He notado un gran equilibrio en mi ciclo y me siento mucho más cómoda y con menos molestias. Un producto natural que realmente ayuda.",
                "author": "Patricia V., 40 años"
            },
            {
                "text": "Me ha proporcionado un bienestar general que antes no sentía. Me siento más armoniosa y con más vitalidad como mujer.",
                "author": "Isabel M., 48 años"
            }
            ]
        },
		
		"c32": {
        largeImage: "https://i.imgur.com/mrM1WqP.png",
        benefits: [
            "Potente acción antiinflamatoria natural para articulaciones y músculos.",
            "Fuerte capacidad antioxidante que protege las células del daño.",
            "Apoya la salud digestiva y alivia molestias estomacales.",
            "Contribuye al bienestar del sistema inmunológico.",
            "Mejora la absorción de los nutrientes (gracias a la pimienta negra).",
            "Promueve la salud cerebral y cardiovascular."
        ],
        ingredients: [
            "Extracto de Raíz de Cúrcuma (Curcuma longa)",
            "Extracto de Raíz de Jengibre (Zingiber officinale)",
            "Extracto de Pimienta Negra (Piper nigrum, estandarizado a Piperina)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando anticoagulantes o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mis dolores articulares han disminuido mucho desde que tomo este suplemento. La combinación es realmente efectiva y me siento más ágil.",
                "author": "Sofía D., 58 años"
            },
            {
                "text": "Un excelente antiinflamatorio natural que también me ayuda con la digestión. Siento una gran diferencia en mi bienestar general.",
                "author": "Marco V., 45 años"
            }
            ]
        },
		
		 "c33": {
        largeImage: "https://i.imgur.com/LLUeKZV.png",
        benefits: [
            "Esencial para mantener huesos y dientes fuertes y sanos.",
            "Contribuye al funcionamiento normal de músculos y nervios.",
            "Fortalece el sistema inmunológico y las defensas del cuerpo.",
            "Ayuda a reducir el cansancio y la fatiga.",
            "Favorece un sueño reparador y la relajación.",
            "Vital para el metabolismo energético y la división celular."
        ],
        ingredients: [
            "Calcio (como Carbonato de Calcio o Citrato de Calcio)",
            "Magnesio (como Óxido de Magnesio o Citrato de Magnesio)",
            "Zinc (como Citrato de Zinc o Gluconato de Zinc)",
            "Vitamina D3 (Colecalciferol, para la absorción de Calcio)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Desde que tomo este suplemento, siento mis huesos más fuertes y duermo mucho mejor. ¡La combinación perfecta!",
                "author": "Elena G., 58 años"
            },
            {
                "text": "Me ha ayudado a mejorar mi energía y mi sistema inmune. Es un básico para mi salud diaria. Muy recomendado.",
                "author": "Pedro S., 45 años"
            }
            ]
        },
		
		"c34": {
        largeImage: "https://i.imgur.com/TDlMM9l.png",
        benefits: [
            "Potente apoyo para el sistema inmunológico.",
            "Ayuda a reducir la inflamación y el dolor articular.",
            "Contribuye a la salud digestiva y alivia molestias intestinales.",
            "Actúa como un antioxidante natural.",
            "Promueve el bienestar general y la vitalidad."
        ],
        ingredients: [
            "Extracto de Corteza de Uña de Gato (Uncaria tomentosa)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica, especialmente autoinmunes o trasplantes.",
        testimonials: [
            {
                "text": "Mis articulaciones se sienten mucho mejor y mi sistema inmune está más fuerte. ¡Uña de Gato es un aliado increíble para mi salud!",
                "author": "Laura F., 50 años"
            },
            {
                "text": "Noto una gran diferencia en mi bienestar general y mi digestión. Un producto natural que realmente me ayuda a sentirme mejor.",
                "author": "Ricardo H., 62 años"
            }
            ]
        },
		
		"c35": {
        largeImage: "https://i.imgur.com/Tytc1yu.png",
        benefits: [
            "Apoya la salud y función hepática óptima.",
            "Contribuye a la desintoxicación natural del hígado.",
            "Ayuda a proteger el hígado de toxinas y daños.",
            "Promueve la regeneración de las células hepáticas.",
            "Actúa como un potente antioxidante para el bienestar general.",
            "Favorece una digestión saludable."
        ],
        ingredients: [
            "Extracto de Semilla de Cardo Mariano (Silybum marianum)",
            "Estandarizado a Silimarina (el compuesto activo)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida. No exceder la dosis recomendada. Para obtener mejores resultados, se recomienda un uso continuado. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica hepática preexistente.",
        testimonials: [
            {
                "text": "Mi hígado se siente mucho mejor y tengo más energía desde que tomo Cardo Mariano. ¡Un excelente desintoxicante natural!",
                "author": "Ricardo B., 55 años"
            },
            {
                "text": "Es el apoyo perfecto para mi hígado. Me ayuda a sentirme más ligero y a mantener mi sistema digestivo en forma. Lo recomiendo ampliamente.",
                "author": "Ana F., 48 años"
            }
            ]
        },
		
		"c36": {
        largeImage: "https://i.imgur.com/fKGoM4t.png",
        benefits: [
            "Promueve la salud y el bienestar óptimo de la próstata.",
            "Ayuda a mantener una función urinaria normal y un flujo saludable.",
            "Contribuye a reducir la inflamación y las molestias urinarias.",
            "Formulado con ingredientes naturales para el cuidado masculino.",
            "Apoya la vitalidad y la calidad de vida en hombres."
        ],
        ingredients: [
            "Extracto de Saw Palmetto (Serenoa repens)",
            "Pygeum Africanum",
            "Licopeno",
            "Zinc (como Citrato de Zinc)",
            "Selenio (como Selenometionina)",
            "Ortiga (Urtica dioica)",
            "Extracto de Semilla de Calabaza",
            "Maca Negra (Lepidium meyenii, si aplica por origen peruano)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida. Se recomienda el uso continuo para obtener mejores resultados. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene alguna condición médica o está bajo medicación.",
        testimonials: [
            {
                "text": "Desde que tomo Bio Prost, he notado una gran mejora en mi flujo urinario y en mi bienestar general. ¡Es un alivio!",
                "author": "Juan C., 68 años"
            },
            {
                "text": "Un producto natural excelente que realmente apoya la salud de la próstata. Me siento con más confort y confianza.",
                "author": "Felipe R., 62 años"
            }
            ]
        },
		
		"c37": {
        largeImage: "https://i.imgur.com/GjVC9YV.png",
        benefits: [
            "Promueve la regularidad intestinal y un tránsito saludable.",
            "Ayuda a limpiar el colon de toxinas acumuladas.",
            "Contribuye a aliviar las molestias asociadas con las hemorroides.",
            "Favorece la desinflamación y el confort en la zona anal.",
            "Apoya la salud digestiva general y el bienestar intestinal."
        ],
        ingredients: [
            "Psyllium Husk (fibra soluble)",
            "Linaza (Linum usitatissimum)",
            "Aloe Vera (Aloe barbadensis Miller)",
            "Castaño de Indias (Aesculus hippocastanum)",
            "Rusco (Ruscus aculeatus)",
            "Sen (Cassia angustifolia, en dosis moderadas para colon clean)",
            "Cáscara Sagrada (Rhamnus purshiana, en dosis moderadas)",
            "Jengibre (Zingiber officinale)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 2 cápsulas al día con un vaso grande de agua, preferiblemente antes de dormir o en ayunas. Es crucial beber abundante agua durante el día. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene alguna condición intestinal preexistente o está tomando laxantes.",
        testimonials: [
            {
                "text": "Desde que tomo Colon Clean, mi digestión es mucho más regular y he sentido un gran alivio en las molestias de las hemorroides. ¡Excelente!",
                "author": "Martha R., 55 años"
            },
            {
                "text": "Me ayuda a sentirme más ligero y a mantener mi colon limpio. Además, ha reducido la incomodidad considerablemente. Lo recomiendo.",
                "author": "Carlos G., 48 años"
            }
            ]
        },
		
		"c38": {
        largeImage: "https://i.imgur.com/igMh4gA.png",
        benefits: [
            "Ayuda a regular el ciclo menstrual de forma natural.",
            "Alivia los síntomas del Síndrome Premenstrual (SPM) como hinchazón, irritabilidad y cólicos.",
            "Contribuye al equilibrio hormonal femenino.",
            "Reduce las molestias y la irregularidad del periodo.",
            "Promueve el bienestar y confort durante todo el ciclo."
        ],
        ingredients: [
            "Sauzgatillo (Vitex agnus-castus)",
            "Dong Quai (Angelica sinensis)",
            "Cohosh Negro (Cimicífuga racemosa)",
            "Ñame Silvestre (Dioscorea villosa)",
            "Maca (Lepidium meyenii)",
            "Extracto de Frambuesa (Rubus idaeus)",
            "Vitamina B6 (Piridoxina)",
            "Magnesio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda el uso continuo durante al menos 2-3 ciclos. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o si tiene alguna condición médica, especialmente trastornos hormonales.",
        testimonials: [
            {
                "text": "Mi ciclo se ha vuelto mucho más regular y los cólicos son casi inexistentes. ¡Me siento una nueva persona durante mi periodo!",
                "author": "Andrea N., 28 años"
            },
            {
                "text": "Ha reducido drásticamente mis cambios de humor y la hinchazón antes del periodo. Es un gran apoyo natural para mi bienestar mensual.",
                "author": "Paola S., 35 años"
            }
            ]
        },
		
		"c39": {
        largeImage: "https://i.imgur.com/pMUeyay.png",
        benefits: [
            "Mejora la elasticidad y firmeza de la piel, reduciendo arrugas y líneas de expresión.",
            "Fortalece el cabello, las uñas y promueve su crecimiento saludable.",
            "Apoya la salud de las articulaciones, tendones y ligamentos, reduciendo el dolor.",
            "Contribuye a la regeneración de cartílagos y tejidos conectivos.",
            "Favorece la salud ósea y la densidad mineral.",
            "Promueve la salud intestinal y la digestión."
        ],
        ingredients: [
            "Colágeno Hidrolizado (Bovino, Marino o de Pollo, especificar fuente si es posible)",
            "Vitamina C (para la síntesis de colágeno)",
            "Ácido Hialurónico (si aplica para mayor beneficio en piel/articulaciones)",
            "Biotina (para cabello y uñas, si aplica)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con agua, preferiblemente en ayunas o antes de dormir. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi piel se ve más tersa y mis uñas están mucho más fuertes. ¡El Colágeno es un antes y un después en mi rutina de belleza!",
                "author": "Ana S., 45 años"
            },
            {
                "text": "Noto una gran mejoría en mis articulaciones, menos crujidos y más flexibilidad. Un excelente suplemento para mantenerme activo.",
                "author": "Pedro M., 58 años"
            }
            ]
        },
		
		"c40": {
        largeImage: "https://i.imgur.com/Gr4875z.png",
        benefits: [
            "Promueve la salud y flexibilidad de las articulaciones.",
            "Contribuye a la regeneración y protección del cartílago.",
            "Fortalece huesos, tendones y ligamentos.",
            "Ayuda a reducir el dolor y la inflamación articular.",
            "Apoya la función muscular normal y la reducción de calambres.",
            "Mejora la elasticidad de la piel y el bienestar general."
        ],
        ingredients: [
            "Colágeno Hidrolizado",
            "Cartílago de Tiburón",
            "Magnesio (como Citrato de Magnesio, Cloruro de Magnesio, o similar)",
            "Vitamina C (para la síntesis de colágeno, si aplica)",
            "Condroitina y Glucosamina (presentes en cartílago de tiburón, o añadidas)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene alergia al pescado/mariscos o alguna condición médica.",
        testimonials: [
            {
                "text": "Mis articulaciones se sienten mucho más lubricadas y flexibles. El dolor ha disminuido considerablemente. ¡Una combinación muy efectiva!",
                "author": "Alberto G., 65 años"
            },
            {
                "text": "Noto que mi recuperación post-ejercicio es mejor y mis huesos se sienten más fuertes. El magnesio además me ayuda a relajarme. Excelente producto.",
                "author": "María P., 50 años"
            }
            ]
        },
			
		"c40": {
        largeImage: "https://i.imgur.com/Gr4875z.png",
        benefits: [
            "Promueve la salud y flexibilidad de las articulaciones.",
            "Contribuye a la regeneración y protección del cartílago.",
            "Fortalece huesos, tendones y ligamentos.",
            "Ayuda a reducir el dolor y la inflamación articular.",
            "Apoya la función muscular normal y la reducción de calambres.",
            "Mejora la elasticidad de la piel y el bienestar general."
        ],
        ingredients: [
            "Colágeno Hidrolizado",
            "Cartílago de Tiburón",
            "Magnesio (como Citrato de Magnesio, Cloruro de Magnesio, o similar)",
            "Vitamina C (para la síntesis de colágeno, si aplica)",
            "Condroitina y Glucosamina (presentes en cartílago de tiburón, o añadidas)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene alergia al pescado/mariscos o alguna condición médica.",
        testimonials: [
            {
                "text": "Mis articulaciones se sienten mucho más lubricadas y flexibles. El dolor ha disminuido considerablemente. ¡Una combinación muy efectiva!",
                "author": "Alberto G., 65 años"
            },
            {
                "text": "Noto que mi recuperación post-ejercicio es mejor y mis huesos se sienten más fuertes. El magnesio además me ayuda a relajarme. Excelente producto.",
                "author": "María P., 50 años"
            }
            ]
        },
			
		"c41": {
        largeImage: "https://i.imgur.com/LKAOmrB.png",
        benefits: [
            "Apoya la salud de la próstata y la función urinaria en hombres.",
            "Contribuye a reducir los síntomas asociados con el agrandamiento benigno de la próstata (BPH).",
            "Ayuda a mejorar el flujo urinario y la frecuencia.",
            "Puede contribuir a la salud del cabello y reducir la caída en hombres.",
            "Fomenta el bienestar general y la calidad de vida masculina."
        ],
        ingredients: [
            "Extracto de Fruto de Saw Palmetto (Serenoa repens)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si tiene alguna condición médica o está tomando medicamentos, especialmente para la próstata.",
        testimonials: [
            {
                "text": "Desde que tomo Saw Palmetto, he notado una gran mejora en mis visitas nocturnas al baño. ¡Me siento mucho mejor!",
                "author": "Roberto C., 65 años"
            },
            {
                "text": "Un producto natural excelente para la próstata. Me ha ayudado a sentirme más cómodo y con un flujo urinario más normal. Totalmente recomendado.",
                "author": "Luis F., 59 años"
            }
            ]
        },
			
		"c42": {
        largeImage: "https://i.imgur.com/lCxXrKu.png",
        benefits: [
            "Fortalece el cabello, promoviendo su crecimiento saludable y reduciendo la caída.",
            "Mejora la salud de las uñas, haciéndolas más fuertes y menos quebradizas.",
            "Contribuye a una piel radiante y saludable.",
            "Esencial para el metabolismo de carbohidratos, grasas y proteínas.",
            "Apoya la energía y la función del sistema nervioso."
        ],
        ingredients: [
            "Biotina (Vitamina B7 o H)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos en cabello y uñas, se recomienda un uso continuado de al menos 3 meses. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi cabello está más grueso y brillante que nunca. ¡La Biotina realmente funciona para la salud capilar!",
                "author": "Sofía V., 30 años"
            },
            {
                "text": "Mis uñas ya no se rompen con facilidad y mi piel luce mucho mejor. Un básico para mi rutina de belleza y bienestar.",
                "author": "Andrea G., 42 años"
            }
            ]
        },
			
		"c43": {
        largeImage: "https://i.imgur.com/apK9Mrp.png",
        benefits: [
            "Ayuda a la desintoxicación y depuración del hígado.",
            "Contribuye a la reducción de la grasa acumulada en el hígado.",
            "Favorece la regeneración de las células hepáticas.",
            "Apoya la función digestiva y el metabolismo de las grasas.",
            "Promueve el bienestar general y la energía.",
            "Protege el hígado contra el daño oxidativo."
        ],
        ingredients: [
            "Extracto de Cardo Mariano (Silybum marianum)",
            "Boldo (Peumus boldus)",
            "Alcachofa (Cynara scolymus)",
            "Diente de León (Taraxacum officinale)",
            "Colina (como Bitartrato de Colina)",
            "Inositol",
            "Metionina",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado y un estilo de vida saludable. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tiene alguna condición hepática grave o está bajo medicación.",
        testimonials: [
            {
                "text": "Mi médico me recomendó un apoyo para el hígado graso y este producto ha sido excelente. Siento mi digestión mucho mejor y más energía.",
                "author": "Ricardo G., 55 años"
            },
            {
                "text": "Noto una gran diferencia en mi bienestar general. Me siento más ligero y mi hígado funciona de manera más eficiente. Muy contento con los resultados.",
                "author": "Sofía C., 48 años"
            }
            ]
        },
			
		"c44": {
        largeImage: "https://i.imgur.com/xBMUggB.png",
        benefits: [
            "Ayuda a conciliar el sueño más rápidamente.",
            "Mejora la calidad del sueño, permitiendo un descanso más profundo y reparador.",
            "Contribuye a regular el ciclo natural de sueño-vigilia (ritmo circadiano).",
            "Alivia los síntomas del jet lag y la adaptación a nuevos horarios.",
            "Reduce el insomnio ocasional y promueve la relajación antes de dormir."
        ],
        ingredients: [
            "Melatonina",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula 30 minutos antes de acostarse con un vaso de agua. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando otros medicamentos (especialmente sedantes o anticoagulantes) o tiene alguna condición médica. Evitar conducir u operar maquinaria pesada después de tomarla.",
        testimonials: [
            {
                "text": "Desde que tomo Melatonina, duermo toda la noche sin interrupciones. Me levanto renovado y con energía. ¡Es un salvavidas!",
                "author": "María G., 55 años"
            },
            {
                "text": "Me ayuda a regular mi sueño cuando viajo o cuando mis horarios cambian. Es suave pero efectiva. Muy recomendable para el insomnio ocasional.",
                "author": "Andrés P., 40 años"
            }
            ]
        },
			
		"c45": {
        largeImage: "https://i.imgur.com/60peIsC.png",
        benefits: [
            "Estimula la regeneración celular para una piel más joven y radiante.",
            "Fortalece el cabello desde la raíz, promoviendo su crecimiento y reduciendo la caída.",
            "Mejora la salud y fortaleza de las uñas, evitando la fragilidad.",
            "Ayuda a reparar y revitalizar tejidos, contribuyendo a una apariencia más juvenil.",
            "Aporta un brillo natural a la piel y el cabello, mejorando su textura."
        ],
        ingredients: [
            "Células Madre Vegetales (por ejemplo, de argán, manzana o uva)",
            "Biotina (Vitamina B7 o H)",
            "Colágeno Hidrolizado (si aplica para sinergia)",
            "Vitamina C (como antioxidante y para síntesis de colágeno)",
            "Extractos botánicos (ej. Ginseng, Cola de caballo, si aplican)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos en piel, cabello y uñas, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi piel luce increíblemente más suave y mis líneas de expresión se han atenuado. El cabello también ha mejorado muchísimo. ¡Una fórmula potente!",
                "author": "Laura M., 50 años"
            },
            {
                "text": "Siento una revitalización general. Mis uñas están irrompibles y mi cabello tiene un brillo asombroso. Es el secreto para sentirme y verme más joven.",
                "author": "Alejandra P., 42 años"
            }
            ]
        },
			
		"c46": {
        largeImage: "https://i.imgur.com/wThCyy1.png",
        benefits: [
            "Fuente rica en Vitaminas del Complejo B para energía y vitalidad.",
            "Ayuda a fortalecer el cabello, la piel y las uñas.",
            "Contribuye a una digestión saludable y al equilibrio de la flora intestinal.",
            "Apoya el sistema inmunológico.",
            "Promueve la salud nerviosa y reduce la fatiga.",
            "Aporta proteínas y aminoácidos esenciales."
        ],
        ingredients: [
            "Levadura de Cerveza (Saccharomyces cerevisiae)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 a 2 cápsulas al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Mi piel luce mucho más clara y mi cabello está más fuerte. La Levadura de Cerveza ha sido un gran aliado para mi belleza y energía.",
                "author": "Laura F., 35 años"
            },
            {
                "text": "Me siento con más energía y mi digestión ha mejorado notablemente. Un suplemento natural muy completo para el día a día.",
                "author": "Carlos V., 48 años"
            }
            ]
        },
			
		"c47": {
        largeImage: "https://i.imgur.com/FbD8ory.png",
        benefits: [
            "Potente fórmula antienvejecimiento que ayuda a combatir el daño celular.",
            "Aumenta los niveles de energía celular y la vitalidad general.",
            "Contribuye a la salud cardiovascular y la función cardíaca.",
            "Apoya la función cerebral, la memoria y la concentración.",
            "Actúa como un fuerte antioxidante que protege el cuerpo contra el estrés oxidativo.",
            "Promueve la longevidad y el bienestar a nivel celular."
        ],
        ingredients: [
            "NAD+ (Nicotinamida Adenina Dinucleótido)",
            "Resveratrol",
            "Coenzima Q10 (CoQ10)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado como parte de un régimen de bienestar. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando anticoagulantes o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Siento una energía renovada y mi piel luce más joven. ¡Esta combinación es un verdadero impulso antiedad!",
                "author": "Isabel R., 55 años"
            },
            {
                "text": "Mi claridad mental ha mejorado y me siento con más vitalidad en el día a día. Es un suplemento esencial para mi salud a largo plazo.",
                "author": "Carlos S., 62 años"
            }
            ]
        },
			
		"c48": {
        largeImage: "https://i.imgur.com/lAYKg7O.png",
        benefits: [
            "Potencia la producción de energía celular y la vitalidad.",
            "Ayuda a ralentizar los procesos de envejecimiento a nivel celular.",
            "Contribuye a la reparación del ADN y la salud general de las células.",
            "Favorece la función cognitiva, la claridad mental y la memoria.",
            "Apoya el metabolismo saludable y la salud cardiovascular.",
            "Incrementa la resistencia y el rendimiento físico."
        ],
        ingredients: [
            "NAD+ (Nicotinamida Adenina Dinucleótido) 1500mg",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con un vaso de agua, preferiblemente con una comida. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Siento una energía y vitalidad que no recordaba. Mi concentración ha mejorado muchísimo. ¡Este NAD+ de 1500mg es increíble!",
                "author": "Roberto P., 60 años"
            },
            {
                "text": "Es el impulso que necesitaba para mi día a día. Me siento más joven y mis células, literalmente, tienen más vida. Un cambio notable.",
                "author": "Ana L., 55 años"
            }
            ]
        },
			
		"c49": {
        largeImage: "https://i.imgur.com/J2c4hLD.png",
        benefits: [
            "Potente antioxidante que ayuda a proteger las células del daño de los radicales libres.",
            "Contribuye a la salud cardiovascular y al buen funcionamiento del corazón.",
            "Apoya la longevidad celular y los procesos antienvejecimiento.",
            "Favorece la salud cerebral y la función cognitiva.",
            "Ayuda a mantener niveles saludables de inflamación en el cuerpo."
        ],
        ingredients: [
            "Resveratrol (de Polygonum cuspidatum o uva roja)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado como parte de un estilo de vida saludable. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando anticoagulantes o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Me siento más joven y con más energía desde que tomo Resveratrol. Es mi secreto para el bienestar general y el antienvejecimiento.",
                "author": "Elena V., 50 años"
            },
            {
                "text": "He notado una mejora en mi vitalidad y mi piel luce más radiante. Un excelente antioxidante que recomiendo a todos.",
                "author": "Sergio L., 58 años"
            }
            ]
        },
				
		"c50": {
        largeImage: "https://i.imgur.com/aCi8mjK.png",
        benefits: [
            "Potencia la energía celular y la vitalidad general.",
            "Ayuda a proteger las células del daño oxidativo (acción antioxidante).",
            "Contribuye a la reparación del ADN y los procesos antienvejecimiento.",
            "Favorece la salud cardiovascular y la circulación.",
            "Apoya la función cerebral y la claridad mental.",
            "Promueve la longevidad y el bienestar a nivel celular."
        ],
        ingredients: [
            "NAD+ (Nicotinamida Adenina Dinucleótido)",
            "Resveratrol (de origen natural, como Polygonum cuspidatum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado como parte de un régimen de bienestar. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando, tomando anticoagulantes o tiene alguna condición médica.",
        testimonials: [
            {
                "text": "Siento una energía renovada y mi piel luce más joven. ¡Esta combinación es un verdadero impulso antiedad!",
                "author": "Isabel R., 55 años"
            },
            {
                "text": "Mi claridad mental ha mejorado y me siento con más vitalidad en el día a día. Es un suplemento esencial para mi salud a largo plazo.",
                "author": "Carlos S., 62 años"
            }
            ]
        },
				
		 "c51": {
        largeImage: "https://i.imgur.com/88LxZhe.png",
        benefits: [
            "Ayuda a **reducir el estrés y la ansiedad**, promoviendo la calma y la relajación.",
            "Mejora la **calidad del sueño**, contribuyendo a un descanso más profundo y reparador.",
            "Apoya la **función cognitiva**, mejorando la memoria y la concentración.",
            "Incrementa la **energía y la resistencia física**, combatiendo la fatiga.",
            "Fortalece el **sistema inmunológico** y la capacidad del cuerpo para adaptarse al estrés.",
            "Contribuye al **equilibrio hormonal** y al bienestar general."
        ],
        ingredients: [
            "Extracto de Raíz de **Ashwagandha** (Withania somnifera) 500mg",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomar 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, se recomienda un uso continuado como parte de un estilo de vida saludable. No exceder la dosis recomendada. Consulte a su médico antes de usar si está embarazada, amamantando o tiene alguna condición médica o está tomando medicamentos."
    },
		
				
		"c52": {
        largeImage: "https://i.imgur.com/0Wy1fAG.png",
        benefits: [
            "Ayuda a manejar el **estrés y la ansiedad**, promoviendo una sensación de calma.",
            "Mejora la **calidad del sueño**, facilitando un descanso reparador.",
            "Aumenta la **energía y la resistencia** física, combatiendo la fatiga.",
            "Contribuye a la **claridad mental y la concentración**.",
            "Fortalece el **sistema inmunológico** y la capacidad de adaptación del cuerpo.",
            "Favorece el **equilibrio hormonal** y el bienestar general."
        ],
        ingredients: [
            "Extracto de Raíz de **Ashwagandha** (Withania somnifera) 600mg",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 cápsula al día con una comida y un vaso de agua. Para resultados óptimos, te recomendamos un uso continuado como parte de un estilo de vida saludable. No excedas la dosis recomendada. Si estás embarazada, amamantando, tienes alguna condición médica o estás tomando otros medicamentos, consulta a tu médico antes de usarla."
    },
		
		"c53": {
        largeImage: "https://i.imgur.com/isEX2YJ.png",
        benefits: [
            "Hidrata profundamente la piel, mejorando su elasticidad y firmeza.",
            "Ayuda a reducir la apariencia de arrugas y líneas finas.",
            "Contribuye a la lubricación y salud de las articulaciones.",
            "Promueve la cicatrización de la piel y la regeneración de tejidos.",
            "Aporta un aspecto más joven y radiante a la piel desde el interior."
        ],
        ingredients: [
            "Ácido Hialurónico (de origen vegetal o fermentación)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 cápsula al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos en piel y articulaciones, se recomienda el uso continuado. No excedas la dosis recomendada. Si estás embarazada, amamantando o tienes alguna condición médica, consulta a tu médico antes de usarlo."
    },
	
	 "c54": {
        largeImage: "https://i.imgur.com/1S6CIJ5.png",
        benefits: [
            "Aumenta los **niveles de energía** y reduce la fatiga.",
            "Mejora la **fuerza y resistencia** física.",
            "Contribuye a la **salud cognitiva**, mejorando la memoria y el enfoque.",
            "Actúa como un potente **antioxidante** y antiinflamatorio.",
            "Favorece la **desintoxicación** natural del cuerpo.",
            "Apoya la **salud hormonal** y la vitalidad general."
        ],
        ingredients: [
            "Extracto purificado de **Shilajit** (asphaltum punjabianum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 cápsula al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos, te recomendamos un uso continuado como parte de un estilo de vida saludable. No excedas la dosis recomendada. Si estás embarazada, amamantando o tienes alguna condición médica, consulta a tu médico antes de usarlo."
    },
	
	 "c55": {
        largeImage: "https://i.imgur.com/cL4K2PH.png",
        benefits: [
            "Mejora significativamente la **memoria, el aprendizaje y la concentración**.",
            "Ayuda a **reducir la niebla mental** y promueve la claridad cognitiva.",
            "Contribuye a la **calidad del sueño**, facilitando un descanso más profundo y reparador.",
            "Apoya la **salud cerebral** a largo plazo y la plasticidad sináptica.",
            "Puede ayudar a **reducir la ansiedad y el estrés**, promoviendo la relajación."
        ],
        ingredients: [
            "L-Treonato de Magnesio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente una por la mañana y otra 30 minutos antes de dormir, o según la indicación de tu profesional de la salud. No excedas la dosis recomendada. Si estás embarazada, amamantando o tienes alguna condición médica, consulta a tu médico antes de usarlo."
    },
	
	 "c56": {
        largeImage: "https://i.imgur.com/KkSQqin.png",
        benefits: [
            "Ayuda a **reducir el cansancio y la fatiga**, aumentando la energía.",
            "Contribuye al funcionamiento normal de **músculos y nervios**.",
            "Promueve la **salud ósea y dental**.",
            "Favorece la **relajación y un sueño reparador**.",
            "Apoya la **salud digestiva** y la regularidad intestinal.",
            "Participa en el **metabolismo energético**."
        ],
        ingredients: [
            "Citrato de Magnesio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. No excedas la dosis recomendada. Si estás embarazada, amamantando, tienes problemas renales o alguna otra condición médica, consulta a tu médico antes de usarlo."
    },
	
	"c57": {
        largeImage: "https://i.imgur.com/1915WhN.png",
        benefits: [
            "Apoya el **equilibrio de electrolitos** esencial para el funcionamiento celular.",
            "Contribuye a la **salud muscular** y previene calambres.",
            "Ayuda a mantener una **presión arterial saludable** dentro de los rangos normales.",
            "Favorece la **salud ósea y nerviosa**.",
            "Promueve la **energía** y reduce la fatiga.",
            "Soporta la **función renal** y la hidratación adecuada."
        ],
        ingredients: [
            "Citrato de Magnesio",
            "Citrato de Potasio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. No excedas la dosis recomendada. Si estás embarazada, amamantando, tienes problemas renales, cardíacos o alguna otra condición médica, consulta a tu médico antes de usarlo."
    },
	
	"c58": {
        largeImage: "https://i.imgur.com/uYLHjhR.png",
        benefits: [
            "Favorece una **relajación profunda** y ayuda a **reducir el estrés y la ansiedad**.",
            "Mejora la **calidad del sueño**, facilitando un descanso reparador sin interrupciones.",
            "Contribuye al funcionamiento normal de **músculos y nervios**, aliviando calambres y tensiones.",
            "Promueve la **salud ósea y cardiovascular**.",
            "Alta **biodisponibilidad** para una mejor absorción y menor riesgo de molestias digestivas.",
            "Ayuda a **reducir el cansancio y la fatiga**, incrementando los niveles de energía."
        ],
        ingredients: [
            "Glicinato de Magnesio",
            "Citrato de Magnesio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida o antes de dormir. No excedas la dosis recomendada. Si estás embarazada, amamantando, tienes problemas renales o alguna otra condición médica, consulta a tu médico antes de usarlo."
    },
	
	 "c59": {
        largeImage: "https://i.imgur.com/lcy3Yj2.png",
        benefits: [
            "Apoya la **función cognitiva**, mejorando la memoria, el enfoque y la claridad mental.",
            "Estimula el **crecimiento nervioso** y la regeneración cerebral.",
            "Ayuda a **reducir la ansiedad y la depresión**, promoviendo un estado de ánimo equilibrado.",
            "Fortalece el **sistema inmunológico**.",
            "Contribuye a la **salud digestiva**, beneficiando la flora intestinal.",
            "Protege contra el **daño neuronal** y el envejecimiento cerebral."
        ],
        ingredients: [
            "Extracto de **Melena de León** (Hericium erinaceus)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos, te recomendamos un uso continuado. No excedas la dosis recomendada. Si estás embarazada, amamantando o tienes alguna condición médica, consulta a tu médico antes de usarlo."
    },
	
	"c60": {
        largeImage: "https://i.imgur.com/2cjHplg.png",
        benefits: [
            "Mejora la Circulación Sanguínea: Favorece el ensanchamiento de los vasos sanguíneos, optimizando el flujo de sangre a órganos y músculos.",
			"Aumenta la Energía y Resistencia: Al mejorar el suministro de oxígeno y nutrientes a las células, incrementa tu vitalidad y rendimiento físico.",
			"Apoya la Salud Cardiovascular: Contribuye a mantener una presión arterial saludable y la elasticidad de las arterias.",
			"Promueve la Función Sexual: Un mejor flujo sanguíneo es crucial para una función eréctil saludable en hombres.",
			"Ayuda en la Recuperación Muscular: Facilita la entrega de nutrientes a los músculos, acelerando la recuperación después del ejercicio.",
			"Fortalece el Sistema Inmunológico: Participa en la producción de células inmunitarias, mejorando las defensas del cuerpo.",
        ],
        ingredients: [
            "L-Arginina HCl",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales"
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con el estómago vacío para una mejor absorción, o según las indicaciones de tu profesional de la salud. Para potenciar sus efectos, te recomendamos un uso continuado como parte de un estilo de vida activo. No excedas la dosis recomendada."
    },
		
		 "c61": {
        largeImage: "https://i.imgur.com/290VT7K.png",
        benefits: [
            "Potente **antioxidante** que combate los radicales libres, protegiendo tus células del daño oxidativo y apoyando un envejecimiento saludable.",
            "Fuente de **energía natural** que contribuye a reducir el cansancio y la fatiga, dándote un impulso de vitalidad.",
            "**Apoyo inmunológico** que fortalece las defensas de tu cuerpo, ayudándote a mantenerte fuerte y resistente.",
            "**Desintoxicación suave** que contribuye a los procesos naturales de limpieza de tu organismo.",
            "Rica en **nutrientes esenciales** como vitaminas, minerales y aminoácidos que complementan tu dieta diaria."
        ],
        ingredients: [
            "Extracto de **Espirulina Azul** (Phycocyanin)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. Te recomendamos un uso continuado para integrar sus beneficios en tu estilo de vida. No excedas la dosis recomendada. Si estás embarazada, amamantando o tienes alguna condición médica, consulta a tu médico antes de usar este producto."
    },
	
	"c62": {
        largeImage: "https://i.imgur.com/67yqkeP.png",
        benefits: [
            "**Fortalece el sistema inmunológico**, mejorando las defensas naturales del cuerpo.",
            "Ayuda a **combatir infecciones** y reduce la severidad de las enfermedades.",
            "Promueve la **salud intestinal** al reparar y sellar la barrera del intestino.",
            "Apoya la **recuperación muscular** y el crecimiento en atletas.",
            "Contribuye al **bienestar general** y la vitalidad.",
            "Rico en factores de crecimiento y nutrientes esenciales para el desarrollo."
        ],
        ingredients: [
            "Calostro Bovino (Estandarizado en Inmunoglobulinas IgG)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Toma 1 a 2 cápsulas al día con un vaso de agua, preferiblemente en ayunas o entre comidas. Para resultados óptimos, te recomendamos un uso continuado. No excedas la dosis recomendada. Si estás embarazada, amamantando, tienes alergia a la leche o alguna condición médica, consulta a tu médico antes de usar este producto."
    },
	
	  "c63": {
        largeImage: "https://i.imgur.com/vTK0JRT.png",
        benefits: [
            "Aumenta **la energía y la resistencia** física, combatiendo la fatiga.",
            "Mejora la **función cognitiva**, incluyendo la memoria, el enfoque y la claridad mental.",
            "Potente **antioxidante** que ayuda a proteger las células del estrés oxidativo.",
            "Favorece la **desintoxicación natural** del organismo y la eliminación de toxinas.",
            "Apoya la **salud hormonal** y el bienestar general en hombres y mujeres.",
            "Contribuye a la **salud ósea y muscular**."
        ],
        ingredients: [
            "Extracto purificado de **Shilajit** (asphaltum punjabianum)",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomá 1 cápsula al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos, te recomendamos un uso continuado como parte de un estilo de vida saludable. No excedas la dosis recomendada. Si estás embarazada, amamantando o tenés alguna condición médica, consultá a tu médico antes de usarlo."
    },
	
	 "c64": {
        largeImage: "https://i.imgur.com/Ailn6yG.png",
        benefits: [
            "Ayuda a **reducir el cansancio y la fatiga**, optimizando la producción de energía celular.",
            "Contribuye a aliviar el **dolor muscular** y la tensión, incluyendo la fibromialgia.",
            "Mejora la **función muscular** y la recuperación después del ejercicio.",
            "Promueve la **salud ósea y cardiovascular**.",
            "Apoya la **función nerviosa** y la relajación.",
            "Es una forma de magnesio **altamente biodisponible** y suave para el sistema digestivo."
        ],
        ingredients: [
            "Malato de Magnesio",
            "Cápsula vegetal (Hipromelosa)",
            "Agentes de carga y antiaglomerantes naturales."
        ],
        usage: "Tomá 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos, te recomendamos un uso continuado. No excedas la dosis recomendada. Si estás embarazada, amamantando o tenés alguna condición médica, consultá a tu médico antes de usarlo."
    },
	
	"c65": {
    largeImage: "https://i.imgur.com/YjuUH5z.png",
    benefits: [
        "Ayuda a **reducir el cansancio y la fatiga**, optimizando la producción de energía celular.",
        "Contribuye a aliviar el **dolor muscular** y la tensión, incluyendo la fibromialgia.",
        "Mejora la **función muscular** y la recuperación después del ejercicio.",
        "Promueve la **salud ósea y cardiovascular**.",
        "Apoya la **función nerviosa** y la relajación.",
        "Es una forma de magnesio **altamente biodisponible** y suave para el sistema digestivo."
    ],
    ingredients: [
        "Malato de Magnesio",
        "Cápsula vegetal (Hipromelosa)",
        "Agentes de carga y antiaglomerantes naturales."
    ],
    usage: "Tomá 1 a 2 cápsulas al día con un vaso de agua, preferiblemente con una comida. Para resultados óptimos, te recomendamos un uso continuado. No excedas la dosis recomendada. Si estás embarazada, amamantando o tenés alguna condición médica, consultá a tu médico antes de usarlo."
},

	"c66": {
    largeImage: "https://i.imgur.com/JI3xXzX.png",
    benefits: [
        "Ayuda a **equilibrar los niveles de electrolitos**, esencial para la función muscular y nerviosa.",
        "Contribuye a **prevenir calambres musculares** y mejorar la hidratación celular.",
        "Apoya la **salud cardiovascular** y la presión arterial normal.",
        "Promueve la **función renal adecuada** y reduce el riesgo de cálculos.",
        "Forma de potasio **altamente absorbible** y bien tolerado."
    ],
    ingredients: [
        "Citrato de Potasio",
        "Cápsula vegetal (Hipromelosa)",
        "Antiaglomerantes naturales (estearato de magnesio vegetal)"
    ],
    usage: "Tomar 1 cápsula al día con comida, acompañada de un vaso de agua. No exceder la dosis recomendada. Consultar a un médico en caso de enfermedad renal o uso de medicamentos."
},
"c67": {
    largeImage: "https://i.imgur.com/U5gQlUC.png",
    benefits: [
        "Ayuda a **regular los niveles de glucosa en sangre** de manera natural.",
        "Contribuye a **mejorar la sensibilidad a la insulina** y el metabolismo energético.",
        "Apoya la **salud cardiovascular** y ayuda a mantener niveles saludables de colesterol.",
        "Promueve una **digestión saludable** y el equilibrio de la microbiota intestinal.",
        "Puede ayudar en la **gestión del peso** al regular el metabolismo de los lípidos.",
        "Compuesto vegetal **potente y biodisponible** con múltiples beneficios sistémicos."
    ],
    ingredients: [
        "Berberina HCl (97% de pureza)",
        "Agente de carga: Celulosa microcristalina",
        "Cápsula vegetal (Hipromelosa)",
        "Antiaglomerante: Dióxido de silicio"
    ],
    usage: "Tomar 1 cápsula (500 mg) antes de las comidas principales, hasta 3 veces al día. Se recomienda comenzar con 1 cápsula al día para evaluar tolerancia. No exceder la dosis recomendada. Consultar con un profesional de la salud si se está embarazada, en período de lactancia o bajo medicación."
},
"c68": {
    largeImage: "https://i.imgur.com/Iy2ODxS.png",
    benefits: [
        "**Potente combinación** que optimiza la absorción de calcio en huesos y dientes",
        "Ayuda a **prevenir la pérdida de densidad ósea** y reduce el riesgo de osteoporosis",
        "Contribuye a **la salud cardiovascular** al dirigir el calcio a los huesos y no a las arterias",
        "Favorece **el funcionamiento del sistema inmunológico** y la respuesta inflamatoria",
        "Sinergia de nutrientes para **mejorar la sensibilidad a la insulina**",
        "Forma altamente biodisponible con **óptima absorción**"
    ],
    ingredients: [
        "Vitamina K2 (MK-7, 100 mcg)",
        "Vitamina D3 (Colecalciferol, 2000 UI)",
        "Aceite de oliva virgen extra como vehículo",
        "Cápsula blanda (gelatina bovina)",
        "Antioxidante natural (D-alfa tocoferol)"
    ],
    usage: "Tomar 1 cápsula al día con la comida principal. Idealmente consumir junto a alimentos grasos para mejor absorción. No exceder la dosis diaria recomendada. Consultar con un profesional de la salud en caso de embarazo, lactancia o tratamiento con anticoagulantes."
},

"c69": {
    largeImage: "https://i.imgur.com/XVVQjfr.png",
    benefits: [
        "**Alcalinizante natural** que ayuda a regular el pH corporal",
        "Efectivo para **combatir la acidez estomacal** y mejorar la digestión",
        "Contribuye a **relajar el sistema nervioso** y reducir el estrés",
        "Ayuda a **fortalecer huesos y dientes** junto con el calcio",
        "Alivia **calambres musculares** y contracturas",
        "Forma de magnesio con **acción laxante suave** para el estreñimiento ocasional"
    ],
    ingredients: [
        "Carbonato de Magnesio puro",
        "Agentes antiaglomerantes naturales",
        "Cápsula vegetal (hipromelosa)",
        "Sin aditivos artificiales"
    ],
    usage: "Tomar 1-2 cápsulas al día con abundante agua, preferiblemente por la noche. Puede tomarse con o sin alimentos. En caso de acidez, consumir después de las comidas. No exceder la dosis recomendada. Consultar al médico si se está bajo tratamiento médico o con problemas renales."
},

"c70": {
    largeImage: "https://i.imgur.com/JCrJ5u8.png",
    benefits: [
        "**Desintoxica y protege el hígado** gracias a su contenido en silimarina",
        "Estimula la **regeneración de células hepáticas** dañadas",
        "Ayuda a **mejorar la digestión de grasas** y la función biliar",
        "Potente **efecto antioxidante** que combate el estrés oxidativo",
        "Contribuye a **regular los niveles de colesterol** naturalmente",
        "Apoya en la **desintoxicación de metales pesados** y toxinas ambientales"
    ],
    ingredients: [
        "Extracto estandarizado de Cardo Mariano (80% silimarina)",
        "Cápsula vegetal (hipromelosa)",
        "Agente de carga: celulosa microcristalina",
        "Antiaglomerante: estearato de magnesio vegetal"
    ],
    usage: "Tomar 1 cápsula 2 veces al día con las comidas principales. Para tratamientos intensivos de desintoxicación, consultar a un profesional. No recomendado durante el embarazo. Consumir con abundante agua. Los resultados óptimos se observan con uso continuado durante al menos 3 meses."
},

"c71": {
    largeImage: "https://i.imgur.com/SW8LP4c.png",
    benefits: [
        "**Doble acción relajante**: combina los beneficios del magnesio y ashwagandha para reducir el estrés",
        "Mejora la **calidad del sueño** y ayuda a combatir el insomnio",
        "Reduce la **fatiga adrenal** y equilibra la respuesta al estrés",
        "Alivia **tensión muscular** y calambres gracias al citrato de magnesio",
        "Potencia la **resistencia física y mental** durante periodos de exigencia",
        "Fórmula **altamente biodisponible** con rápida absorción"
    ],
    ingredients: [
        "Citrato de Magnesio (500mg por porción)",
        "Extracto de Ashwagandha (KSM-66®, 300mg)",
        "Cápsula vegetal (hipromelosa)",
        "Agentes de flujo naturales (dióxido de silicio)"
    ],
    usage: "Tomar 2 cápsulas al día, 1 por la mañana y 1 antes de dormir. Consumir con agua. Para mejores resultados, usar continuamente por 30 días. No exceder la dosis recomendada. Consultar con médico si está embarazada, amamantando o tomando medicamentos."
},

"c72": {
    largeImage: "https://i.imgur.com/4cyU8sw.png",
    benefits: [
        "**Refuerza el sistema inmunológico** y la respuesta defensiva natural del organismo",
        "Esencial para **la salud de la piel**, cabello y uñas por su rol en la síntesis de colágeno",
        "Potente **antioxidante celular** que combate el estrés oxidativo",
        "Apoya la **función cognitiva** y la agudeza mental",
        "Promueve la **salud hormonal** y la fertilidad en hombres y mujeres",
        "Forma de zinc **altamente biodisponible** para óptima absorción"
    ],
    ingredients: [
        "Citrato de Zinc (30mg equivalente a 10mg zinc elemental)",
        "Cápsula vegetal (hipromelosa)",
        "Agente de carga: celulosa microcristalina",
        "Antiaglomerante: estearato de magnesio vegetal"
    ],
    usage: "Tomar 1 cápsula al día con alimentos. Para mejor absorción, evitar consumir con lácteos o suplementos de hierro. Uso continuado recomendado por mínimo 3 meses para resultados óptimos. No exceder la dosis diaria. Consultar con profesional en caso de embarazo o condiciones médicas."
},

"c73": {
    largeImage: "https://i.imgur.com/dH8S4mv.png",
    benefits: [
        "**Potente adaptógeno** que aumenta la resistencia al estrés físico y mental",
        "Mejora el **rendimiento cognitivo** y la claridad mental",
        "Estimula la **energía natural** sin efectos nerviosos",
        "Apoya la **función sexual** y la vitalidad",
        "Refuerza el **sistema inmunológico** de forma integral",
        "**Equilibrador hormonal** con efectos tonificantes"
    ],
    ingredients: [
        "Extracto estandarizado de Ginseng Malayo (Eurycoma longifolia)",
        "Excipiente vegetal: celulosa microcristalina",
        "Cápsula vegetal (hipromelosa)",
        "Antiaglomerante natural"
    ],
    usage: "Tomar 1 cápsula por la mañana con desayuno. Para periodos de alta exigencia física/mental, puede tomarse 1 cápsula adicional al mediodía. Ciclos recomendados de 3 meses con descansos. No consumir por la noche. Consultar con profesional en caso de hipertensión o tratamiento hormonal."
},

"c74": {
    largeImage: "https://i.imgur.com/LesKtgv.png",
    benefits: [
        "**Antioxidante más potente de la naturaleza** (65x más fuerte que vitamina C)",
        "Protege la **piel contra el envejecimiento** y daño solar desde dentro",
        "Aumenta la **resistencia física** y reduce el dolor muscular post-ejercicio",
        "Fortalece la **salud ocular** protegiendo contra la fatiga visual",
        "Apoya la **función cerebral** y previene el estrés oxidativo neuronal",
        "**Antiinflamatorio natural** para articulaciones y sistema cardiovascular"
    ],
    ingredients: [
        "Astaxantina natural (Haematococcus pluvialis) 4mg",
        "Aceite de oliva virgen extra como vehículo",
        "Cápsula blanda (gelatina pescado)",
        "Vitamina E natural como conservante"
    ],
    usage: "Tomar 1 cápsula al día con la comida principal, preferiblemente con alimentos grasos para mejor absorción. Para resultados óptimos, usar mínimo 8 semanas continuas. No superar la dosis diaria. Ideal combinarlo con protección solar tópica. Consultar con médico si está embarazada o toma anticoagulantes."
},

"c75": {
    largeImage: "https://i.imgur.com/Qthl9qQ.png",
    benefits: [
        "**Adaptógeno clínicamente probado** para reducir el cortisol hasta un 28%",
        "Mejora **el rendimiento cognitivo** y la resistencia al estrés mental",
        "Aumenta los **niveles de energía natural** sin causar nerviosismo",
        "Promueve el **equilibrio hormonal** y la función tiroidea",
        "Fortalece la **masa muscular magra** y la recuperación post-ejercicio",
        "Forma **KSM-66® patentada** con 5% withanólidos para máxima eficacia"
    ],
    ingredients: [
        "Extracto de Ashwagandha KSM-66® (600mg)",
        "Agente de carga: maltodextrina orgánica",
        "Cápsula vegetal (hipromelosa)",
        "Antiaglomerante: estearato de magnesio vegetal"
    ],
    usage: "Tomar 1 cápsula dos veces al día (mañana y tarde) con comida. Para efectos óptimos, usar continuamente por 2-3 meses. No consumir cerca de la hora de dormir. Consultar con profesional si está embarazada, amamantando o tomando medicamentos para tiroides/ansiedad."
},

"c76": {
    largeImage: "https://i.imgur.com/eKvRbzo.png",
    benefits: [
        "**Recarga electrolítica avanzada** para óptimo equilibrio mineral",
        "**Alto poder remineralizante** para huesos y articulaciones",
        "Efectivo **relajante muscular natural** para calambres y contracturas",
        "**Desintoxicante celular** que promueve la eliminación de toxinas",
        "Regula **la función nerviosa** y reduce síntomas de estrés",
        "Forma de magnesio **de rápida absorción** con alta biodisponibilidad"
    ],
    ingredients: [
        "Cloruro de Magnesio puro (500mg por cápsula)",
        "Agentes de flujo naturales (dióxido de silicio)",
        "Cápsula vegetal (hipromelosa)",
        "Sin aditivos artificiales"
    ],
    usage: "Tomar 2 cápsulas al día con abundante agua, preferiblemente una por la mañana y otra por la noche. Puede aumentar a 3 cápsulas en periodos de alta demanda física o estrés. Consumir con alimentos para mejor tolerancia. No exceder la dosis recomendada. Consultar con médico en caso de insuficiencia renal."
},

"c77": {
    largeImage: "https://i.imgur.com/kN7ZxYQ.png",
    benefits: [
        "**Reconstrucción profunda** de tejidos: piel, articulaciones y huesos",
        "**Piel más firme e hidratada** gracias a su alta biodisponibilidad",
        "Reduce **dolor articular** y mejora la flexibilidad en 4 semanas",
        "**Fortalece uñas y cabello** desde la raíz con nutrientes esenciales",
        "Fuente natural de **aminoácidos glicina y prolina** para regeneración celular",
        "**Hidrolizado premium** para absorción 10x mayor que colágeno normal"
    ],
    ingredients: [
        "Colágeno Marino Hidrolizado (1000mg)",
        "Vitamina C (Ácido Ascórbico) para síntesis de colágeno",
        "Cápsula vegetal (hipromelosa)",
        "Antiaglomerante natural"
    ],
    usage: "Tomar 2 cápsulas al día con abundante agua, preferiblemente en ayunas. Para resultados óptimos combinar con vitamina C adicional. Uso continuado mínimo 3 meses. Ideal para combinar con ejercicio y dieta balanceada. No apto para personas con alergia al pescado."
},

"c78": {
    largeImage: "https://i.imgur.com/WpUw5Ry.png",
    benefits: [
        "**Fórmula sinérgica completa** para salud ósea y muscular",
        "**Triple acción mineral** (calcio+mag+zin) con máxima biodisponibilidad",
        "**Vitamina D3 incluida** para óptima absorción de minerales",
        "Protege contra **pérdida de densidad ósea** y osteoporosis",
        "**Relajante muscular profesional** con citrato de magnesio",
        "**Refuerzo inmunológico** con zinc de alta absorción"
    ],
    ingredients: [
        "Citrato de Calcio (500mg)",
        "Citrato de Magnesio (200mg)",
        "Citrato de Zinc (15mg)",
        "Vitamina D3 (25mcg/1000UI)",
        "Cápsula vegetal (hipromelosa)",
        "Antiaglomerantes naturales"
    ],
    usage: "Tomar 2 cápsulas al día con alimentos (1 mañana + 1 noche). Para mejor absorción, evitar consumir con lácteos o café. Uso continuado mínimo 6 meses para beneficios óseos. Consultar médico si toma diuréticos o tiene problemas renales. No exceder la dosis diaria."
},

"c79": {
    largeImage: "https://i.imgur.com/es3NXNc.png",
    benefits: [
        "**Alcalinizante sistémico** que regula el pH corporal naturalmente",
        "**Mejora el rendimiento deportivo** reduciendo la acidosis muscular",
        "**Solución digestiva completa**: acidez, indigestión y reflujo ocasional",
        "**Desintoxicante hepático** que potencia la eliminación de toxinas",
        "**Potenciador de hidratación** con electrolitos esenciales",
        "**Versatilidad premium**: uso interno y tópico (baños/bebidas)"
    ],
    ingredients: [
        "Bicarbonato de Sodio USP grado alimenticio (99.9% pureza)",
        "Sin aditivos ni aluminio",
        "Envase protector de humedad",
        "Origen mineral natural"
    ],
    usage: "Disolver 1/2 cucharadita (1.5g) en 250ml de agua. Máximo 2 dosis diarias, preferiblemente en ayunas o post-entreno. Para uso tópico: añadir 3 cucharadas al baño. Evitar consumir 2h después de comidas copiosas. No usar continuamente por más de 2 semanas sin supervisión."
},

"c80": {
    largeImage: "https://i.imgur.com/5Eb5Zzv.png",
    benefits: [
        "**Dosis clínicamente efectiva** para corregir deficiencias graves",
        "**Refuerzo inmunológico superior** con acción antiviral comprobada",
        "**Salud ósea potenciada**: aumenta la absorción de calcio hasta un 80%",
        "**Regulador hormonal clave** para tiroides y sistema endocrino",
        "**Neuroprotector natural** que reduce riesgo de depresión estacional",
        "**Forma colecalciferol premium** con máxima biodisponibilidad"
    ],
    ingredients: [
        "Vitamina D3 (Colecalciferol) 10,000 UI",
        "Aceite de coco MCT como vehículo liposoluble",
        "Cápsula blanda libre de alérgenos",
        "Sin excipientes artificiales"
    ],
    usage: "Tomar 1 cápsula cada 3 días con la comida más grasosa del día. Para deficiencias severas (<20 ng/ml), usar diariamente por 1 mes luego reevaluar. No exceder 25,000 UI semanales sin supervisión. Mantener refrigerado en climas cálidos."
},

"c81": {
    largeImage: "https://i.imgur.com/8H09eIV.png",
    benefits: [
        "**Potencia cerebral 2X**: concentración récord de 1200mg EPA/DHA por dosis",
        "**Corazón de atleta**: reduce triglicéridos hasta un 30% en 8 semanas",
        "**Antiinflamatorio sistémico**: alivia dolor articular crónico",
        "**Focus premium**: mejora memoria y rendimiento cognitivo",
        "**Piel ultrasana**: reduce acné y envejecimiento desde dentro",
        "**Pureza certificada**: 0% metales pesados (testado en laboratorio)"
    ],
    ingredients: [
        "Aceite de pescado ultrapurificado (2000mg)",
        "EPA (800mg) + DHA (400mg) en ratio 2:1 clínico",
        "Vitamina E natural como antioxidante",
        "Cápsula entérica para cero reflujo",
        "Aceite de limón orgánico para frescura"
    ],
    usage: "Tomar 1 cápsula 2 veces al día con comidas. Para máxima absorción, consumir con alimentos grasos. Ideal combinarlo con curcumina. Refrigerar después de abierto. No usar si es alérgico a mariscos (aunque es pescado blanco)."
},

"c82": {
    largeImage: "https://i.imgur.com/6nbNBrC.png",
    benefits: [
        "**Regeneración articular 360°**: combina 5 ingredientes clínicos",
        "**Alivio rápido del dolor**: reduce rigidez matutina en 72% (estudio clínico)",
        "**Reparador cartilaginoso**: estimula producción de colágeno tipo II",
        "**Fórmula antiinflamatoria premium**: sin efectos gástricos",
        "**Movilidad restaurada**: mejora amplitud articular en 15 días",
        "**Protección prolongada**: efecto acumulativo de 6 meses+"
    ],
    ingredients: [
        "Condroitín Sulfato Farmacopeico (800mg)",
        "Glucosamina HCl (1500mg)",
        "MSM OptiMSM® (1000mg)",
        "Ácido Hialurónico (50mg)",
        "Cúrcuma Phytosome® (500mg)",
        "Cápsula vegetal DRcaps® (liberación retardada)"
    ],
    usage: "Tomar 2 cápsulas al día (mañana/noche) con zumo de piña natural para potenciar absorción. Para casos agudos, usar por 3 meses mínimo. Compatible con antiinflamatorios. No apto para alérgicos a mariscos (por glucosamina)."
},

"c83": {
    largeImage: "https://i.imgur.com/ZCCyNf6.png",
    benefits: [
        "**Activador SIRT1** - Potencia la longevidad celular mediante activación de genes antienvejecimiento",
        "**Cardioprotector élite** - Mejora la elasticidad arterial en un 30% (estudio de 6 meses)",
        "**Detox metabólico** - Neutraliza radicales libres 50x más que la vitamina E",
        "**Neuroprotector premium** - Cruza barrera hematoencefálica para protección cognitiva",
        "**Piel timeless** - Reduce arrugas profundas estimulando producción de colágeno endógeno",
        "**Forma trans-puro** 99.9% - Sin emodina ni contaminantes (HPLC-verificado)"
    ],
    ingredients: [
        "Trans-Resveratrol (Polygonum cuspidatum) 1500mg",
        "Piperina BioPerine® para absorción 200% mayor",
        "Fosfolípidos de girasol (tecnología Phytosome)",
        "Cápsula vegetal DRcaps® (liberación sostenida)",
        "Libre de solventes químicos"
    ],
    usage: "Tomar 1 cápsula en ayunas con jugo de granada orgánico. Ciclos de 3 meses con descansos de 1 mes. Evitar consumo nocturno (puede afectar patrones de sueño). No exceder dosis. Consultar si toma anticoagulantes."
},

"c84": {
    largeImage: "https://i.imgur.com/fvBNqZE.png",
    benefits: [
        "**Neuroregeneración dual**: combina adaptógenos para cerebro y sistema nervioso",
        "**Focus 360°**: mejora concentración y memoria a corto/largo plazo (clínicamente probado)",
        "**Anti-ansiedad natural**: reduce cortisol 31% + aumenta GABA endógeno",
        "**Reparador neuronal**: estimula factor de crecimiento nervioso (NGF) en un 40%",
        "**Energía sin nerviosismo**: equilibrio perfecto entre estimulación y relajación",
        "**Sinergia científica**: 2.3x más efectivo que los componentes por separado"
    ],
    ingredients: [
        "Ashwagandha KSM-66® (600mg)",
        "Melena de León (Hericium erinaceus) 20% polisacáridos (900mg)",
        "Fosfatidilserina (50mg) para absorción neural",
        "Cápsula vegetal con tecnología MCT",
        "Sin excipientes artificiales"
    ],
    usage: "Tomar 1 cápsula mañana y noche. Para uso intensivo (exámenes/competencias), aumentar a 3 cápsulas diarias por ciclos de 2 semanas. Ideal con aceite de coco. No combinar con ISRS sin supervisión médica."
},

"c85": {
    largeImage: "https://i.imgur.com/nKXHTRy.png",
    benefits: [
        "**Regeneración celular 4D**: combina ingredientes que activan células madre adultas",
        "**Antiedad sistémico**: reduce arrugas profundas en un 47% (estudio clínico 12 semanas)",
        "**Reparación articular premium**: reconstruye cartílago y líquido sinovial",
        "**Piel de bebé**: aumenta hidratación epidérmica 300% con ácido hialurónico de bajo peso molecular",
        "**Fórmula inteligente**: vitamina C natural potencia la síntesis endógena de colágeno",
        "**Biodisponibilidad extrema**: tecnología liposomal para absorción 5x mayor"
    ],
    ingredients: [
        "Colágeno Hidrolizado Verisol® (5000mg)",
        "Ácido Hialurónico (150mg) 4 tipos moleculares",
        "Vitamina C Natural (Acerola 300mg)",
        "Extracto de Uva (95% OPC) como activador celular",
        "Cápsulas de liberación prolongada con tecnología Liposhell®",
        "Sin OGM ni alérgenos"
    ],
    usage: "Tomar 2 cápsulas al día en ayunas con jugo cítrico. Para resultados óptimos, combinar con aplicación tópica. Uso continuado mínimo 6 meses. No apto para embarazadas. Conservar refrigerado después de abierto."
},

"c86": {
    largeImage: "https://i.imgur.com/In26bty.png",
    benefits: [
        "**Estimulador natural de GH**: activa la producción endógena sin inyecciones",
        "**Regeneración nocturna**: maximiza la fase 3/4 del sueño profundo",
        "**Quemador metabólico**: acelera la oxidación de grasas durante el sueño",
        "**Reparador muscular 360°**: reduce tiempos de recuperación en un 40%",
        "**Antiedad hormonal**: aumenta niveles de IGF-1 para rejuvenecimiento celular",
        "**Fórmula clínica**: combinación sinérgica de 8 secretagogos probados"
    ],
    ingredients: [
        "L-Arginina AKG (3000mg)",
        "L-Glutamina Micronizada (2000mg)",
        "GABA PharmaPure® (750mg)",
        "Colostro Bovino 40% IGF-1 (500mg)",
        "Mucuna Pruriens 15% L-Dopa (200mg)",
        "Cápsula de liberación prolongada MoonShell™"
    ],
    usage: "Tomar 3 cápsulas 30 minutos antes de dormir con jugo de piña natural. Usar en ciclos de 3 meses con descansos de 4 semanas. No combinar con alcohol. Requiere ayuno nocturno de 3h para máxima eficacia. Resultados óptimos a partir de la 6ta semana."
},

"c87": {
    largeImage: "https://i.imgur.com/hwrfQf7.png",
    benefits: [
        "**Relajación profunda sin somnolencia**: forma quelada para equilibrio nervioso perfecto",
        "**Recuperación muscular elite**: reduce lactato 40% más rápido que otros magnesios (estudio clínico)",
        "**Sueño reparador científico**: incrementa fase REM en un 25% sin efecto resaca",
        "**Desintoxicante celular**: quelante natural de metales pesados (plomo/mercurio)",
        "**Digestión perfecta**: 0% efectos laxantes vs otras formulaciones",
        "**Biodisponibilidad récord**: 8x mayor absorción que óxido de magnesio"
    ],
    ingredients: [
        "Glicinato de Magnesio Albion Minerals® (500mg elemental)",
        "L-Teanina Suntheanine® (100mg) para sinergia neural",
        "Cápsula vegetal con tecnología Slow-Release",
        "Sin estearatos ni flujantes químicos"
    ],
    usage: "Tomar 2 cápsulas 1 hora antes de dormir con infusión de manzanilla. Para estrés agudo: 1 cápsula mañana + 2 noche. Compatible con deporte de alto rendimiento. No requiere ciclos. Seguro para uso prolongado."
},

"c88": {
    largeImage: "https://i.imgur.com/DDda1pc.png",
    benefits: [
        "**Absorción superior**: forma quelada que evita competición con otros minerales",
        "**Refuerzo inmunológico 360°**: aumenta producción de linfocitos T en un 45%",
        "**Reparador intestinal**: curación de mucosa digestiva sin irritación gástrica",
        "**Equilibrio hormonal científico**: regula testosterona/estrógenos naturalmente",
        "**Neuroprotector nocturno**: mejora calidad del sueño profundo (aumenta GABA cerebral)",
        "**Piel inteligente**: reduce acné hormonal y acelera cicatrización 3x"
    ],
    ingredients: [
        "Glicinato de Zinc Albion Minerals® (30mg - equivalente a 7mg elemental)",
        "L-Histidina para transporte celular (50mg)",
        "Cápsula vegetal DRcaps® (liberación intestinal)",
        "Sin metales pesados (certificado ICP-MS)"
    ],
    usage: "Tomar 1 cápsula diaria con cena (nunca en ayunas). Para resfriados: 2 cápsulas/día por 5 días. Ideal combinado con magnesio. Evitar concurrente con lácteos/café. Resultados óptimos en 8-12 semanas."
},

"c90": {
    largeImage: "https://i.imgur.com/kD56BnP.png",
    benefits: [
        "**Fórmula metabólica 5-en-1**: termogénesis + energía + enfoque + recuperación + detox",
        "**Quemador inteligente**: activa UCP-1 sin sobreestimular SNC (0% crash posterior)",
        "**Energía sostenida**: tecnología Time-Release 8h (perfil plano de cafeína)",
        "**Neurofocus premium**: combinación nootrópica para claridad mental sin nerviosismo",
        "**Recuperación integrada**: reduce marcadores inflamatorios post-entreno en 68%",
        "**Detox hepático**: soporte para metabolización de catecolaminas"
    ],
    ingredients: [
        "Cafeína Verde Nutratech® (200mg)",
        "L-Teanina Suntheanine® (300mg)",
        "Extracto de Té Verde 95% EGCG (500mg)",
        "Capsimax® (100mg capsaicina)",
        "BioPerine® (10mg) para biodisponibilidad",
        "Cápsula vegetal de liberación prolongada"
    ],
    usage: "Tomar 1 cápsula al despertar con 300ml agua. Máximo 1 dosis cada 24h. Ideal para entrenamientos matutinos. No combinar con otros estimulantes. Ciclos recomendados: 8 semanas activas + 2 de descanso."
},

"c91": {
    largeImage: "https://i.imgur.com/yYn6rPn.png",
    benefits: [
        "**Potenciador masculino 360°**: desempeño + vigor + confianza hormonal",
        "**Flujo sanguíneo premium**: aumenta óxido nítrico en un 40% (estudio Doppler)",
        "**Testosterona libre**: eleva niveles bioactivos sin conversión a DHT",
        "**Energía primal**: combate fatiga adrenal con adaptógenos específicos",
        "**Recuperación bestial**: reduce cortisol post-ejercicio en un 35%",
        "**Fórmula discreta**: efectos progresivos sin picos artificiales"
    ],
    ingredients: [
        "Tribulus terrestris 60% saponinas (1000mg)",
        "L-Citrulina Malate 2:1 (3000mg)",
        "Ashwagandha KSM-66® (600mg)",
        "Maca Negra (Lepidium meyenii) 4:1 (500mg)",
        "Saw Palmetto EU Extract (320mg)",
        "Cápsula vegetal de liberación prolongada"
    ],
    usage: "Tomar 2 cápsulas 45 minutos antes de actividad física con jugo de sandía. Para mantenimiento: 1 cápsula/día. No requiere ciclado. Evitar consumo nocturno. Resultados óptimos desde la 3ra semana."
},

"c92": {
    largeImage: "https://i.imgur.com/YL8YVlt.png",
    benefits: [
        "**Regeneración 5D**: piel + articulaciones + huesos + cabello + uñas",
        "**Efecto lifting interno**: reduce arrugas profundas en un 47% (estudio clínico 12 semanas)",
        "**Movilidad restaurada**: alivia dolor articular en 72% de usuarios en 28 días",
        "**Hidratación celular profunda**: ácido hialurónico endógeno aumentado 3x",
        "**Fórmula bioactiva**: péptidos <3000Da para absorción inmediata",
        "**Potenciador deportivo**: acelera recuperación muscular post-entreno"
    ],
    ingredients: [
        "Colágeno Hidrolizado Verisol® Tipo I/III (10000mg)",
        "Ácido Hialurónico (100mg) multi-peso molecular",
        "Vitamina C Quali®-C (120mg) como cofactor",
        "Silicio Orgánico (50mg) para matriz conectiva",
        "Cápsula vegetal de triple liberación",
        "Sin OGM, gluten o alérgenos"
    ],
    usage: "Tomar 3 cápsulas diarias en ayunas con jugo cítrico. Para resultados óptimos, combinar con aplicación tópica. Uso continuado mínimo 4 meses. Conservar en lugar fresco. No apto para vegetarianos estrictos."
},

"c93": {
    largeImage: "https://i.imgur.com/yVPAAGy.png",
    benefits: [
        "**Megadosificación inteligente**: 10,000 mcg de biotina activa (no simple relleno)",
        "**Crecimiento capilar acelerado**: +1.25cm/mes (estudio clínico en mujeres 25-55 años)",
        "**Uñas de acero**: reduce fracturas ungueales en un 89% en 8 semanas",
        "**Piel de bebé**: aumenta producción de ceramidas naturales para hidratación profunda",
        "**Metabolismo premium**: activa enzimas claves para procesar grasas/proteínas",
        "**Fórmula potenciada**: con zinc y selenio para absorción maximizada"
    ],
    ingredients: [
        "D-Biotina USP (10,000 mcg)",
        "Zinc Citrate (15mg)",
        "Selenium Methionine (100mcg)",
        "Cápsula vegetal de absorción sublingual",
        "Excipientes libres de alérgenos"
    ],
    usage: "Tomar 1 cápsula diaria preferentemente en ayunas, colocando bajo la lengua por 30 segundos antes de tragar. Para casos severos: 2 cápsulas/día por 1 mes. No requiere ciclado. Resultados visibles desde la semana 6-8."
},





        // EJEMPLOS SUPLEMENTOS
        "suplemento-1": {
            largeImage: "https://i.imgur.com/F0zLVyw.mp4",
            benefits: [
                "🌾 Rica en zinc natural",
                "🥤 Perfecta para smoothies",
                "🌱 100% orgánica certificada",
                "💪 Fortalece el sistema inmune",
            ],
            ingredients: [
                "Harina de semillas de calabaza orgánica",
                "Zinc natural",
                "Ácidos grasos omega-3",
                "Fibra dietética",
            ],
            usage: "Mezclar 2 cucharadas con agua, jugo o smoothie. Consumir 1-2 veces al día, preferiblemente en ayunas.",
            testimonials: [
                {
                    text: "Excelente sabor y muy nutritiva",
                    author: "David L., 42 años",
                },
                {
                    text: "La uso en mis batidos matutinos, me encanta",
                    author: "Alberto S., 36 años",
                },
            ],
        },
        "suplemento-2": {
            largeImage: "https://i.imgur.com/j6ik9u1.png",
            benefits: [
                "🏆 Aceite premium prensado en frío",
                "🌿 Rico en fitoesteroles",
                "💊 Fácil absorción",
                "🎯 Específico para próstata",
            ],
            ingredients: [
                "Aceite de semilla de calabaza estiria",
                "Fitoesteroles",
                "Omega-3 y 6",
                "Vitamina E natural",
            ],
            usage: "Tomar 1 cucharadita (5ml) dos veces al día con las comidas. Puede mezclarse con jugos o tomarse directamente.",
            testimonials: [
                {
                    text: "Calidad excepcional, se nota la diferencia",
                    author: "Manuel R., 50 años",
                },
                {
                    text: "Muy concentrado y efectivo",
                    author: "Pedro C., 47 años",
                },
            ],
        },
    };

    // Return detailed info or default structure
    return (
        detailedProducts[productId] || {
            largeImage: null,
            benefits: [
                "🌿 100% ingredientes naturales",
                "✅ Sin efectos secundarios",
                "🎯 Específico para salud prostática",
                "💪 Fortalece el bienestar general",
            ],
            ingredients: [
                "Extractos naturales",
                "Vitaminas esenciales",
                "Minerales importantes",
            ],
            usage: "Seguir las indicaciones del empaque. Consultar con especialista si es necesario.",
            testimonials: [
                {
                    text: "Excelente producto, muy recomendado",
                    author: "Cliente satisfecho",
                },
            ],
        }
    );
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none";
}

// Cart functions
function addToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    saveCartToStorage();
    showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        saveCartToStorage();
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    showNotification("Carrito vacío");
}

function updateCartDisplay() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML =
                '<p style="text-align: center; color: #666; padding: 20px;">Tu carrito está vacío</p>';
            if (cartTotal) cartTotal.textContent = "0";
            return;
        }

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">S/. ${item.price} c/u</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>

                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });

        if (cartTotal) cartTotal.textContent = total;
    }
}

function toggleCart() {
    const modal = document.getElementById("cartModal");
    if (modal) {
        modal.style.display =
            modal.style.display === "block" ? "none" : "block";
    }
}

// Storage functions
function saveCartToStorage() {
    localStorage.setItem("naturalUrologyCart", JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem("naturalUrologyCart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Payment functions
function showPaymentOptions() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    document.getElementById("cartModal").style.display = "none";
    document.getElementById("paymentModal").style.display = "block";
}

function closePaymentModal() {
    document.getElementById("paymentModal").style.display = "none";
    const paymentDetails = document.getElementById("paymentDetails");
    if (paymentDetails) {
        paymentDetails.style.display = "none";
        paymentDetails.innerHTML = "";
    }
}

function showPaymentDetails(method) {
    const details = document.getElementById("paymentDetails");
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    let paymentInfo = "";

    switch (method) {
        case "bcp":
            paymentInfo = `
                <div class="payment-info">
                    <h4>💳 Datos para Transferencia BCP</h4>
                    <div class="payment-data">
                        <p><strong>Número de cuenta:</strong> 19197088999093</p>
                        <p><strong>Titular:</strong> Aura Haydee Niño</p>
                        <p><strong>Banco:</strong> BCP</p>
                        <p><strong>Monto a transferir:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar la transferencia, envía el comprobante por WhatsApp al +51 940 106 849</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado una transferencia BCP por S/.${total}. Adjunto comprobante.', '_blank')" class="whatsapp-btn">
                            Enviar Comprobante por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
        case "interbancaria":
            paymentInfo = `
                <div class="payment-info">
                    <h4>🏦 Datos para Transferencia Interbancaria</h4>
                    <div class="payment-data">
                        <p><strong>Número de cuenta:</strong> 00219119708899909356</p>
                        <p><strong>Titular:</strong> Aura Haydee Niño</p>
                        <p><strong>Monto a transferir:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar la transferencia, envía el comprobante por WhatsApp al +51 940 106 849</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado una transferencia interbancaria por S/.${total}. Adjunto comprobante.', '_blank')" class="whatsapp-btn">
                            Enviar Comprobante por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
        case "yape":
            paymentInfo = `
                <div class="payment-info">
                    <h4>📱 Datos para Yape</h4>
                    <div class="payment-data">
                        <p><strong>Nombre:</strong> Aura Haydee Niño</p>
                        <p><strong>Número:</strong> +51 940 106 849</p>
                        <p><strong>Monto a yapear:</strong> S/. ${total}</p>
                    </div>
                    <div class="payment-instructions">
                        <p><em>📱 Después de realizar el Yape, envía una captura por WhatsApp al mismo número</em></p>
                        <button onclick="window.open('https://wa.me/51940106849?text=Hola! He realizado un Yape por S/.${total}. Adjunto captura.', '_blank')" class="whatsapp-btn">
                            Enviar Captura por WhatsApp
                        </button>
                    </div>
                </div>
            `;
            break;
    }

    details.innerHTML = paymentInfo;
    details.style.display = "block";
}

// Utility functions
function findProductById(productId) {
    for (const category in products) {
        const product = products[category].find((p) => p.id === productId);
        if (product) return product;
    }
    return null;
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5a27;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease-in";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener("click", function (event) {
    const cartModal = document.getElementById("cartModal");
    const paymentModal = document.getElementById("paymentModal");
    const productModal = document.getElementById("productModal");

    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
    if (event.target === paymentModal) {
        paymentModal.style.display = "none";
    }
    if (event.target === productModal) {
        productModal.style.display = "none";
    }
});

// Smooth scrolling for navigation
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll('a[href^="#"]:not([href="#"])')
        .forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(
                    this.getAttribute("href"),
                );
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        });
});

// Para personalizar productos, edita directamente la función initializeProducts() arriba
// No hay funciones de personalización desde el navegador - todo se hace desde el código fuente

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


