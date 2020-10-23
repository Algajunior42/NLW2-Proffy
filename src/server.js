// Server initialization
const express = require("express")
const server = express()

// Render functions imported
const { landingPage, studyPage, teachPage, submitForm } = require("./pages")

// Nunjucks setup (template engine)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

server
// Receive data from req.body
.use(express.urlencoded({ extended: true }))

// Static files setup
.use(express.static("public"))

// App routes
.get("/", landingPage)
.get("/study", studyPage)
.get("/teach", teachPage)
.post("/submited", submitForm)
// Starting port
.listen(5500)
