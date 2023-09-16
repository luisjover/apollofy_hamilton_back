import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors'
import usersRouter from './routes/users.routes';
import tracksRouter from './routes/tracks.routes';
import playListsRouter from './routes/playlists.routes';
import genresRouter from './routes/genres.routes';
import topArtistsRouter from './routes/topArtists.routes';
import topAlbumsRouter from './routes/topAlbums.routes';
import topPlaylistsRouter from './routes/topPlaylists.routes';

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
app.use("/playlists", playListsRouter);
app.use("/genres", genresRouter);
app.use("/topArtists", topArtistsRouter);
app.use("/topAlbums", topAlbumsRouter);
app.use("/topPlaylists", topPlaylistsRouter);

export default app;
