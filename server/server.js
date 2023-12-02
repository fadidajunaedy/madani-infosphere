const { createServer } = require("http")
const { config } = require("dotenv")
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const refreshTokenRouter = require('./routes/refreshTokenRouter.js')
const tagRouter = require('./routes/tagRouter.js')
const reportRouter = require('./routes/reportRouter.js')
const eventRouter = require('./routes/eventRouter.js')
const contactRouter = require('./routes/contactRouter.js')

config()
const app = express()
const server = createServer(app)

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
)

// routers
app.use('/api', authRouter)
app.use('/api/users', userRouter)
app.use("/api/refreshToken", refreshTokenRouter)
app.use('/api/tags', tagRouter)
app.use('/api/reports', reportRouter)
app.use('/api/events', eventRouter)
app.use('/api/contacts', contactRouter)

//static Images Folder
app.use('/files', express.static('files'))
app.get('/preview/*', function(req, res) {
  try {
    let file = req.params[0]
    let fileLocation = path.resolve('./files', file);
    res.setHeader('Content-Disposition', 'inline');
    res.sendFile(fileLocation);
  } catch (error) {
    return res.status(500).send({ error: true, message: error.message })
  }

})

app.get('/download/*', function(req, res) {
  try {
    let file = req.params[0]
    let fileLocation = path.resolve('./files', file);
    res.setHeader('Content-Disposition', 'attachment');
    return res.sendFile(fileLocation);
  } catch (error) {
    return res.status(500).send({ error: true, message: error.message })
  }
})

app.get("/", function(req, res) {
  return res.json({success: true, message: "Hallo"})
})

//port
const port = process.env.PORT || 8080

//server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
})