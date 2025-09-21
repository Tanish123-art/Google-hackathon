// extracts text from PDF and chunks it into manageable passages
import fs from 'fs';
import pdf from 'pdf-parse';
import { BOOK_CONFIG } from '../config/bookConfig.js';

async function extractTextFromPDF(path) {
  const dataBuffer = fs.readFileSync(path);
  const data = await pdf(dataBuffer);
  return data.text;
}

function chunkText(text, maxChars = BOOK_CONFIG.CHUNK_SIZE) {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks = [];
  let cur = '';
  
  for (const s of sentences) {
    if ((cur + ' ' + s).length > maxChars) {
      if (cur.trim()) {
        chunks.push(cur.trim());
      }
      cur = s;
    } else {
      cur += (cur ? ' ' : '') + s;
    }
  }
  
  if (cur.trim()) {
    chunks.push(cur.trim());
  }
  
  return chunks.map((t, i) => ({ 
    id: `chunk-${i+1}`, 
    text: t,
    chunkIndex: i,
    createdAt: new Date().toISOString()
  }));
}

export { extractTextFromPDF, chunkText };
