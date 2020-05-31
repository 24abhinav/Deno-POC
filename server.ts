import { Application } from 'https://deno.land/x/oak/mod.ts';

import router from './router/router.ts';
import protectedRoutes from './router/protectedRoutes.ts';
import authorizer from './middlewares/authorizer.ts';
import { env } from './util/packages.ts';

const app = new Application();
const port = +env.PORT || 5000;


app.use(router.routes());
app.use(authorizer.verifyLoginToken);
app.use(protectedRoutes.routes());
app.use(router.allowedMethods());


console.log(`Running on port ${port}`);
await app.listen({port});