import express from 'express';
import Joi from '@hapi/joi';
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator
} from 'express-joi-validation'

const app: express.Application = express();
const validator = createValidator();

app.use(express.json());

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
})
 
interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string,
    password: string,
    age: number,
  }
}

type userModel = {
  id: string,
  login: string,
  password: string,
  age: number,
  isDeleted: boolean,
}

let users : Array<userModel> = [
  {
    id: '0',
    login: 'login1',
    password: 'pass1',
    age: 20,
    isDeleted: false,
  },
  {
    id: '1',
    login: 'login2',
    password: 'pass2',
    age: 21,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'login3',
    password: 'pass3',
    age: 22,
    isDeleted: false,
  }
]

function getUsers(req : any, res : any) {
  if (req.query.login) {
    let filteredUsers : Array<userModel> = getAutoSuggestUsers(req.query.login, req.query.limit);
    if (filteredUsers.length) res.json(filteredUsers);
    else res.status(404).json({message: `Users not found`});
  } else {
    if (users) res.json(users);
    else res.status(404).json({message: `Users not found`});
  }
}

function getAutoSuggestUsers(login : string, limit : number = 3) : Array<userModel> {
  if (!login) {
    return [];
  }

  return users.filter(user => user.login.includes(login))
    .slice(0, limit)
    .sort((a, b) => a.login.localeCompare(b.login));
}

function getUser(req : any, res : any) {
  let user = users.filter(user => req.params.id === user.id);
  if (user.length) {
    res.json(user[0]);
  } else {
    res.status(404).json({message: `User with id ${req.params.id} not found`})
  }
}

function deleteUser(req : any, res : any) {
  let deletedUser = null;
  let userID = req.params.id;

  users = users.map(user => {
    if (user.id === userID) {
      user.isDeleted = true;
      deletedUser = user;
    }
    return user;
  });

  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).json({message: `User with id ${req.params.id} not found`})
  }
}

function updateUser(req : ValidatedRequest<UserRequestSchema>, res : any) {
  let updatedUser = null;
  let userID = req.params.id;
  users = users.map(user => {
    if (user.id === userID) {
      updatedUser = {...user, ...req.body}
      return updatedUser;
    }
    return user;
  })

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({message: `User with id ${req.params.id} not found`})
  }
}

function createUser(req : ValidatedRequest<UserRequestSchema>, res : any) {
  let newUser = {
    id: `${users.length}`,
    isDeleted: false,
    ...req.body
  }
  users.push(newUser);
  res.json(newUser);
}

app.route('/users')
  .get(getUsers)
  .post(validator.body(userSchema), createUser)

app.route('/users/:id')
  .get(getUser)
  .put(validator.body(userSchema), updateUser)
  .delete(deleteUser)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});