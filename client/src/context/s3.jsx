import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { BillboardContext } from '../context/BillboardContext';

dotenv.config();

const region = "us-east-1";
const bucketName = "vbillboard-bucket";
const accessKey = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretKey = process.env.REACT_APP_AWS_SECRET_KEY;

const s3 = new aws.s3({
    region, 
    accessKey,
    secretKey,
    signatureVersion: 'v4'
})

export async function generateUploadUrl(){
    const { billboardCount} = useContext(BillboardContext);

    const params = ({
        Bucket: bucketName,
        Key: billboardCount,
        Expires: 60
    })

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
    return uploadUrl
}