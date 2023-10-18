const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const secret = 'vanhg';


app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const data = {
        "username": username,
        "password": password
    };
    const token = jwt.sign(data, secret);
    const content = {
        "token": token
    }
    console.log(content);
    res.send(content);
});


app.post('/login', (req, res) => {
    let token = req.body.token;
    try{
        decoded = jwt.verify(token, secret);
        const content = {
            "result": "ok",
            "username": decoded.username
        }
        res.send(content);
    } catch {
        const content = {
            "result": "false"
        }
        res.send(content);
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})