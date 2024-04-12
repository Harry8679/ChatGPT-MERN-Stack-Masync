const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
dotenv.config();


const PORT = process.env.PORT || 9000;

// ----- Routes -----
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));