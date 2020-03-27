const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/db/connection');

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should create a new NGO', async () => {
        const response = await request(app)
            .post('/ngos')
            .send({
                name: "Super NGO",
                city: "Florianópolis",
                state: "SC",
                email: "ngo@ngo.com",
                whatsapp: "48999995555"
            });
        expect(response.body).toHaveProperty('id');
    });
});