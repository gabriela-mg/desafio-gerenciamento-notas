import { ImageEntity } from "../database/entities/Image.entity.ts";
import AppDataSource from "../database/data-source.ts";
import { NoteEntity } from "../database/entities/Note.entity.ts";
import { Like } from "typeorm";

export class ImageRepostitory {

    private imageRepository = AppDataSource.getRepository(ImageEntity)

    public async findImages(note: NoteEntity): Promise<ImageEntity[]> {
         const images = await this.imageRepository.find({
            where: {
                note: note
            }
        })

        return images
    }

    
    public async findImagebyKey(key: string): Promise<ImageEntity> {
        const image = await this.imageRepository.findOne({
            where: {
                address: Like("%"+ key +"%") 
            }
        })

        return image
    }

    public async saveImage(key: string, note: NoteEntity) {

        const newImage = new ImageEntity()

        newImage.address = key
        newImage.note = note
        
        await this.imageRepository.save(newImage)

        return newImage
    }

    public async deleteImage(id: number) {
       
    }
} 