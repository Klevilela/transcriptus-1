const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// local to import API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Generating Images
const generateImage = async (prompt) => {
  const numberOfImages = 1;
  const size = "256x256";

  // tentando criar a imagem
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: numberOfImages,
      size: size,
    });

    // url da imagem gerada
    const imageUrl = response.data.data[0].url;
    return imageUrl;
    // res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { generateImage };
