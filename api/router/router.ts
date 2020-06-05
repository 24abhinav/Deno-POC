import { Router } from 'https://deno.land/x/oak/mod.ts';
import UserModel from '../model/user.ts';

const router = new Router();

// ----------------- User Model --------------------

router
.post('/users', UserModel.signUp)
.post('/login', UserModel.login)

export default router;
