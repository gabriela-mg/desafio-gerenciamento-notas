import { AppDataSource } from "./data-source"
import router from "./routes/dataRoutes";
import cors from "cors";

AppDataSource.initialize().then(async () => {

    const express = require('express');
    const app = express();
    const bodyParser= require('body-parser');
    app.use(cors({origin:'http://localhost:4200', credentials: true}));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true })); 
    const port = 4200;

    app.use('/api', router);

    app.listen(port, () => {
        console.log("Funcionando")
    })

}).catch(error => console.log(error))
