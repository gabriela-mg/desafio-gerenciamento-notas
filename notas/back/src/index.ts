import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    const express = require('express');
    const app = express();
    const port = 4200;

    app.listen(port, function(req, res) {
        res.sendFile('pages/app.js')
    })

}).catch(error => console.log(error))
