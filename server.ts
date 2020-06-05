import { Application } from 'https://deno.land/x/oak/mod.ts';
import { Cron } from "https://deno.land/x/cron/cron.ts";

import { env } from './api/util/packages.ts';

import router from './api/router/router.ts';
import protectedRoutes from './api/router/protectedRoutes.ts';
import authorizer from './api/middlewares/authorizer.ts';
import cronService from './api/util/cron.ts';



const app = new Application();
const port = +env.PORT || 5000;



app.use(router.routes());
app.use(authorizer.verifyLoginToken); // Middleware for token authorization
app.use(protectedRoutes.routes()); // Protected Routes
app.use(router.allowedMethods());

// CRON JOBS
const cron = new Cron();
cron.start();

cron.add("* * * * *", cronService.cronJob);


console.log(`Running on port ${port}`);
await app.listen({port});
