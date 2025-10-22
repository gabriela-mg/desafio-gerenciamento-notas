import { Readable } from "stream"

export interface FileStorageManager {
    save(key: string, file: Readable): Promise<boolean>
    read(key: string): Promise<Readable | null>
    delete(key: string): Promise<boolean>
}