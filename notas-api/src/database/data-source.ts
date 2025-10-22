import "reflect-metadata"
import { DataSource } from "typeorm"
import { ImageEntity } from "./entities/Image.entity.ts"
import { NoteEntity } from "./entities/Note.entity.ts"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "teste",
    password: "teste",
    database: "teste",
    synchronize: true,
    logging: false,
    entities: [NoteEntity, ImageEntity],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
})

export default AppDataSource