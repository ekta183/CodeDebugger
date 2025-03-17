
const express = require("express");
const cors = require("cors");
const app = express()
const port = 3000

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('This is Homepage')
  })

app.get('/test', (req, res) => {
  res.send('Backend Running')
})

app.post("/analyse", (req, res) => {
    console.log("Received code:", req.body.code);
    res.json({ message: "This Is SOME Response" });  
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})