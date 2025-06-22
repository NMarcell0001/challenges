import { Router } from 'express';
import { getLaunchesList, getLaunchDetails } from '../controllers/launchController.js';

const router = Router();

router.get('/', getLaunchesList); // Home page route (Could be changed in the future)
router.get('/launches', getLaunchesList);
router.get('/launch/:id', getLaunchDetails);

export default router;
