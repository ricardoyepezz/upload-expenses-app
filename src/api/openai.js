const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Asegúrate de configurar esta variable de entorno
  dangerouslyAllowBrowser: true
});

export default openai;