import jwt from 'jsonwebtoken';
import jwtConf from '../config/auth';

import AuthService from '../services/auth';

const authService = new AuthService();

export class AuthController {
    login = async (req : any, res : any) => {
        let user = await authService.login(req.body.login, req.body.password);
        if (user) {
            res.json({
                id: user.id,
                username: user.login,
                jwt: jwt.sign({
                    id: user.id,
                }, jwtConf.secret, { expiresIn: 60*60 })
            });
        } 
        else res.status(401).send('Incorrect credentials');
    }
}