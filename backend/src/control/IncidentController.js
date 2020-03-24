const connection = require('../db/connection');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
            .limit(5)
            .offset((page - 1) * 5)    
            .select(['incidents.*', 'ngos.name',
                     'ngos.city', 'ngos.state',
                     'ngos.email', 'ngos.whatsapp']);
        
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async store(request, response) {
        const {title, description, value} = request.body;
        const ngo_id = request.headers.authorization;

        const [id] = await connection('incidents')
            .insert({
                ngo_id, title, description, value
            });
        
        return response.json({id});
    },

    async delete(request, response) {
        const {id} = request.params;
        const ngo_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ngo_id')
            .first();
        
        if (incident.ngo_id != ngo_id) {
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents')
            .where('id', id)
            .delete();
        return response.status(204).send();
    }
};