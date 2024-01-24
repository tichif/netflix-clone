const express = require('express');
const cors = require('cors');

const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('', moviesRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
