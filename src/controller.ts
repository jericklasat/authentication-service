import express from 'express';
import registrationService from "./service/RegistrationService";
import loginService from "./service/LoginService";
import {checkSchema, validationResult} from "express-validator";
import {LoginInput, UserInput} from "./validations/InputValidation";

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

    response.sendStatus(500);
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

    return response.sendStatus(500);
  })
});

export default router;