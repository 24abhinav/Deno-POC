import { Router } from 'https://deno.land/x/oak/mod.ts';
import UserModel from '../model/user.ts';

const protectedRoutes = new Router();

protectedRoutes
.get('/users', UserModel.read)
.put('/users/:id', UserModel.edit)
.delete('/users/:id', UserModel.delete)

export default protectedRoutes;