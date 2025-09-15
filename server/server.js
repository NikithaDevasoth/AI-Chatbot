import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectBD from './config/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'

const app = express()

const startServer = async () => {
  try {
    await connectBD()

    app.use(cors())
    app.use(express.json())

    app.get('/', (req, res) => res.send('Server is Live!'))

    // ❌ app.get is wrong for router
    // ✅ use app.use instead
    app.use('/api/user', userRouter);
    app.use('/api/chat',chatRouter)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`✅ Server is Running on port: ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err.message)
    process.exit(1)
  }
}

startServer();
