import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import createError from 'http-errors';
import * as Dotenv from 'dotenv';

Dotenv.config({ path: '.env' });

import launchRoutes from './routes/launchRoutes.js';
import spacecraftRoutes from './routes/spacecraftRoutes.js'; // NEW
import astronautRoutes from './routes/astronautRoutes.js';   // NEW

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', launchRoutes); // Handles '/', '/launches', '/launch/:id'
app.use('/spacecrafts', spacecraftRoutes); // Handles '/spacecrafts' and '/spacecrafts/:id'
app.use('/astronauts', astronautRoutes);   // Handles '/astronauts' and '/astronauts/:id'


app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`You can view your app at: http://localhost:${port}`);
});
