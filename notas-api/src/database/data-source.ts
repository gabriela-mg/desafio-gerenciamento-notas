import "reflect-metadata"
import { DataSource } from "typeorm"
import { Image } from "./entities/Image.entity.ts"
import { Note } from "./entities/Note.entity.ts"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "teste",
    password: "teste",
    database: "teste",
    synchronize: false,
    logging: false,
    entities: [Note, Image],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
})

export default AppDataSource