import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import pkg from 'exifr';
import { v4 as uuidv4 } from 'uuid';
const { gps } = pkg;

interface SignUpRequestBody {
    userName: string;
    userImage: string;
    userEmail: string;
    isNewUser?: boolean;
}

interface CalcScoreRequestBody {
    mapNumber: number;
    submittedCords: [number, number];
}

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error('CONNECTION_STRING environment variable is not defined');
}

const client = new MongoClient(CONNECTION_STRING);

// Routes
app.get('/', (req, res) => {
  res.status(200).send("API is Up");
});

app.post('/calcScore', (req, res: express.Response) => {
    (async () => {
    try {
        const {
            mapNumber,
            submittedCords
        }: CalcScoreRequestBody = req.body

    const db = client.db(DB_NAME);
    const collection = db.collection("userData");
    const time = Date.now()

    const ip =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    await collection.insertOne({"ip": ip, "time": time});

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


    res.status(200).send({points, imageCords});

} catch (error){
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
    })();
});

app.post('/signUp', (req, res: express.Response) => {
    (async () => {
    try {
        const {
            userName,
            userImage,
            userEmail,
            isNewUser
        }: SignUpRequestBody = req.body


    if (isNewUser){

      const db = client.db(DB_NAME);
      const collection = db.collection("userData");
      const time = new Date().toISOString()
      const UUID = uuidv4();

      await collection.insertOne({"userID":UUID,
                                  "userName":userName,
                                  "userEmail":userEmail,
                                  "userImage":userImage,
                                  "weeklyPoints":0,
                                  "totalPoints":0,
                                  "signedUpAt":time
                                });
                            }
    res.status(200).send("Success");
} catch (error){
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
    })();
});


// Start server
async function startServer() {
  await client.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();