import * as express from "express"
import { TypeORMNoteRepository } from "../repositories/TypeORMNoteRepository"
import { ImageService } from "../services/ImageService"
import { ImageRepostitory } from "../repositories/ImageRepository"
import { LocalFileStoreManager } from "../connectors/LocalFileStoreManager"
import { ImageController } from "../controllers/ImageController"

const imageRoutes = express.Router()
const imageService = new ImageService(new ImageRepostitory, new LocalFileStoreManager, new TypeORMNoteRepository)
const imageController = new ImageController(imageService)

imageRoutes.get('/note/:id/image', imageController.getImages)

imageRoutes.get('/note/:id/image/:id', imageController.getOneImage)

imageRoutes.post('/note/:id/image', imageController.addImage)

imageRoutes.delete('/note/:id/image/:id', imageController.deleteImage)

export default imageRoutes