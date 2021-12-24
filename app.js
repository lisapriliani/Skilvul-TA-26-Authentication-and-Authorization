const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const port = 3000;

const oneMinute = 1000 * 60;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: oneMinute,
      sameSite: true,
    },
  })
);

const myusername = "user1";
const mypassword = "mypassword";

let session;

app.get("/", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.send("Welcome User <a href='/logout'>click to logout</a>");
  } else res.sendFile("views/index.html", { root: __dirname });
});

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`This connection is listening on port http://localhost:${port}`);
});
