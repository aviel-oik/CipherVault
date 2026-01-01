import { MongoClient } from 'mongodb';
import 'dotenv/config';

let client;
let db;

async function connectMongoDB(uri) {
    if (db)
        return db;
    try {
        client = new MongoClient(uri);
        await client.connect();
        db = client.db('Cipher_Vault');
        console.log('connection to mongoDB successful');
        return db;
    }
    catch (err) {
        console.error('Erreur MongoDB:', err);
    }
}

const database = await connectMongoDB(process.env.MONGODB_URI_AND_PASSWORD);
const collec = database.collection("users");

export default collec;