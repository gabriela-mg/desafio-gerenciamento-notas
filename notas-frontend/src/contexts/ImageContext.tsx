import { createContext, useState, type ReactNode } from 'react';

interface ImageContextType {
    noteImages: File[]
    newImages: File[]
    changeImages: (image: File) => void
    addNewImages: (image: File) => void
    cleanImages: () => void
    cleanInputImages: () => void
}

interface ImageProviderProps {
    children: ReactNode
}

const ImageContext = createContext<ImageContextType>({noteImages: [], newImages: [], changeImages:() =>{}, addNewImages:() =>{}, cleanImages: () => {}, cleanInputImages: () => {}})

const ImageProvider = ({ children }: ImageProviderProps) => {
    const [noteImages, setNoteImages]= useState<File[]>([])
    const [newImages, setNewImages]= useState<File[]>([])

    const changeImages = (image: File) => {
        setNoteImages((prevImages) => [...prevImages, image]) 
    }

    const addNewImages = (image: File) => {
        setNewImages((prevImages) => [...prevImages, image]) 
    }

    const cleanImages = () => setNoteImages([])

    const cleanInputImages = () => setNewImages([])

    return (
        <ImageContext.Provider value={{ noteImages, newImages, changeImages, addNewImages, cleanImages, cleanInputImages }}>
            {children}
        </ImageContext.Provider>
    )
}

export { ImageProvider, ImageContext };