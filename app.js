
var Hapi            = require('hapi');
var mongoose        = require('mongoose');

var server = new Hapi.Server();

// Mongodb
mongoose.connect('mongodb://localhost:27017/testserver');

// Create a server with a host and port
server.connection({
    host: 'localhost',
    port: 8080,
    labels: ['api']
});

// Swagger
server.register([
    require('inert'),
    require('vision'),
    {
        register: require('hapi-swaggered'),
        options: {
            info: {
                title: 'Test API',
                description: 'test',
                version: '1.0'
            }
        }
    },
    {
        register: require('hapi-swaggered-ui'),
        options: {
            title: 'TEST API',
            path: '/docs',
            authorization: {
                field: 'apiKey',
                scope: 'query', // header works as well
                // valuePrefix: 'bearer '// prefix incase
                defaultValue: 'demoKey',
                placeholder: 'Enter your apiKey here'
            },
            swaggerOptions: {
                validatorUrl: null
            }
        }
    }], {
    select: 'api'
}, function (err) {
    if (err) {
        throw err
    }

    //route config
    require('./routes')(server);

    // Start the server
    server.start(function () {
        console.log('Server running at: ' + server.info.uri);
    });
});
