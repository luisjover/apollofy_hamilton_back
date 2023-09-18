import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors'
import usersRouter from './routes/users.routes';
import tracksRouter from './routes/tracks.routes';
import playListsRouter from './routes/playlists.routes';
import genresRouter from './routes/genres.routes';
import artistsRouter from './routes/artists.routes';
import albumsRouter from './routes/albums.routes';
import { favouritesRouter } from './routes/favourites.routes';

//Create an express application
const app = express();

app.use(cors());
// Middleware to be able to read incoming requests
app.use(express.json());
// Middleware to get info about requests
app.use(morgan("dev"))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}))

app.use("/users", usersRouter);
app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);
app.use("/playlists", playListsRouter);
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);
app.use("/favourites", favouritesRouter);


export default app;
