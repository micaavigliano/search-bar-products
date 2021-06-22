const express = require('express')
const morgan = require('morgan')
const api = require('./api')
var cors = require('cors');

const app = express()
app.use(cors());
const PORT = process.env.PORT || 8080

//logger de los request -- borrar luego
app.use(morgan('tiny'))

//ruteo
app.get('/api/items', (req, res) => {
    api.getItems(req.query.q)
        .then((items) => res.json(items))
        .catch((err) => res.status(err.status).send(err))
})

app.get('/api/items/:id', (req, res) => {
    api.getItemsDetails(req.params.id)
      .then((item) => res.json(item))
      .catch((error) => res.status(error.status).send(error));
  });

app.listen(PORT, console.log(`Server is starting at ${PORT}`))