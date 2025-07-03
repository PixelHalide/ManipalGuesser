import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import pkg from 'exifr';
const { gps } = pkg;

interface CalcScoreRequestBody {
    mapNumber: number;
    submittedCords: [number, number];
    userID: string | null;
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
            submittedCords,
            userID
        }: CalcScoreRequestBody = req.body

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

   if (userID) {
        const db = client.db(DB_NAME);
        const collection = db.collection("userData");
        const user = await collection.findOne({ "userID": userID });

        if (user) {
            await collection.updateOne(
                { "userID": userID },
                { $inc: { "weeklyPoints": points, "totalPoints": points } }
            );
        } else {
            console.log(`User with ID ${userID} not found.`);
        }
    }
    res.status(200).send({points, imageCords, distanceInMeters});

} catch (error){
    console.log(error);
    return res.status(500).send({ error: "Error generating response" });
  }
    })();
});

app.post('/signUp', (req, res) => {
    (async () => {
    try {
        const {
            userName,
            userImage,
            userEmail,
            userID
        } = req.body

    const db = client.db(DB_NAME);
    const collection = db.collection("userData");
    let user = await collection.findOne({ "userEmail": userEmail });

    if (!user){
      const time = new Date().toISOString()

      await collection.insertOne({"userID":userID,
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


app.post('/form', (req, res) => {
    (async () => {
        try {
            const {
                name,
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
            const collection = db.collection("feedback");
            const time = Date.now()

            const docToInsert = {
                "time": time,
                "name": name,
                "message": message
            }

            await collection.insertOne(docToInsert);

            res.status(200).send({ success: true });
        } catch (error) {
            console.log("Invalid Input");
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