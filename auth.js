const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const port = 3007;

dotenv.config();
app.use(bodyParser.json());

const users = [
  {
    username: "terra",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "dave",
    password: "password123member",
    role: "member",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({ token });
  } else {
    res.status(400).send({ message: "Username or password incorrect" });
  }
});

app.listen(port, () => {
  console.log(`This connection is listening on port http://localhost:${port}`);
});
