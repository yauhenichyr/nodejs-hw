import logger from './logger';

const initErrHandler = function() {
    process
        .on('unhandledRejection', (reason, p) => {
            logger.error(`${reason} Unhandled Rejection at Promise ${p}`);
        })
        .on('uncaughtException', err => {
            logger.error(`${err} Uncaught Exception thrown`);
            process.exit(1);
        });
}

export default initErrHandler;