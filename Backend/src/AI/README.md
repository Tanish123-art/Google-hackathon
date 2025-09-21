# RAG (Retrieval-Augmented Generation) System

This system processes a reference book PDF and uses it to generate intelligent questions for assessments.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Process Reference Book**
   ```bash
   npm run process-book
   ```
   This will:
   - Extract text from `src/AI/reference-book.pdf`
   - Chunk the text into manageable pieces
   - Save processed chunks to `AI_chunks.json`

## Configuration

The system uses `src/AI/config/bookConfig.js` for configuration:

- **REFERENCE_BOOK_PATH**: Path to the PDF file
- **CHUNKS_OUTPUT_PATH**: Where processed chunks are saved
- **CHUNK_SIZE**: Maximum characters per chunk (default: 1800)
- **CHUNK_OVERLAP**: Overlap between chunks (default: 200)
- **MIN_CHUNK_SIZE**: Minimum chunk size to keep (default: 100)
- **MAX_CHUNKS**: Maximum number of chunks to process (default: 1000)

## API Endpoints

### POST /api/ai/tests
Create a new test with questions generated from the reference book.

**Request Body:**
```json
{
  "topics": ["topic1", "topic2"],
  "numQuestions": 5,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "testId": "uuid",
  "numQuestions": 5
}
```

### GET /api/ai/tests/:id/question?idx=0
Get a specific question by index.

**Response:**
```json
{
  "questionIndex": 0,
  "question": {
    "id": "chunk-1-q1",
    "topic": "topic1",
    "question": "What is...?",
    "options": ["A", "B", "C", "D"],
    "explanation": "Explanation...",
    "difficulty": "medium",
    "sources": ["Context1", "Context2"]
  }
}
```

### POST /api/ai/tests/:id/submit
Submit an answer for a question.

**Request Body:**
```json
{
  "userId": "user123",
  "questionIndex": 0,
  "selectedIndex": 1
}
```

**Response:**
```json
{
  "correct": true,
  "explanation": "Explanation..."
}
```

## File Structure

```
src/AI/
├── config/
│   └── bookConfig.js          # Configuration for reference book processing
├── embeddings/
│   └── embeddingService.js    # Mock embedding service (replace with real implementation)
├── inject/
│   └── chunker.js             # PDF text extraction and chunking
├── rag/
│   └── generateQuestion.js    # RAG question generation logic
├── routes/
│   └── aiRoutes.js            # API routes for AI functionality
├── scripts/
│   └── processReferenceBook.js # Script to process the reference book
├── store/
│   └── testStore.js           # In-memory test storage
├── utils/
│   └── id.js                  # ID generation utility
└── reference-book.pdf         # The reference book PDF file
```

## How It Works

1. **Text Extraction**: The system extracts text from the PDF using `pdf-parse`
2. **Chunking**: Text is split into manageable chunks based on sentences
3. **Storage**: Chunks are stored in `AI_chunks.json` with metadata
4. **Retrieval**: When generating questions, relevant chunks are retrieved based on topic keywords
5. **Generation**: The retrieved context is used to generate questions via AI

## Customization

### Adding Real AI Services

Replace the mock implementations in `src/AI/embeddings/embeddingService.js`:

- `getEmbedding()`: Replace with real embedding service (OpenAI, Vertex AI, etc.)
- `callGenAI()`: Replace with real AI model calls

### Adjusting Chunking Strategy

Modify `src/AI/inject/chunker.js` to:
- Change chunk size
- Implement different chunking strategies
- Add overlap between chunks

### Database Integration

Replace the in-memory storage in `src/AI/store/testStore.js` with:
- MongoDB
- PostgreSQL
- Firestore
- Any other database

## Troubleshooting

1. **Reference book not found**: Ensure `reference-book.pdf` exists in `src/AI/`
2. **Chunks not loading**: Run `npm run process-book` to generate chunks
3. **Import errors**: Ensure all files use ES6 modules (import/export)
4. **Memory issues**: Reduce `MAX_CHUNKS` in configuration for large PDFs
