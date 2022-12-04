// EXPRESS
const express = require('express');
const app = express();

// MODULES
const helmet = require('helmet');
const { Query } = require('node-appwrite');
const {databases} = require('./config/appwrite.config');


// SECURITE
app.use(helmet());
app.use('/:link_id', (req, res) => {
  console.log(req.params.link_id);
  databases.listDocuments(process.env.APPWRITE_DB, process.env.APPWRITE_COLLECTION, [Query.equal('short', req.params.link_id)])
    .then((link) => {
      if (link.total == 0) res.redirect('https://l.onxzy.dev/');
      else res.redirect(link.documents[0].dest);
    })
    .catch((err) => {
      if (err.code == 404) res.redirect('https://l.onxzy.dev/');
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
