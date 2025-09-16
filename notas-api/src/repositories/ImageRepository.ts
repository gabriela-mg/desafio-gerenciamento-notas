import { Image } from "../database/entities/Image.entity.ts";
import AppDataSource from "../database/data-source.ts";

export const ImageRepository = AppDataSource.getRepository(Image)