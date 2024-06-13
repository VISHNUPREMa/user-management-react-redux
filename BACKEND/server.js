const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require("./MODEL/mongoose");
const router = require("../BACKEND/ROUTER/route")

app.use(express.json());
app.use(express.static('public'));
app.use(cors())

connectDB()

app.use("/",router)

app.listen(PORT,()=>{
    console.log(`Server is listening in port ${PORT}`);
})