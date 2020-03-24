const express = require('express');

const routes = express.Router();

const SessionController = require('./control/SessionController');
const NGOController = require('./control/NGOController');
const NGOProfileController = require('./control/NGOProfileController');
const IncidentController = require('./control/IncidentController');

routes.post('/session', SessionController.store);

routes.get('/ngos', NGOController.index);
routes.post('/ngos', NGOController.store);

routes.get('/profile', NGOProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
