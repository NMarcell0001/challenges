import { Router } from 'express';
import { getSpacecraftsList, getSpacecraftDetails } from '../controllers/spacecraftController.js';

const router = Router();

router.get('/', getSpacecraftsList);

router.get('/:id', getSpacecraftDetails); // Note: this will effectively be /spacecrafts/:id because of how it's used in start.ts

export default router;
