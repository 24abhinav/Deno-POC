import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { ConnectConfigWithAuthentication } from "https://raw.githubusercontent.com/manyuanrong/deno-smtp/master/config.ts";

const client = new SmtpClient();

const params = <ConnectConfigWithAuthentication>{
    hostname: "smtp.gmail.com",
    port: 465,
    username: "abhinav.test.m@gmail.com",
    password: "test@abhinav",
}
  
await client.connectTLS(params);


export default {
    sendEmail: async (mailoption: any) => {
        return new Promise(async (resolve) => {
            mailoption.from = 'abhinav.test.m@gmail.com';
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