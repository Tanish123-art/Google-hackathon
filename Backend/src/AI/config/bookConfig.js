import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for reference book processing
export const BOOK_CONFIG = {
  // Path to the reference book PDF
  REFERENCE_BOOK_PATH: path.join(__dirname, '../reference-book.pdf'),
  
  // Path where processed chunks will be stored
  CHUNKS_OUTPUT_PATH: path.join(__dirname, '../../AI_chunks.json'),
  
  // Chunking configuration
  CHUNK_SIZE: 1800, // Maximum characters per chunk
  CHUNK_OVERLAP: 200, // Overlap between chunks for better context
  
  // Processing options
  MIN_CHUNK_SIZE: 100, // Minimum chunk size to keep
  MAX_CHUNKS: 1000, // Maximum number of chunks to process
};

// Helper function to get the reference book path
export function getReferenceBookPath() {
  return BOOK_CONFIG.REFERENCE_BOOK_PATH;
}

// Helper function to get the chunks output path
export function getChunksOutputPath() {
  return BOOK_CONFIG.CHUNKS_OUTPUT_PATH;
}

// Helper function to check if reference book exists
export function checkReferenceBookExists() {
  return fs.existsSync(BOOK_CONFIG.REFERENCE_BOOK_PATH);
}

export default BOOK_CONFIG;
