const express = require("express");
const path = require("path");
const { PORT } = require("../config");
const http = require("http");
const fs = require("fs").promises;
const axios = require("axios");

const server = express();

let app = http.createServer(server);

// Settings -- key , value ...

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// middleware

server.use("/", express.static(path.join(__dirname, "public")));
server.use(async (req, res, next) => {
  let count = await fs.readFile(path.join(__dirname, "count.txt"), "utf8");

  count = Number(count);

  count++;

  await fs.writeFile(path.join(__dirname, "count.txt"), `${count}`);

  req.count = count;

  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", async (req, res) => {
  // let site = await axios.get("https://eskiz.uz/");

  // site = site.data;

  // site = site.split("/assets");

  // site = site.join("https://eskiz.uz/assets");

  // await fs.writeFile(path.join(__dirname, "views", "index.ejs"), site);

  res.render("index", {
    count: req.count,
  });
});

server.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/main");
  res.status(201).send(req.body.num);
});

// EJS => embedded javascript;

// SSR => Server side rendering;
// SPA => rest api;

// request => so'rov;
// response => javob;

// GET => Malumotlarni olish;
// POST => Malumotlarni yuborish;
// PUT => Malumotlarni o'zgartiradi;
// PATCH => Malumotlarni o'zgartiradi;
// DELETE => Malumotlarni o'chirish;

app.listen(PORT, () => {
  console.log("Server ready at port " + PORT);
});
