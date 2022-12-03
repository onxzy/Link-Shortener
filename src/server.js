const http = require('http');
const app = require('./app/app.js');

const httpServer = http.createServer(app);
const PORT = 5000;

httpServer.listen(PORT, () => {
  console.info(`Serveur started using port ${PORT}`);
});
