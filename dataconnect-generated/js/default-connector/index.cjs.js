const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'cookin-app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

