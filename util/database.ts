import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import { env } from './packages.ts';

const client = new MongoClient();
client.connectWithUri(env.DB_URL);
const db = client.database("deno");

export {
    db,
    ObjectId,
};