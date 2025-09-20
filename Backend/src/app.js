import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// AI routes
app.use('/api/ai', aiRoutes);

export default app;
