import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import pkg from 'exifr';
const { gps } = pkg;

dotenv.config()

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING environment variable is not defined');
}

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

app.post('/calcScore', async (req,res) => {
    try {
        const {
            mapNumber,
            submittedCords
        } = req.body

    //const db = client.db(DB_NAME);
    //const collection = db.collection("reactTravel");
    //const time = Date.now()

    const imgPath = `./public/manipalPictures/${mapNumber}.jpg`

    const coords = await gps(imgPath);
    let imageCords;
    if (coords?.latitude != null && coords?.longitude != null) {
        imageCords = [coords.latitude, coords.longitude];
    } else {
        throw new Error('No GPS data found in EXIF');
    }

    const toRadians = (deg: number): number => deg * Math.PI / 180;

    const R = 6371e3; // Earth's radius
    const lat1 = toRadians(imageCords[0]);
    const lon1 = toRadians(imageCords[1]);
    const lat2 = toRadians(submittedCords[0]);
    const lon2 = toRadians(submittedCords[1]);

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    // Haversine formula
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in meters
    let distanceInMeters = R * c;

    // if distance is less than 10 meters, set to 0
    if (distanceInMeters < 10) {
      distanceInMeters = 0;
    }
    let points = -2.59*distanceInMeters + 5000
    /*
    Assuming a square map of 1.87km^2, if the guess is on the opposite corner, the points awarded are 0
    Fo a perfect guess, 5k points are awarded.
    */
   if (points < 0) points = 0;
    console.log(points);


    res.status(200).send({points});

} catch (error){
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
})