const httpLogger = function(req: any, res: any, next: any) {
    console.log(req.method);
    next();
}

export default httpLogger;