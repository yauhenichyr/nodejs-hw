import AuthService from '../services/auth';

const authService = new AuthService();

export class AuthController {
    login = async (req : any, res : any) => {
        let user = await authService.login(req.body.login, req.body.password);

        if (user) res.json(user);
        else res.status(401).send('Incorrect credentials');
    }
}