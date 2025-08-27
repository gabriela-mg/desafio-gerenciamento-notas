import { Image } from "../database/entity/Image.entity";
import { AppDataSource } from "../data-source";

const ImageRespositry = AppDataSource.getRepository(Image)

export default ImageRespositry;