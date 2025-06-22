import { Request, Response } from 'express';
import { getData } from '../utils/ajax.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });

import { LL2ListResponse, LaunchListItem, LaunchDetail } from '../utils/interfaces.js';

const apiUrl: string = process.env.API_URL || 'https://ll.thespacedevs.com/2.2.0';

export const getLaunchesList = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: LL2ListResponse<LaunchListItem> = await getData<LL2ListResponse<LaunchListItem>>(`${apiUrl}/launch/upcoming/?limit=10&mode=detailed`);
        const launches: LaunchListItem[] = response.results || [];

        res.render('index', {
            launches: launches,
            selectedItem: null,
            error: null
        });
    } catch (error) {
        console.error("Error fetching launches list:", error);
        res.render('index', {
            launches: [],
            selectedItem: null,
            error: "Failed to load launches. Please check your API connection."
        });
    }
};

export const getLaunchDetails = async (req: Request, res: Response): Promise<void> => {
    const launchId: string = req.params.id;

    try {
        const detailedLaunch: LaunchDetail = await getData<LaunchDetail>(`${apiUrl}/launch/${launchId}/?mode=detailed`);

        res.render('launch-detail', {
            launch: detailedLaunch,
            error: null
        });
    } catch (error) {
        console.error(`Error fetching launch details for ID ${launchId}:`, error);
        res.status(404).render('launch-detail', {
            launch: null,
            error: `Failed to load details for launch ID: ${launchId}. It might not exist or there was an API error.`
        });
    }
};
