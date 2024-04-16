const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./utils/dbConnect');
dbConnect();
const userRouter = require('./routes/user.route');
const { errorHandler } = require('./middlewares/error.middleware');
dotenv.config();


const PORT = process.env.PORT || 9000;

app.use(express.json());

// ----- Routes -----
app.use('/api/v1/users', userRouter);

// ----- Error handler middleware -----
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));