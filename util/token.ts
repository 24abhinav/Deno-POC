import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { env } from '../util/packages.ts';

const key = env.LOGIN_SECRET;
const payload: Payload = {
  exp: setExpiration(new Date().getTime() + 600000),
}
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

export default {
    createToken: async (tokenPayload: any) => {
        return new Promise(async (resolve) => {
            payload.iss = tokenPayload;
            const token = await makeJwt({header, payload, key});
            resolve(token);
        });
    },

    verifyToken: async (token: string) => {
      return new Promise(async (resolve) => {
        const isValid = await validateJwt(token, key, {isThrowing: false});
        resolve(isValid);
    });
    },
};