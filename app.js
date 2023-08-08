//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import lodash from "lodash";

const port = 5000;

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const _ = lodash;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var displayNew = [];

app.get("/", (req,res) => {
  res.render("home.ejs", {
    homeText : homeStartingContent,
    displayNew : displayNew
  })
  console.log(displayNew);
});
app.get("/contact", (req,res) => {
  res.render("contact.ejs", {
    contactText : aboutContent,
  })
});
app.get("/about", (req,res) => {
  res.render("about.ejs", {
    aboutText : aboutContent,
  })
});
app.get("/compose", (req,res) => {
  res.render("compose.ejs")
});
app.post("/compose", (req,res) => {
  const display = {
    title : req.body.inputText,
    content : req.body.textArea,
  }
  displayNew.push(display);
  res.redirect("/");
});
app.get("/post/:email", (req,res) => {
  const requestedTitle = _.lowerCase(req.params.email);
  displayNew.forEach((display) => {
    const storedTitle = _.lowerCase(display.title);

    if(storedTitle === requestedTitle){
      res.render("post.ejs", {
        title : display.title,
        content : display.content,
      });
    }
  });
});


app.listen(process.env.PORT || port, () => {
  console.log(`Your server started on port ${port}`);
})


