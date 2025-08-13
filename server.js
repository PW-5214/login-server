require('./config/db'); 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const userRouter = require('./api/User');
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
