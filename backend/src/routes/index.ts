import { Router } from 'express';
import { healthController } from '../controllers/healthController';
import { scoreController } from '../controllers/scoreController';
import { authController } from '../controllers/authController';
import { feedbackController } from '../controllers/feedbackController';
import { leaderboardController } from '../controllers/leaderboardController';
import { userController } from '../controllers/userController';

const router = Router();

router.get('/', healthController.ping);
router.post('/calcScore', scoreController.calculateScore);
router.post('/signUp', authController.signUp);
router.post('/form', feedbackController.submitForm);
router.get('/leaderboard/:category/:page', leaderboardController.getLeaderboard);
router.get('/fetchSelfData/:userID', userController.fetchSelfData);
router.get('/fetchUserData/:userID', userController.fetchUserData);

export const apiRouter = router;
