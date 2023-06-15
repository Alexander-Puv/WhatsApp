import multer from "multer";
import { v4 } from "uuid";

export const photoDestination = 'uploads/photos'

const storage = multer.diskStorage({
  destination: photoDestination,
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop()
    cb(null, v4() + '.' + extension)
  }
})

const upload = multer({ storage })

export default upload