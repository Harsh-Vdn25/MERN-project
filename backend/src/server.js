const express = require('express');
require("dotenv").config();
const cors=require('cors');
const app = express();
const connectDB=require('../src/config/db')
const noteRouter = require('./routers/noteRoutes');
const rateLimiter=require('../src/middleware/rateLimiter')
app.use(express.json());
app.use(cors());
app.use(rateLimiter);


app.use('/api/notes', noteRouter);

const port =process.env.PORT;

async function main() {
    await connectDB();
    app.listen(port, () => {
        console.log("Server is listening on port 5001")
    })
}

main();