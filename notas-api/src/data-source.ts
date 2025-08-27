import "reflect-metadata"
import { DataSource } from "typeorm"
import { Note } from "./database/entity/Note.entity.ts"
import { Image } from "./database/entity/Image.entity.ts"

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
    migrations: ["./database/migrations/*.ts"],
    subscribers: [],
})
