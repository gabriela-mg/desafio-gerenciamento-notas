import * as fs from 'fs';
import { Readable } from 'stream';
import { FileStorageManager } from './FileStoreManager';
import * as  path from 'path';


export class LocalFileStoreManager implements FileStorageManager {

    public async read(key: string) {
        const filePath = this.createFilePath(key)

        const file = await this.readFile(filePath)
        if(file) return file 
        else return null
    }

    public async save(key: string, file: Readable) {
        const filePath = this.createFilePath(key)
        const answer = await this.saveFile(filePath, file)
        return answer
    }

    public async delete(key: string) {
        const filePath = this.createFilePath(key)

        fs.unlink(filePath, (err) => {
            if (err) 
                return false   
        });

        return true
    }

    private async readFile(filePath: string) :Promise<Readable> {
        const readableStream = fs.createReadStream(filePath)
        return readableStream
    }

    private async saveFile(filePath: string, stream) :Promise<boolean> {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(filePath)
            stream.pipe(writeStream)
            writeStream.on('finish', () => {resolve(true)})
            writeStream.on('error', (error) => {
                console.log(error)
                resolve(false)})
        })
    }

    private createFilePath(key: string) :string {
        const filePath = "./temp/" + key 

        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return filePath
    }

}

