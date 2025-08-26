import { AppDataSource } from "./data-source"
import router from "./routes/dataRoutes";

AppDataSource.initialize().then(async () => {

    const express = require('express');
    const app = express();
    const bodyParser= require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    const port = 4200;

    app.use('/api', router);

    app.listen(port, () => {
        console.log("Funcionando")
    })

}).catch(error => console.log(error))
