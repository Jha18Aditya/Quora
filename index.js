const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");
const app = express();
const port = 8080;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    user: "Aditya",
    content: "What is earth without art",
  },
  {
    id: uuidv4(),
    user: "Elena",
    content: "The only way to do great work is to love what you do.",
  },
  {
    id: uuidv4(),
    user: "Ivan",
    content: "In the middle of difficulty lies opportunity.",
  },
  {
    id: uuidv4(),
    user: "Sophia",
    content: "Turn your wounds into wisdom.",
  },
  {
    id: uuidv4(),
    user: "Liam",
    content: "It always seems impossible until it's done.",
  },
];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { user, content } = req.body;
  const id = uuidv4();
  posts.push({ id, user, content });
  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("post", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server is starting on post ${port}`);
});
