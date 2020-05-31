import { Router } from 'https://deno.land/x/oak/mod.ts';
import UserModel from '../model/user.ts';

const protectedRoutes = new Router();

protectedRoutes
.get('/users', UserModel.getUserData)
.put('/users', UserModel.editUserData)
.delete('/users', UserModel.deleteUser)

export default protectedRoutes;