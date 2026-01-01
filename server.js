import express from 'express'
import registerUserRoute from './routes/registerUserRoute.js'
import messageRouter from './routes/messageRoute.js'
import infoUserRute from './routes/infoUserRoute.js'

const app = express()
const PORT = 8000

app.use(express.json())
app.use('/api/auth/register', registerUserRoute)
app.use('/api/messages', messageRouter)
app.use('/api/users/me', infoUserRute)

app.listen(PORT, () => {
    console.log('server run...')
})