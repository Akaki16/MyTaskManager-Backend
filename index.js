const app = require('./app');
const http = require('http');
const logger = require('./utils/logger');
const config = require('./utils/config');

// create a server
const SERVER = http.createServer(app);

// listen for the server on port 5000
SERVER.listen(config.PORT, () => {
    logger.info(`Server is running on port: ${config.PORT}`);
});