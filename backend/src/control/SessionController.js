const connection = require('../db/connection');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos')
            .select('*');
        return response.json(ngos);
    },
    async store(request, response) {
        const {id} = request.body;
        const ngo = await connection('ngos')
            .where('id', id)
            .select('name')
            .first();
        
        if (!ngo) {
            return response.status(400).json({error: 'No NGO found with this ID.'})
        }

        return response.json(ngo);
    }
};