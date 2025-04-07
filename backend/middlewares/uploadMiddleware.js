//zahra
/*import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;*/
import multer from "multer";

// Stockage en mémoire (pas sur le disque)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;

