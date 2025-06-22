import { Request, Response } from 'express';
import { getData } from '../utils/ajax.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });

import { LL2ListResponse, Astronaut } from '../utils/interfaces.js';

const apiUrl: string = process.env.API_URL || 'https://ll.thespacedevs.com/2.2.0';

export const getAstronautsList = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: LL2ListResponse<Astronaut> = await getData<LL2ListResponse<Astronaut>>(`${apiUrl}/astronaut/?limit=20`);
        const astronauts: Astronaut[] = response.results || [];

        res.render('astronauts-list', {
            astronauts: astronauts,
            error: null
        });
    } catch (error) {
        console.error("Error fetching astronauts list:", error);
        res.render('astronauts-list', {
            astronauts: [],
            error: "Failed to load astronauts. Please check your API connection."
        });
    }
};

export const getAstronautDetails = async (req: Request, res: Response): Promise<void> => {
    const astronautId: string = req.params.id;

    try {
        const astronautDetail: Astronaut = await getData<Astronaut>(`${apiUrl}/astronaut/${astronautId}/`);

        res.render('astronaut-detail', {
            astronaut: astronautDetail,
            error: null
        });
    } catch (error) {
        console.error(`Error fetching astronaut details for ID ${astronautId}:`, error);
        res.status(404).render('astronaut-detail', {
            astronaut: null,
            error: `Failed to load details for astronaut ID: ${astronautId}. It might not exist or there was an API error.`
        });
    }
};
