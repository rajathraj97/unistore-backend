const { v4: uuidv4 } = require('uuid');
const {S3}=require("aws-sdk")

require("dotenv").config()
const s3Uploadv2 = async(file)=>{
    const s3 = new S3()
    

    console.log(file,'file recived')

    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`uploads/${uuidv4()}-${file.originalname}`,
        Body: file.buffer
    }
   return await s3.upload(params).promise()

}
module.exports = s3Uploadv2