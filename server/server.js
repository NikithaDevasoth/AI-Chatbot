import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectBD from './config/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoute.js'
import { stripeWebhooks } from './controllers/webhooks.js'

const app = express()

const startServer = async () => {
  try {
    await connectBD()
    app.post('/api/stripe',express.raw({type:'application/jsoono'}),stripeWebhooks)

   app.use(cors({
  origin: "http://localhost:5173",   // React frontend URL
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

    app.use(express.json())

    app.get('/', (req, res) => res.send('Server is Live!'))

   
    app.use('/api/user', userRouter);
    app.use('/api/chat',chatRouter);
    app.use('/api/message',messageRouter);
    app.use('/api/credit',creditRouter);

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`✅ Server is Running on port: ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer();
