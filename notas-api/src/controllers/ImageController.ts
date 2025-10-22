import { Request, Response } from 'express'
import { ImageService } from '../services/ImageService';
import * as busboy from 'busboy'
import * as fileType from 'file-type'

export class ImageController {

    constructor(private imageService: ImageService) {
       this.imageService = imageService
    }

    public getImages = async (req: Request, res: Response) => {
        try {
            const images = await this.imageService.selectImages(req.params.id)
            res.status(200)
            res.send(images)
        } catch(error) {
            res.sendStatus(500)
        }
   
    }

    public getOneImage = async (req: Request, res: Response) => {
        try {
            const image = await this.imageService.selectOneImage(req.params.idImage)
            res.contentType("image/png");
            image.on('error', (err) => {
                console.error('Stream error:', err);
                if (!res.headersSent) {
                    res.status(500).send('Error streaming image.');
                } else {
                    res.end()
                }
            });
            image.pipe(res)
        } catch(error) {
            console.log(error)
            res.sendStatus(500)
        }

    }

    public addImage = async (req: Request, res: Response) => {
        req.headers['Content-Type'] = req.headers['content-type'];

        const bb = busboy({ headers: req.headers });


        bb.on('file', async (fieldname, file, info) => {
            try {
                this.imageService.addImage(file, req.params.id, info.mimeType)
            } catch(error) {
                res.sendStatus(500)
            }
            
            
            file.on('error', (err) => {
                console.error('Busboy file error:', err);
                req.unpipe(bb);
                res.status(500).send('File stream error');
            });
        });

        bb.on('finish', () => {
            res.sendStatus(200)

        });

        req.pipe(bb);
        
    }


    public deleteImage = async (req: Request, res: Response) => {

    }
}