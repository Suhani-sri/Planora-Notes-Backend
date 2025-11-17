const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");
const creatingSchema = require("./create-script/schema-creation");

const initializeDatabase = async (Sequelize, DataTypes, db) => {
    try {
        // creating schema
        await creatingSchema(Sequelize, DataTypes);

        logger.info("Database schemas created successfully")
    } catch (error) {
        logger.error("Database initialization error", error)
        throw error;
    }
}

module.exports = initializeDatabase;