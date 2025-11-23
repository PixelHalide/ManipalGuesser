import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from 'exifr';
import { exiftool } from 'exiftool-vendored';
import { appConfig } from '../config/appConfig';

const { gps } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export interface ScoreResult {
  points: number;
  imageCords: [number, number];
  distanceInMeters: number;
}

const EARTH_RADIUS_METERS = 6_371_000;
const MAX_POINTS = 5000;
const MIN_DISTANCE_THRESHOLD = 10;

type Coordinates = [number, number];

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

const toSignedCoordinate = (value?: number | null, ref?: string | null): number | null => {
  if (typeof value !== 'number') {
    return null;
  }

  if (typeof ref === 'string') {
    const firstChar = ref.trim().charAt(0).toUpperCase();
    if (firstChar === 'S' || firstChar === 'W') {
      return -Math.abs(value);
    }
  }

  return value;
};

const getGpsCoords = async (imagePath: string): Promise<Coordinates> => {
  try {
    const coords = await gps(imagePath);
    if (coords?.latitude != null && coords?.longitude != null) {
      return [coords.latitude, coords.longitude];
    }
  } catch (error) {
    console.warn(`exifr failed for ${imagePath}:`, error);
  }

  try {
    const tags = await exiftool.read(imagePath);
    const latitude = toSignedCoordinate(
      (tags.GPSLatitude as number | undefined) ?? null,
      (tags.GPSLatitudeRef as string | undefined) ?? null,
    );
    const longitude = toSignedCoordinate(
      (tags.GPSLongitude as number | undefined) ?? null,
      (tags.GPSLongitudeRef as string | undefined) ?? null,
    );

    if (latitude != null && longitude != null) {
      return [latitude, longitude];
    }
  } catch (error) {
    console.warn(`exiftool failed for ${imagePath}:`, error);
  }

  throw new Error('No GPS data found in EXIF');
};

const getImageCoordinates = async (mapNumber: number): Promise<Coordinates> => {
  const imageFile = path.resolve(
    __dirname,
    '../../locationPictures',
    `${mapNumber}.${appConfig.imageFormat}`,
  );

  return getGpsCoords(imageFile);
};

const calculateDistance = (imageCoords: Coordinates, submittedCoords: Coordinates): number => {
  const [lat1, lon1] = imageCoords.map(toRadians) as Coordinates;
  const [lat2, lon2] = submittedCoords.map(toRadians) as Coordinates;

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
};

const calculatePoints = (distance: number): number => {
  const adjustedDistance = distance < MIN_DISTANCE_THRESHOLD ? 0 : distance;
  const rawPoints = -appConfig.pointScalingFactor * adjustedDistance + MAX_POINTS;

  return rawPoints < 0 ? 0 : rawPoints;
};

export const scoreService = {
  async calculateScore(mapNumber: number, submittedCords: Coordinates): Promise<ScoreResult> {
    if (!Number.isFinite(mapNumber)) {
      throw new Error('Invalid map number provided');
    }

    const imageCords = await getImageCoordinates(mapNumber);
    const distanceInMeters = calculateDistance(imageCords, submittedCords);
    const points = calculatePoints(distanceInMeters);

    return {
      points,
      imageCords,
      distanceInMeters: distanceInMeters < MIN_DISTANCE_THRESHOLD ? 0 : distanceInMeters,
    };
  },
};
