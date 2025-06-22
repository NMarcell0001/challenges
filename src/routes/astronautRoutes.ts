import { Router } from 'express';
import { getAstronautsList, getAstronautDetails } from '../controllers/astronautController.js';

const router = Router();

router.get('/', getAstronautsList);

router.get('/:id', getAstronautDetails); // This will effectively be /astronauts/:id

export default router;
