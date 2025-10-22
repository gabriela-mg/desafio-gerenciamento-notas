import * as fs from 'fs';
import { Readable } from 'stream';
import { FileStorageManager } from './FileStoreManager';
import * as  path from 'path';


export class LocalFileStoreManager implements FileStorageManager {

    public async read(key: string) {
        const pathFile = this.createPathFile(key)

        const file = await this.readFile(pathFile)
        if(file) return file 
        else return null
    }

    public async save(key: string, file: Readable) {
        const pathFile = this.createPathFile(key)
        const answer = await this.saveFile(pathFile, file)
        return answer
    }

    public async delete(pathFile: string) {
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
            writeStream.on('error', (error) => {
                console.log(error)
                resolve(false)})
        })
    }

    private createPathFile(key: string) :string {
        const pathFile = "./temp/" + key 

        const dirPath = path.dirname(pathFile);

        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return pathFile
    }

}

