//require all my modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const myMongo = require(__dirname + '/mongoose.js');

//set up express as app by convention
const app = express();

//tells express where to look for static files
app.use(express.static('public'));
//set up express to use body-parser as middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
//set up express to use ejs as the view engine
app.set('view-engine', 'ejs');

//Set up my Routes
//home route
app.get('/', (req, res) => {
  async function wrapperFunc() {
    const results = await myMongo.findBlog();
    res.render('main.ejs', {
      blogList: results
    })
  }
  wrapperFunc();

})

app.get('/about', (req, res) => {
  res.render('about.ejs');
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

app.get('/compose', (req, res) => {
  res.render('compose.ejs');
})

app.get('/blog/:custom', (req, res) => {
  async function wrapperFunc() {
    const result = await myMongo.findBlog({
      name: req.params.custom
    });
    res.render('singleBlog.ejs', {
      blog: result[0]
    });
  }
  wrapperFunc();
})

app.post('/seeMore', (req, res) => {

  async function wrapperFunc() {
    const result = await myMongo.findBlog({
      _id: req.body.moreButton
    });

    res.redirect(`/blog/${result[0].name}`);
  }
  wrapperFunc();

})

app.post('/create', (req, res) => {
  console.log(req.body.bodyInput);
  async function wrapperFunc() {
    await myMongo.addBlog(req.body.nameInput, req.body.bodyInput);
    res.redirect('/');
  }
  wrapperFunc();
})

app.post('/delete', (req, res) => {
  async function wrapperFunc() {
    await myMongo.deleteBlogById(req.body.checkbox);
    res.redirect('/');
  }
  wrapperFunc();
})


//tell server which port to listen on, either localhost 3000 or dynamic port of server
app.listen(process.env.PORT || 3000, console.log("Server is Listening on Port 3000"));




//