import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 5000; // Add a fallback port
const HOST = process.env.HOSTNAME || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
});
