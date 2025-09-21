import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractTextFromPDF, chunkText } from '../inject/chunker.js';
import { BOOK_CONFIG, getReferenceBookPath, getChunksOutputPath, checkReferenceBookExists } from '../config/bookConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processReferenceBook() {
  console.log('🚀 Starting reference book processing...');
  
  // Check if reference book exists
  if (!checkReferenceBookExists()) {
    console.error('❌ Reference book not found at:', getReferenceBookPath());
    console.log('Please ensure the reference-book.pdf file exists in the AI folder.');
    process.exit(1);
  }
  
  try {
    console.log('📖 Extracting text from PDF...');
    const text = await extractTextFromPDF(getReferenceBookPath());
    console.log(`✅ Extracted ${text.length} characters from PDF`);
    
    console.log('✂️ Chunking text...');
    const chunks = chunkText(text, BOOK_CONFIG.CHUNK_SIZE);
    console.log(`✅ Created ${chunks.length} chunks`);
    
    // Filter out very small chunks
    const filteredChunks = chunks.filter(chunk => 
      chunk.text.length >= BOOK_CONFIG.MIN_CHUNK_SIZE
    );
    
    console.log(`📝 Filtered to ${filteredChunks.length} valid chunks`);
    
    // Limit chunks if too many
    const finalChunks = filteredChunks.slice(0, BOOK_CONFIG.MAX_CHUNKS);
    if (finalChunks.length < filteredChunks.length) {
      console.log(`⚠️ Limited to ${finalChunks.length} chunks (max: ${BOOK_CONFIG.MAX_CHUNKS})`);
    }
    
    // Add metadata to chunks
    const chunksWithMetadata = finalChunks.map((chunk, index) => ({
      ...chunk,
      index,
      processedAt: new Date().toISOString(),
      source: 'reference-book.pdf',
      chunkSize: chunk.text.length
    }));
    
    console.log('💾 Saving chunks to file...');
    fs.writeFileSync(getChunksOutputPath(), JSON.stringify(chunksWithMetadata, null, 2));
    
    console.log('✅ Successfully processed reference book!');
    console.log(`📊 Statistics:`);
    console.log(`   - Total chunks: ${chunksWithMetadata.length}`);
    console.log(`   - Average chunk size: ${Math.round(chunksWithMetadata.reduce((sum, c) => sum + c.chunkSize, 0) / chunksWithMetadata.length)} characters`);
    console.log(`   - Output file: ${getChunksOutputPath()}`);
    
  } catch (error) {
    console.error('❌ Error processing reference book:', error.message);
    process.exit(1);
  }
}

// Run the processing if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  processReferenceBook();
}

export default processReferenceBook;
