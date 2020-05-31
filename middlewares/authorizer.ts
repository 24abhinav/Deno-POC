import tokenService from '../util/token.ts';

export default {

    verifyLoginToken: async (ctx: any, next: any) => {
        const token = ctx.request.headers.get('authorization');
        if(!token) {
            ctx.response.status = 401
            ctx.response.body = {
                status: 401,
                message: 'token is missing!'
            }
        } else {
            const isTokenValid = await tokenService.verifyToken(token);
            if(!isTokenValid) {
                ctx.response.status = 401
                ctx.response.body = {
                    status: 401,
                    message: 'session has been expired!'
                }
            } else {
                await next();
            }
        }
    }

};