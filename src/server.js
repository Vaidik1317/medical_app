const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/connectDB')
// const {loadProcedures} = require('./database/loadProcedures')
const PORT = process.env.PORT || 7000
const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("home page")
})



const startSrver = async () => {
    try {
       await connectDB();
// await loadProcedures();
app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`)
})
   
    } catch (error) {
        console.log("🚀 ~ startSrver ~ error:", error)
        
    }
}

startSrver();