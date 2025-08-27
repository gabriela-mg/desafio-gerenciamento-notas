import noteRoutes from "../routes/noteRoutes.ts"
import { AppDataSource } from "./data-source.ts"

AppDataSource.initialize().then(async () => {

    const express = require('express')
    const app = express()
    const port = 3000

    app.use(noteRoutes)

    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })


}).catch(error => console.log(error))
