const debugLogger = require('./debugLogger');
const productionLogger = require('./productionLogger');

let logger = null;

if (process.env.NODE_ENV !== 'production') {
  logger = debugLogger();
} else {
  logger = productionLogger();
}

module.exports = logger;