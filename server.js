import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the Hompage.");
})

app.get("/admin", (req, res) => {
    res.send("This is the Admin page.");
})

app.listen(3000)