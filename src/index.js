const cors = require('cors')
const express = require('express')

const app = express();
const port = 5000;

import apiRoutes from './api/Uploading';

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.send('hello there'))

app.use(cors());
app.options('*', cors());
app.use(express.json());

apiRoutes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



