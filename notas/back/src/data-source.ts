import "reflect-metadata"
import { DataSource } from "typeorm"
import { Note } from "./entity/Note.entity"
import { Image } from "./entity/Image.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Note, Image],
    migrations: [],
    subscribers: [],
})
