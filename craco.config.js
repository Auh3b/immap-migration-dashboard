const WorkerPlugin = require('worker-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [new WorkerPlugin()],
    },
  },
};
