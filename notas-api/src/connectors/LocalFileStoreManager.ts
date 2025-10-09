import * as fs from 'fs';
import { Readable } from 'stream';
import { FileStorageManager } from './FileStoreManager';


export class LocalFileStoreManager implements FileStorageManager {

    async read(key: string) {
        const pathFile = this.createPathFile(key)

        const file = await this.readFile(pathFile)
        
        return file
    }

    async save(key: string, file: Readable) {
        const pathFile = this.createPathFile(key)
        const answer = this.saveFile(pathFile, file)
        return answer
    }

    async delete(pathFile: string) {
        return true
    }

    private async readFile(pathFile: string) :Promise<Readable> {
        const readableStream = fs.createReadStream(pathFile)
        return readableStream
    }

    private async saveFile(pathFile: string, stream) :Promise<boolean> {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(pathFile)
            stream.pipe(writeStream)
            writeStream.on('finish', () => {resolve(true)})
            writeStream.on('error', () => {resolve(false)})
        })
    }

    private createPathFile(key: string) :string {
        const pathFile = "./temp/" + key

        return pathFile
    }

}

