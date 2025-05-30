import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config()

const client = new S3Client({
    region : process.env.AWS_REGION,
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function preSign(req, res) {
  try {
    const { filename, type } = req.body;
    const command = new PutObjectCommand({
       Bucket : process.env.AWS_S3_BUCKET_NAME,
       Key : filename,
       ContentType : type
    })
    const url = await getSignedUrl(client, command, {expiresIn : 3600});
    res.status(200).json({url, fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`})
  } catch (error) {
    console.log(error);
    res.status(500).send(`Server issue`, +error)
  }
}