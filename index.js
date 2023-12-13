import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import _ from "lodash";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
var posts = [];

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}))

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/" ,(req,res) =>{
    res.render("home.ejs", {p1 : homeStartingContent, blog : posts});
})
app.get("/home" ,(req,res) =>{
    res.render("home.ejs", {p1 : homeStartingContent })
})
app.get("/posts", (req,res) =>{
    res.render("posts.ejs", {blog : posts})
})
app.get("/about" ,(req,res) =>{
    res.render("about.ejs" ,{p2 : aboutContent})
})
app.get("/contact" ,(req,res) =>{
    res.render("contact.ejs" ,{p3 : contactContent})
})
app.get("/login", (req,res) =>{
    res.render("login.ejs")
})
app.get("/compose", (req,res) =>{
    res.render("login.ejs")
})
app.post("/compose" , (req,res) =>{
    const pass = req.body["password"];
    if(pass === "1234"){
        res.render("compose.ejs")
    }
    else{
        res.render("incorrect.ejs")
    }
})
app.post("/blog" , (req,res) =>{
    const blog = {title : req.body["title"] , content : req.body["content"]};
    posts.push(blog);
    res.redirect("/")
})
app.get("/:day", function(req,res){
    const requested = _.lowerCase(req.params.day);
    posts.forEach(element => {
        const stored = _.lowerCase(element.title);
        if(stored === requested){
            res.render("post.ejs" , {title : element["title"] , post : element["content"]});
        };
    });
})
app.get("/posts/day",(req,res)=>{
    res.render("login.ejs");
})
app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
})