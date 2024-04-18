const express = require("express")
const app = express()
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config()

// middlewares
const { errorHandler, routeNotFound } = require("./middleware/errorMiddleware")

app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Server Running..." })
})

// Error handling routes
app.use(routeNotFound)
app.use(errorHandler)

app.listen(process.env.PORT || 8000, () => {
  console.log(
    colors.brightMagenta(`\nServer is UP on PORT ${process.env.PORT || 8000}`)
  )
  console.log(
    `Visit  ` + colors.underline.blue(`localhost:${process.env.PORT || 8000}`)
  )
})
