const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config()

const app = express();

app.use(cors());

const PORT = process.env.PORT;``
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(CONNECTION_STRING);

async function startServer() {
  await client.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

// Middleware
app.use(bodyParser.json())

app.get('/',(req,res) => {
  res.status(200).send("API is Up");
})

app.post('/form', async (req,res) => {
    try{    const {
        name,
        email,
        message
    } = req.body

    if (
      typeof message !== 'string' ||
      message.length === 0 ||
      message.length > 400 || // Limit length
      /[$<>]/.test(message)    // Prevent some special characters
    ) {
      return res.status(400).send({ error: "Invalid message input" });
    }

    const db = client.db(DB_NAME);
    const collection = db.collection("reactTravel");
    const time = Date.now()

    const docToInsert = {
        "time": time,
        "name": name,
        "email": email,
        "message": message
    }

    await collection.insertOne(docToInsert);

    res.status(200).send({ success: true });
} catch (error){
    console.log("Invalid Input");
    return res.status(500).send({ error: "Error generating response" });
  }
})