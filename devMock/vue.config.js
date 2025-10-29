module.exports = {

    devServer: {
          before: function(app) {
              const mockMiddleware = require('./src/mocks/devServerMock')
              mockMiddleware(app)
          }
    }
}
