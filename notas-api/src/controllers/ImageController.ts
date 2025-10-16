import { Request, Response } from 'express'
import * as fs from 'fs';
import { ImageService } from '../services/ImageService';
import * as busboy from 'busboy'

export class ImageController {

    constructor(private imageService: ImageService) {
       this.imageService = imageService
    }

    public getImages = async (req: Request, res: Response) => {
        try {
            const image = await this.imageService.selectImages(req.params.id)
            res.send(image)
            res.status(200)
        } catch(error) {
            res.sendStatus(500)
        }
   
    }

    public getOneImage = async (req: Request, res: Response) => {
        try {
            const image = await this.imageService.selectImages(req.params.id)
            res.send(image)
            res.status(200)
        } catch(error) {
            res.sendStatus(500)
        }

    }

    public addImage = async (req: Request, res: Response) => {
                req.headers['Content-Type'] = req.headers['content-type'];

        const bb = busboy({ headers: req.headers });


        bb.on('file', async (fieldname, file, info) => {
            try {
                this.imageService.addImage(file, req.params.id)
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