import { ImageRepostitory } from "../repositories/ImageRepository"
import { NoteEntity } from "../database/entities/Note.entity"
import { Readable } from "stream"
import { FileStorageManager } from "../connectors/FileStoreManager"
import { nanoid } from 'nanoid'
import { NoteRepository } from "../repositories/NoteRepository"
import { ReadStream } from "fs"

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
        const images = []

        imagesEntities.map(async (image) => { 
            images.push(await this.fileStore.read(image.address))
        })

        return images
    }

    public async addImage(image: Readable, id: string) {
        const noteId = Number(id)
        const newNote = new NoteEntity()
        const note = await this.noteRepo.findNoteById(noteId)

        newNote.id = note.id
        newNote.title = note.title
        newNote.description = note.description

        const key = this.generateKey(id)
        const answer = await this.fileStore.save(key, image)
        if (answer) {
            await this.imageRepo.saveImage(key, newNote) 
        }
    }

    public async deleteImage(id: string) {
        
    }

    private generateKey(noteId: string) {
        const key = "note/" + noteId + "/" + nanoid()

        return key
    }

}