import { useContext } from "react"
import { ImageContext } from "../contexts/ImageContext";


function InputImage() {
    const { addNewImages } = useContext(ImageContext);

    function changeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = event.target.files; 

        if(selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                addNewImages(file)
            }
        }
    }

    return<>
        <input 
            type="file" 
            name="filefield" 
            accept="image/png, image/jpeg" 
            onChange={changeImage}
            multiple
        />
    </>

}

export default InputImage