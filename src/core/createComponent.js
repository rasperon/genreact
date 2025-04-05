import axios from 'axios';
import { askQuestions } from './askQuestions.js';
import { getPrompt } from '../config/geminiPrompt.js';
import { resolveFilePath, writeComponentFile } from './utils.js';


const serverUrl = 'https://gencreateapi.vercel.app/api/generate';

async function fetchFromServer(promptText) {
  try {
    const response = await axios.post(
      serverUrl,
      { message: promptText },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status === 200) {
      const componentCode = response.data.response; // Burada response'ı alıyoruz.

      // Eğer component code boş gelirse bir hata fırlatıyoruz
      if (!componentCode) {
        throw new Error('Received empty component code from server');
      }

      // JSX kodunu döndürüyoruz
      return componentCode;
    } else {
      throw new Error('Failed to fetch component code from the server');
    }
  } catch (error) {
    console.error('Error fetching from server:', error.message);
    throw error;
  }
}


export async function main() {
  console.log('🚀 Welcome to GENREACT!');
  const answers = await askQuestions();

  const { structure, example, description } = answers;
  const promptText = getPrompt(description);
  const fullPath = resolveFilePath(structure, example);

  console.log('🛠️ Creating with GENREACT server...');

  try {
    const componentCode = await fetchFromServer(promptText);

    // Kod gelmediyse hata fırlat
    if (!componentCode) {
      throw new Error('Received empty component code from server');
    }

    // Dosyaya yazıyoruz
    await writeComponentFile(componentCode, fullPath);
    console.log(`✅ Component generated! See: ${fullPath}`);
  } catch (error) {
    console.error('❌ Component generation failed:', error.message);
  }
}
