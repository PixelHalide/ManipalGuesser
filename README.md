# ManipalGuessr

A GeoGuessr-style game focused on Manipal locations! Test your knowledge of the Manipal campus by guessing locations from photographs.

Hosted at https://manipal-guessr.vercel.app/

## Features

- **Location Guessing Game**: View photos of various Manipal locations and guess where they were taken
- **Interactive Map**: Click on the map to place your guess
- **Scoring System**: Earn points based on how close your guess is to the actual location
- **User Authentication**: Sign up and track your progress with NextAuth
- **Leaderboard**: Compete with other players and see who knows Manipal best
- **Responsive Design**: Play on desktop or mobile devices
- **Weekly Resets**: Fresh challenges with weekly leaderboard resets

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Express
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth v5
- **Database**: MongoDB
- **Maps**: Leaflet
- **Image Handling**: EXIFR for metadata extraction
- **Deployment**: Vercel

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/manipal-guessr.git
   cd manipal-guessr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and fill the variables

4. **Configure the game**
   Update `config.json` with your game config.
   ```json
    {
        "pointScalingFactor":2.59,
        "mapCount": 11,
        "imageFormat": "avif"
    }
   ```

   Greater the Point Scaling Factor, Higher the point penalty for each Meter off the location. The following formula is used:

   `-pointScalingFactor*DistanceFromLocation + 5000 = Points`

   mapCount is the number of maps (images) in the locationPictures directory.

   Image formats tested to work are avif and jpg. avif is recommended due to higher quality and lower file sizes.

5. **Add location images**
   Place your location photos in the `public/locationPictures/` directory, numbered from 1 to your `mapCount`.

6. **Run the development server**
   ```bash
   npm run dev
   ```

## How to Play

1. **Sign Up/Login**: Create an account or sign in to track your progress
2. **View the Photo**: Study the location image carefully
3. **Make Your Guess**: Click on the interactive map where you think the photo was taken
4. **Submit**: Click the submit button to see your results
5. **Score**: Earn points based on accuracy, Closer the guess, Higher the points
6. **Compete**: Check the leaderboard to see how you rank against other players

## 📄 License

This project is open source and available under the [GPL License](LICENSE).



---

Made with ❤️ By PixelHalide and Shlok V.