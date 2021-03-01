const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(routes);

const port = process.env.PORT || 3010;
app.listen(port);





