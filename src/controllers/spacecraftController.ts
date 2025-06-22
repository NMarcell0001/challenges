import { Request, Response } from 'express';
import { getData } from '../utils/ajax.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });

import { LL2ListResponse, Spacecraft } from '../utils/interfaces.js';

const apiUrl: string = process.env.API_URL || 'https://ll.thespacedevs.com/2.2.0';

export const getSpacecraftsList = async (req: Request, res: Response): Promise<void> => {
  try {
    const response: LL2ListResponse<Spacecraft> = await getData<LL2ListResponse<Spacecraft>>(`${apiUrl}/spacecraft/?limit=20`);
    const spacecrafts: Spacecraft[] = response.results || [];

    res.render('spacecrafts-list', {
      spacecrafts: spacecrafts,
      error: null
    });
  } catch (error) {
    console.error("Error fetching spacecrafts list:", error);
    res.render('spacecrafts-list', {
      spacecrafts: [],
      error: "Failed to load spacecrafts. Please check your API connection."
    });
  }
};

export const getSpacecraftDetails = async (req: Request, res: Response): Promise<void> => {
  const spacecraftId: string = req.params.id;

  try {
    const spacecraftDetail: Spacecraft = await getData<Spacecraft>(`${apiUrl}/spacecraft/${spacecraftId}/`);

    res.render('spacecraft-detail', {
      spacecraft: spacecraftDetail,
      error: null
    });
  } catch (error) {
    console.error(`Error fetching spacecraft details for ID ${spacecraftId}:`, error);
    res.status(404).render('spacecraft-detail', {
      spacecraft: null,
      error: `Failed to load details for spacecraft ID: ${spacecraftId}.It might not exist or there was an API error.`});
    }
};
