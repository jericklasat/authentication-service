import express from 'express';
import registrationService from "./service/RegistrationService";
import loginService from "./service/LoginService";
import {checkSchema, validationResult} from "express-validator";
import {LoginInput, UserInput} from "./validations/InputValidation";
import tokenService from "./service/TokenService";

const router = express.Router();

router.post('/register', checkSchema(UserInput), (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({errors: errors.array()});
  }

  registrationService.register(request.body).then(userId => {
    response.send(userId);
  }).catch(errors => {
    console.log(errors);

    response.status(400).json({message: errors?.detail});
  });
});

router.post('/login', checkSchema(LoginInput), (request: express.Request, response: express.Response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({errors: errors.array()});
  }

  loginService.login(request.body.emailAddress, request.body.password)
    .then(result => {
      if (null == result) {
        return response.sendStatus(401);
      }

      return response.send(result);
    }).catch(errors => {
    console.log(errors);

    return response.sendStatus(401);
  })
});

router.post('/token/refresh', (request, response) => {
  const token = request.headers.authorization?.replace('Bearer ', '');

  tokenService.refresh(token).then(newTokens => {
    if (null == newTokens) {
      return response.status(401).json({message: 'Failed'})
    }

    if (newTokens.errorMessage) {
      return response.status(401).json(newTokens);
    }

    return response.send(newTokens);
  }).catch(errors => {
    console.log(errors);

    return response.sendStatus(401);
  });
})

export default router;