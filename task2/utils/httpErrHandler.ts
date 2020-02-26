const httpErrHandler = function(err: any, req: any, res: any, next: any) {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
}

export default httpErrHandler;