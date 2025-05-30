import express from 'express';
import { preSign } from '../controllers/fileUpload.js';
const s3Routes = express.Router();

s3Routes.post("/presign", preSign);

export default s3Routes;