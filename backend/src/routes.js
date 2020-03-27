const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const SessionController = require('./control/SessionController');
const NGOController = require('./control/NGOController');
const NGOProfileController = require('./control/NGOProfileController');
const IncidentController = require('./control/IncidentController');

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().alphanum().required()
    })
}), SessionController.store);

routes.get('/ngos', NGOController.index);
routes.post('/ngos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().length(11),
        city: Joi.string().required(),
        state: Joi.string().required().length(2)
    })
}), NGOController.store);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), NGOProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })    
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(10).max(100),
        description: Joi.string().required().min(20).max(500),
        value: Joi.number().required().greater(0)
    })
}), IncidentController.store);

routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;
