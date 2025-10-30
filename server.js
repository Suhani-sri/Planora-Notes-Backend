require('dotenv').config();
const express = require('express');
const app = express();
const {db, initializeDb} = require('./utils/database/db-init')

const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Planora server is running...');
})

initializeDb()
    .then(() => {
        // Registering routes initialization of db
        // const { registerRoutes } = require('./routes/index-routes');
        // registerRoutes(app);

        const server = app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${port} is already in use`);
            } else {
                console.log(error);
            }
        });

        server.on('listening', () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('DB init failed', err);
        process.exit(1);
    });
