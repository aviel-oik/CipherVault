import { Router } from 'express';
import { authentificationQuery } from '../middlewares/authMiddleware.js';
import supabase from '../connection/connectionToSupabase.js'
import collec from '../connection/connectionToMongoDB.js';
import { reverseEncryption, atbashEncryption } from '../helpFunction/encyptDecrypt.js'

const router = Router();
const cipherTypesAvailable = ['reverse', 'atbash'];

router.use(authentificationQuery);

router.post('/encrypt', async (req, res) => {
    if (!req.body.message || !req.body.cipherType)
        return res.status(400).json({ message: 'incomplete body (message or cipherType)' });
    if (!cipherTypesAvailable.includes(req.body.cipherType))
        return res.status(400).json({ message: 'cipherType not available' });
    const encryptedText = reverseEncryption(req.body.message);
    const insertionTime = new Date().toISOString();
    await supabase
        .from('messages')
        .insert([{
            username: req.query.username,
            cipher_type: req.body.cipherType,
            encrypted_text: encryptedText,
            inserted_at: insertionTime
        }])
    const id = await supabase
        .from('messages')
        .select('id')
        .eq('username', req.query.username)
        .eq('cipher_type', req.body.cipherType)
        .eq('encrypted_text', encryptedText)
        .eq('inserted_at', insertionTime)
        .single();
    await collec.updateOne(
        { username: req.query.username },
        { $inc: { encryptedMessagesCount: 1 } }
    );
    return res.status(200).json({ id: id.data.id, cipherType: req.body.cipherType, encryptedText: encryptedText });
});

router.post('/decrypt', async (req, res) => {
    if (!req.body.messageId || isNaN(req.body.messageId))
        return res.status(400).json({ message: 'incorrect body (messageId)' })
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('id', req.body.messageId)
    console.log(data, error);
    if (error || data.length === 0)
        return res.status(400).json({ message: 'message no found' });
    const encryptedText = data[0].encrypted_text;
    const decryptedText = reverseEncryption(encryptedText);
    return res.status(200).json({ id: data[0].id, decryptedText: decryptedText });
});

router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('username', req.query.username);
    console.log(data, error);
    return res.status(200).json({ items: data });
});

export default router;
