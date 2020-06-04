import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
// import { ConnectConfigWithAuthentication } from "https://raw.githubusercontent.com/manyuanrong/deno-smtp/master/config.ts";
import { env } from './packages.ts';

const client = new SmtpClient();
const email = env.EMAIL;
const email_password = env.EMAIL_PASSWORD;

const params = {
    hostname: "smtp.gmail.com",
    port: 465,
    username: email,
    password: email_password,
}
  
await client.connectTLS(params);


export default {
    sendEmail: async (mailoption: any) => {
        return new Promise(async (resolve) => {
            mailoption.from = email;
            try {
                await client.send(mailoption);
                resolve(true);
            } catch(e) {
                console.log('Error while sending email -->', e);
                resolve(false);
            } finally {
                client.close();
            }
        });
    }
};