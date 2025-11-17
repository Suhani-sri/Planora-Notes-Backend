const logger = require('../logger');

module.exports.createSchema = (sequelize, schemaName) => {
    if (!schemaName) {
        logger.error("Schema name is not provided");
    }
    return sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`)
        .then (() => {
            logger.info(`Schema ${schemaName} created or already exists`);
        })
        .catch ((e) => {
            logger.error(`Error occured while creating the schema ${schemaName}`, e);
        })
}