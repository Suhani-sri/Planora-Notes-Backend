const { createSchema } = require("../../utils/database/schema");
const logger = require("../../utils/logger");

const creatingSchema = async (sequelize) => {
    const schemas = ["auth", "notifications"];

    try {
        const results = await Promise.allSettled(
            schemas.map((schema) => createSchema(sequelize, schema))
        );

        results.forEach((result, index) => {
            const schema = schemas[index];
            if(result.schema === 'fulfilled') {
                logger.info(`database -> ${schema} schema created`);
            }else {
                logger.error(`database -> ${schema} schema error`, result.reason);
            }
        })
    } catch (error) {
            logger.error("unexpected error while creating the schemas", error);
    }
}

module.exports = creatingSchema;