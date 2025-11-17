const db = require('./db');
const createDatabaseIfNotExists = require('./create-db');
const logger = require('../logger');
const initializeDatabse = require('../../database-details/initialized-database');

async function initializeDb() {
    await createDatabaseIfNotExists(process.env.DB_DATABASE)
    
    try {
        await db.sequelize.authenticate();
        await initializeDatabse(db.sequelize, db.Sequelize, db)
        logger.info('Database connection established successfully.');

        await db.sequelize.sync({ force: false});
        
    } catch (error) {
        logger.error('Database initialization failed:', error);
        throw error;
    }
}

module.exports = {
    db,
    initializeDb,
}