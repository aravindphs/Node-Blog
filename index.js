import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import lodash from "lodash";

const port = 5000;

const homeStartingContent = "";
const aboutContent = "";

const app = express();
const _ = lodash;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var displayNew = [];

app.get("/", (req, res) => {
  res.render("home.ejs", {
    homeText: homeStartingContent,
    displayNew: displayNew,
  });
  console.log(displayNew);
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contactText: aboutContent,
  });
});
app.get("/about", (req, res) => {
  res.render("about.ejs", {
    aboutText: aboutContent,
  });
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});
app.post("/compose", (req, res) => {
  const display = {
    title: req.body.inputText,
    content: req.body.textArea,
  };
  displayNew.push(display);
  res.redirect("/");
});
app.get("/post/:email", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.email);
  displayNew.forEach((display) => {
    const storedTitle = _.lowerCase(display.title);

    if (storedTitle === requestedTitle) {
      res.render("post.ejs", {
        title: display.title,
        content: display.content,
      });
    }
  });
});

app.post("/delete/:email", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.email);
  const indexToRemove = displayNew.findIndex(
    (display) => _.lowerCase(display.title) === requestedTitle
  );

  if (indexToRemove !== -1) {
    displayNew.splice(indexToRemove, 1);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Your server started on port ${port}`);
});
