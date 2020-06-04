import { config } from "https://deno.land/x/dotenv/mod.ts";
import { renderFile } from 'https://deno.land/x/dejs/mod.ts';

const env = config();
const { cwd, stdout, copy } = Deno;


export {
    env,
    renderFile,
    cwd,
    stdout,
    copy
}