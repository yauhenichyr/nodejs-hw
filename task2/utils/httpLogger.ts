import logger from './logger';

const httpLogger = function(req: any, res: any, next: any) {
    logger.info(req.method);
    next();
}

export default httpLogger;