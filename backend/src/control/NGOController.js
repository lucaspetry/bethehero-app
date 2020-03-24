const crypto = require('crypto');

const connection = require('../db/connection');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos')
            .select('*');
        return response.json(ngos);
    },
    async store(request, response) {
        const {name, city, state, email, whatsapp} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ngos')
            .insert({
                id, name, city, state, email, whatsapp
            });
        
        return response.json({id});
    }
};