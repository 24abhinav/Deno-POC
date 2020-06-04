import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
// import { ConnectConfigWithAuthentication } from "https://raw.githubusercontent.com/manyuanrong/deno-smtp/master/config.ts";
import { env } from './packages.ts';

const client = new SmtpClient();
const EMAIL = env.EMAIL;
const EMAIL_PASSWORD = env.EMAIL_PASSWORD;

const params = {
    hostname: "smtp.gmail.com",
    port: 465,
    username: EMAIL,
    password: EMAIL_PASSWORD,
}
  
await client.connectTLS(params);


export default {
    sendEmail: async (mailoption: any) => {
        return new Promise(async (resolve) => {
            mailoption.from = EMAIL;
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