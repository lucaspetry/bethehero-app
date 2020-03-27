const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../db/connection');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos')
            .select('*');
        return response.json(ngos);
    },
    async store(request, response) {
        const {name, city, state, email, whatsapp} = request.body;
        const id = generateUniqueId();
    
        await connection('ngos')
            .insert({
                id, name, city, state, email, whatsapp
            });
        
        return response.json({id});
    }
};