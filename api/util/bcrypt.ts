import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
    encryptPassword: async (password: string) => {
        return new Promise(async (resolve) => {
            const hash = await bcrypt.hash(password);
            resolve(hash);
        });
    },

    verifyPassword: async (password: string, hashedPassword: string) => {
        return new Promise(async (resolve) => {
            const result = await bcrypt.compare(password, hashedPassword);
            resolve(result);
        });
    },

};
