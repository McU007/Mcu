// netlify/functions/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa el cliente de la API con tu clave secreta desde las variables de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async function (event) {
  // Solo permite peticiones POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Obtiene el prompt del usuario desde el cuerpo de la petición
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: "Por favor, proporciona un prompt." };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: text }),
    };
  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Hubo un error al procesar tu solicitud." }),
    };
  }

};



