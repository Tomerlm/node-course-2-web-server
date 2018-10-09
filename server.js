const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');


app.use((req , res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err) => {
    if(err){
      console.log('Unable to log file');
    }
  });
  next();
});

app.use((req , res , next) => {
  res.render('maintenance.hbs' , {
    pageTitle: 'ROOT PAGE',
    welcomeMessage: 'Welcome to this broken site. enjoy',
    headerText: 'this is the header text'
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});


app.get('/' , (req , res) => {
  res.render('root.hbs' , {
    pageTitle: 'ROOT PAGE',
    welcomeMessage: 'Welcome to this broken site. enjoy',
    headerText: 'this is the header text'
  });
});

app.get('/about' , (req , res) => {
  res.render('about.hbs' , {
    pageTitle: 'About Page2',
    headerText: 'this is the header text'
  });
})

app.get('/bad' , (req , res) => {
  res.send({
    errorMessage: 'Unable to fulfill request.',
    errorCode: 9000
  });
})

app.listen(port , () => {
  console.log(`Server is up on port ${port}`);
});
