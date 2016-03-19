var requestController = require('../controllers/requestController.js');
var providerController = require('../controllers/providerController.js');
var customerModel = require('../controllers/customerController.js');

module.exports = function(app) {
  app.post('/create-request', requestController.createRequest);
  app.post('/get-requests', requestController.getRequests);
  app.post('/accept-request', requestController.acceptRequest);
  app.post('/get-current', requestController.getCurrent);
  app.post('/job-started', requestController.jobStarted);
  app.post('/job-done', requestController.jobDone);
};
