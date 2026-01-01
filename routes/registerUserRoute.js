import { Router } from 'express';
import collec from '../connection/connectionToMongoDB.js';

const router = Router();

router.post('/', async (req, res) => {
    let user = req.body;
    if (!user.username || !user.password || Object.keys(user).length !== 2)
        return res.status(400).json({ message: 'incorrect user data' });
    user = { ...user, ...{ encryptedMessagesCount: 0, createdAt: new Date().toISOString() } };
    await collec.insertOne(user);
    const id = await collec.findOne({ username: user.username }, { projection: { _id: 1 } });
    res.status(201).json({ id: id._id, username: user.username });
});

export default router;