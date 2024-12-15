const express = require('express');
const app = express();
const port = 5000;

const citiesRouter = require('./routes/cities');



const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.use('/cities', citiesRouter);