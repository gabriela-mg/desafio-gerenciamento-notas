import AppDataSource from "./database/data-source.ts"
import imageRoutes from "./routes/ImageRoute.ts";
import noteRoutes from "./routes/NoteRoutes.ts"
import * as express from 'express'
import * as cors from 'cors'

AppDataSource.initialize().then(async () => {

    const app = express();
    const port = 3000;
    app.use(cors())
    app.use(express.json())
    app.use('/api', noteRoutes)
    app.use('/api', imageRoutes)

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

}).catch(error => console.log(error))
