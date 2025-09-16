import AppDataSource from "./database/data-source.ts"
import noteRoutes from "./routes/NoteRoutes.ts"

AppDataSource.initialize().then(async () => {

    const express = require('express');
    const cors = require('cors')
    const app = express();
    const port = 3000;
    app.use(cors())
    app.use(express.json())
    app.use('/api', noteRoutes)

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

}).catch(error => console.log(error))
