import express from 'express';
import {generateToken} from "./service/Token";
import Registration from "./service/Registration";

const router = express.Router();

router.post('/register', async (req, response) => {
  try {
    const userId = await Registration.register(req.body);

    response.send(userId);
  } catch (err: any) {
    console.log(err);

    response.send('Error');
  }
});

router.get('/login', (req, response) => {
  // TODO: Login checks

  return response.send({
    accessToken: generateToken(),
    refreshToken: generateToken('30 days'),
  });
});

export default router;