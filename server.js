const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));