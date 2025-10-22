import { ImageRepostitory } from "../repositories/ImageRepository"
import { NoteEntity } from "../database/entities/Note.entity"
import { Readable } from "stream"
import { FileStorageManager } from "../connectors/FileStoreManager"
import { nanoid } from 'nanoid'
import { NoteRepository } from "../repositories/NoteRepository"
import { ReadStream } from "fs"
import { ImageEntity } from "../database/entities/Image.entity"

export class ImageService {

    constructor(private imageRepo: ImageRepostitory, private fileStore: FileStorageManager, private noteRepo: NoteRepository) {
        this.imageRepo = imageRepo,
        this.fileStore = fileStore,
        this.noteRepo = noteRepo
    }

    public async selectImages(id: string) {
        const noteId = Number(id)

        const note = await this.noteRepo.findNoteById(noteId)
        const noteEntity = new NoteEntity()
        noteEntity.id = note.id
        noteEntity.title = note.title
        noteEntity.description = note.description
    
        const imagesEntities = await this.imageRepo.findImages(noteEntity)
       
        const imagesKeys: string[] = []
        imagesEntities.map((image) => {
            imagesKeys.push(image.address)
        })
        return imagesKeys
    }

    public async selectOneImage(key: string) {
        const imageEntity = await this.imageRepo.findImagebyKey(key)
        const image = await this.fileStore.read(imageEntity.address)

        return image
    }

    public async addImage(image: Readable, id: string, mimeType: string) {
        const noteId = Number(id)
        const newNote = new NoteEntity()
        const note = await this.noteRepo.findNoteById(noteId)

        newNote.id = note.id
        newNote.title = note.title
        newNote.description = note.description

        const key = this.generateKey(id, mimeType)
        const answer = await this.fileStore.save(key, image)
        if (answer) {
            await this.imageRepo.saveImage(key, newNote) 
        }
    }

    public async deleteImage(id: string) {
        
    }

    private generateKey(noteId: string, mimeType: string) {
        const type = mimeType.substring(6)

        console.log(type)
        const key = "note/" + noteId + "/" + nanoid() + "." + type
        return key
    }


}