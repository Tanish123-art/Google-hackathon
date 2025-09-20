import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT;
const HOST = process.env.HOSTNAME; // fallback if not set

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
