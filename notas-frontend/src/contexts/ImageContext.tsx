import { createContext, useState, type ReactNode } from 'react';

interface ImageContextType {
    images: File[]
    changeImages: (image: File) => void
    cleanImages: () => void
}

interface ImageProviderProps {
    children: ReactNode
}

const ImageContext = createContext<ImageContextType>({images: [], changeImages:() =>{}, cleanImages: () => {}})

const ImageProvider = ({ children }: ImageProviderProps) => {
    const [images, setImages]= useState<File[]>([])

    const changeImages = (image: File) => {
        console.log("oi")
        setImages((prevImages) => [...prevImages, image]) 
    }

    const cleanImages = () => setImages([])

    return (
        <ImageContext.Provider value={{ images, changeImages, cleanImages }}>
            {children}
        </ImageContext.Provider>
    )
}

export { ImageProvider, ImageContext };