// EXPRESS
const express = require('express');
const app = express();

// MODULES
const helmet = require('helmet');
const { supabase } = require('./config/supabase');


// SECURITE
app.use(helmet());
app.use('/:link_id', (req, res) => {
  console.log(req.params.link_id);
  supabase
      .from('links')
      .select()
      .eq('short', req.params.link_id)
      .then(({data, error}) => {
        if (error) {
          console.log(error)
          return res.status(500).send();
        } else {
          if (data.length == 0) res.redirect('https://links.onxzy.dev/');
          else res.redirect(data[0].dest);
        }
      })
})
app.use('/', (_, res) => res.redirect('https://links.onxzy.dev/'));

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json(err);
});

// EXPORTS
module.exports = app;
