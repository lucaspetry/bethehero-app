const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.json({
        event: 'Semana OmniStack',
        student: 'Lucas'
    });
});

app.listen(3333);
