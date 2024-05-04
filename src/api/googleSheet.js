// openai.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar esta variable de entorno
});
const openai = new OpenAIApi(configuration);

module.exports = openai;