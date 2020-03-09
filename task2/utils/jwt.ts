import jwt from 'jsonwebtoken';
import jwtConf from '../config/auth';

export const jwtAuth = (req: any, res: any, next: any) => {
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
        try {
            req.user = jwt.verify(req.headers['authorization'], jwtConf.secret);
        } catch(err) {
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
};