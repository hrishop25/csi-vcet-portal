import app, { initDb } from './app.js';
import { getDbStatus } from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`  CSI VCET Chapter Backend Server Active               `);
      console.log(`  URL: http://localhost:${PORT}                         `);
      console.log(`  Mode: ${getDbStatus().mode}                           `);
      console.log(`  Default Admin: admin@csivcet.org / CsiVcet@2026      `);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
