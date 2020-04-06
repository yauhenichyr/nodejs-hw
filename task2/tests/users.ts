import userController from '../controllers/user';
import userService from '../services/user';

import { mockRequest, mockResponse } from 'mock-req-res';

const serviceResponse = [{
    "id": 2,
    "login": "newuser2",
    "password": "newpass",
    "age": 99,
    "createdAt": "2020-01-28T06:36:09.916Z",
    "updatedAt": "2020-01-28T13:00:15.619Z"
}];

describe('Check UserController', () => {

    test('should 200 and return correct value', async () => {
        let req = mockRequest();
        const res = mockResponse();
        let spyJSON = jest.spyOn(res, 'json');
        jest.spyOn(userService, 'getAll').mockImplementation(() => Promise.resolve(serviceResponse) as any);

        await userController.getUsers_get(req, res);
        expect(spyJSON).toHaveBeenCalledWith(serviceResponse);
    });
  
    test('should 404 and return correct value', async () => {
        let req = mockRequest();
        const res = mockResponse();
        req.method = 'GET';
        let spyStatus = jest.spyOn(res, 'status');
        let spyJSON = jest.spyOn(res, 'json');
        jest.spyOn(userService, 'getAll').mockImplementation(() => Promise.resolve(null) as any);
        
        await userController.getUsers_get(req, res);
    
        expect(spyStatus).toHaveBeenCalledWith(404);
        expect(spyJSON).toHaveBeenCalledWith({ message: '[GET] Users not found' });
    });
});