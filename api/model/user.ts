

import { db, ObjectId } from '../util/database.ts';
const userModel = db.collection('user');

import bcrypt from '../util/bcrypt.ts';
import tokenService from '../util/token.ts';
import emailService from '../util/email.ts';
import emailTemplate from '../views/emailTemplates.ts';


export default {

    signUp: async (ctx: any) => {
        const {value} = await ctx.request.body();
        if(!value.email || !value.password) {
            ctx.response.status = 400;
            ctx.response.body = {
                status: 400,
                message: 'Provide required data',
            }
            return;
        }
        const checkDuplicacy = await userModel.findOne({email: value.email});
        if(checkDuplicacy) {
            ctx.response.status = 409;
            ctx.response.body = {
                status: 409,
                message: 'User is alreday exist!'
            }
            return;
        }

        value.password = await bcrypt.encryptPassword(value.password);
        await userModel.insertOne(value);
        const mailOption = {
            from: '',
            to: value.email,
            subject: `Welcome to deno App ${value.name || 'Guest' }`,
            content: emailTemplate.signUpWelcome(value)
        };
        await emailService.sendEmail(mailOption);
        ctx.response.status = 201;
        ctx.response.body = {
            status: 201,
            message: 'User details addedd successfully'
        }
    },

    login: async (ctx: any) => {
        const {value} = await ctx.request.body();
        if(!value.email || !value.password) {
            ctx.response.status = 400;
            ctx.response.body = {
                status: 400,
                message: 'Provide required data',
            }
            return;
        }

        const userData = await userModel.findOne({email: value.email});
        if(userData) {

            const checkPassword = await bcrypt.verifyPassword(value.password, userData.password);
            if(checkPassword) {
                const token = await tokenService.createToken({
                    _id: userData._id,
                    email: userData.email
                });
                if(token) {
                    ctx.response.status = 200;
                    ctx.response.body = {
                        status: 200,
                        message: 'Login successfull',
                        token
                    }
                } else {
                    ctx.response.status = 500;
                    ctx.response.body = {
                        status: 500,
                        message: 'Internal server Error!',
                    }
                }
            } else {
                ctx.response.status = 400;
                ctx.response.body = {
                    status: 400,
                    message: 'Password is wrong',
                }
            }
            
        } else {
            ctx.response.status = 404;
            ctx.response.body = {
                status: 404,
                message: 'User not found',
            }
        }

    },

    getUserData: async (ctx: any) => {
        const tokenData = ctx.request.tokenData.payload.iss;
        const id = tokenData._id.$oid;

        const users = await userModel.findOne({_id: ObjectId(id)});
        ctx.response.body = {
            status: 200,
            users
        }
    },

    editUserData: async (ctx: any) => {
        const tokenData = ctx.request.tokenData.payload.iss;
        const id = tokenData._id.$oid;
        const { value } = await ctx.request.body();
        try {
            await userModel.updateOne({_id: ObjectId(id)}, value);
            ctx.response.status = 200;
            ctx.response.body = {
                status: 200,
                message: 'Data updated successfully'
            };
        } catch(e) {
            ctx.response.status = 404;
            ctx.response.body = {
                status: 404,
                message: "user doesn't exist"
            };
        }
    },

    deleteUser: async (ctx: any) => {
        const tokenData = ctx.request.tokenData.payload.iss;
        const id = tokenData._id.$oid;
        try {
            await userModel.deleteOne({ _id: ObjectId(id)});
            ctx.response.status = 204;
        } catch(e) {
            ctx.response.status = 404;
            ctx.response.body = {
                status: 404,
                message: "user doesn't exist"
            };
        }
    },

};
