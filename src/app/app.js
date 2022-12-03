// EXPRESS
const express = require('express');
const app = express();

// MODULES
const helmet = require('helmet');
const {databases} = require('./config/appwrite.config');


// SECURITE
app.use(helmet());
app.use('/:link_id', (req, res) => {
  console.log(req.params.link_id);
  databases.getDocument(process.env.APPWRITE_DB, process.env.APPWRITE_COLLECTION, req.params.link_id)
    .then((link) => {
      res.redirect(link.dest);
    })
    .catch((err) => {
      if (err.code == 404) res.status(404).json();
      else {
        console.error(err);
        res.status(500).send();
      }
    })
 
  
})
app.use('/', (req, res) => res.status(404).send());

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json(err);
});

// EXPORTS
module.exports = app;
